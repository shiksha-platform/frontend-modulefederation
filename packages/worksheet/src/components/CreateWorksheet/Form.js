import {
  capture,
  telemetryFactory,
  BodyLarge,
  H2,
  IconByName,
  overrideColorTheme,
} from "@shiksha/common-lib";
import {
  HStack,
  Stack,
  Button,
  Text,
  Actionsheet,
  Box,
  Pressable,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { defaultInputs, autoGenerateInputs } from "config/worksheetConfig";
import AlertValidationModal from "components/AlertValidationModal";
import moment from "moment";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const getValueByType = (value, type = "array") => {
  return value ? value : type !== "array" ? "" : [];
};

const getAttribute = (value) => {
  return value.attributeName ? value.attributeName : value?.name;
};

const getType = (object) => {
  return object?.type ? object?.type : "array";
};

const newDefaultInputs = defaultInputs.map((e) => {
  return {
    ...e,
    ["attributeName"]: ["gradeLevel"].includes(e.attributeName)
      ? "grade"
      : e.attributeName,
    ["type"]: ["subject", "gradeLevel", "source"].includes(e.attributeName)
      ? "stingValueArray"
      : "array",
  };
});

const getArray = (item) =>
  Array.isArray(item) ? item : item ? JSON.parse(item) : [];

export default function Form({
  manifest,
  appName,
  createType,
  setCreateType,
  formObject,
  setFormObject,
  setPageName,
  setLimit,
  alertMessage,
  setAlertMessage,
  setWorksheetStartTime,
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({});
  const [inputs, setInputs] = React.useState([]);
  const attributeName = getAttribute(formData);
  const type = getType(formData);
  const valueArr = getValueByType(formObject[attributeName], type);

  React.useEffect(
    (e) => {
      if (createType === "auto") {
        const filters = getArray(
          manifest?.["worksheet.configureAutoGenerateWorksheetGetFilter"]
        );
        const source = getArray(manifest?.["question-bank.questionResource"]);
        newDefaultInputs.map((item, index) => {
          if (item.attributeName === "source") {
            item.data = source;
          }
          return item;
        });
        const autoFiters = [...newDefaultInputs, ...autoGenerateInputs];
        setInputs(
          autoFiters.filter(
            (e) =>
              filters.includes(e.attributeName) ||
              (e.attributeName === "grade" && filters.includes("gradeLevel"))
          )
        );
      } else {
        const filters = getArray(
          manifest?.["worksheet.configureWorksheetGetFilter"]
        );
        const source = getArray(manifest?.["question-bank.questionResource"]);
        newDefaultInputs.map((item, index) => {
          if (item.attributeName === "source") {
            item.data = source;
          }
          return item;
        });
        setInputs(
          newDefaultInputs.filter(
            (e) =>
              filters.includes(e.attributeName) ||
              (e.attributeName === "grade" && filters.includes("gradeLevel"))
          )
        );
      }
    },
    [manifest, createType]
  );

  const handelAddQuestion = () => {
    let type = "Worksheet-Search-Questions-Start";
    if (createType === "auto") {
      setLimit({
        limit: formObject.number_of_questions
          ? formObject.number_of_questions
          : null,
      });
      setFormObject({ ...formObject, state: "Publish" });
      setPageName("AddDescriptionPage");
      type = "Worksheet-Auto-Generate-Start";
    } else {
      setPageName("ListOfQuestions");
    }

    const telemetryData = telemetryFactory.start({
      appName,
      type: type,
      filterObject: formObject,
    });
    capture("START", telemetryData);
    setWorksheetStartTime(moment());
  };

  return (
    <Stack space={1} mb="2">
      <AlertValidationModal {...{ alertMessage, setAlertMessage }} />
      <FormInput
        {...{ formObject, setFormObject, formData, setFormData }}
        data={inputs}
      />
      <Box bg={colors.white} p="5" position="sticky" bottom="84" shadow={2}>
        <Button.Group>
          {createType === "create" &&
          manifest &&
          manifest["worksheet.allow-autogenerating-worksheet"] === "true" ? (
            <Button
              flex="1"
              variant="outline"
              onPress={(e) => {
                setCreateType("auto");
              }}
            >
              {t("AUTO_GENERATE")}
            </Button>
          ) : (
            <React.Fragment />
          )}
          <Button
            colorScheme="button"
            _text={{ color: colors.white }}
            px="5"
            flex="1"
            onPress={handelAddQuestion}
          >
            {t("SEARCH_QUESTIONS")}
          </Button>
        </Button.Group>
      </Box>
      <Actionsheet isOpen={formData?.name} onClose={() => setFormData({})}>
        <Actionsheet.Content alignItems={"left"} bg={colors.worksheetCardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t(`Select ${formData?.name}`)}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setFormData({})}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg={colors.white} width={"100%"}>
          {type === "array" ? (
            <Pressable
              p="3"
              onPress={(e) => {
                if (
                  formData?.data &&
                  valueArr &&
                  formData?.data?.length === valueArr?.length
                ) {
                  setFormObject({
                    ...formObject,
                    [formData?.attributeName]: null,
                  });
                } else {
                  setFormObject({
                    ...formObject,
                    [formData?.attributeName]: formData.data,
                  });
                }
              }}
            >
              <HStack space="2" colorScheme="button" alignItems="center">
                <IconByName
                  isDisabled
                  color={
                    formData?.data &&
                    valueArr &&
                    formData?.data?.length === valueArr?.length
                      ? colors.primary
                      : colors.lightGray2
                  }
                  name={
                    formData?.data &&
                    valueArr &&
                    formData?.data?.length === valueArr?.length
                      ? "CheckboxLineIcon"
                      : "CheckboxBlankLineIcon"
                  }
                />
                <Text>{t("Select All")}</Text>
              </HStack>
            </Pressable>
          ) : (
            ""
          )}
          {formData?.data &&
            formData?.data.map((value, index) => {
              return (
                <Pressable
                  p="3"
                  key={index}
                  onPress={(e) => {
                    if (type === "array") {
                      if (valueArr.includes(value)) {
                        const newData = formObject[attributeName].filter(
                          (e) => value !== e
                        );
                        setFormObject({
                          ...formObject,
                          [attributeName]: newData.length > 0 ? newData : null,
                        });
                      } else {
                        setFormObject({
                          ...formObject,
                          [attributeName]: [...valueArr, value],
                        });
                      }
                    } else if (valueArr === value) {
                      setFormObject({
                        ...formObject,
                        [attributeName]: type === "stingValueArray" ? [] : "",
                      });
                    } else {
                      setFormObject({
                        ...formObject,
                        [attributeName]:
                          type === "stingValueArray" ? [value] : value,
                      });
                    }
                  }}
                  bg={
                    (type !== "array" && valueArr === value) ||
                    (type === "stingValueArray" && valueArr.includes(value))
                      ? colors.lightGray2
                      : colors.white
                  }
                >
                  <HStack space="2" colorScheme="button" alignItems="center">
                    {type === "array" ? (
                      <IconByName
                        isDisabled
                        color={
                          valueArr.includes(value)
                            ? colors.primary
                            : colors.lightGray2
                        }
                        name={
                          valueArr.includes(value)
                            ? "CheckboxLineIcon"
                            : "CheckboxBlankLineIcon"
                        }
                      />
                    ) : (
                      ""
                    )}
                    <Text>{value}</Text>
                  </HStack>
                </Pressable>
              );
            })}
          <Box p="5">
            <Button
              colorScheme="button"
              _text={{ color: colors.white }}
              onPress={(e) => setFormData({})}
            >
              {t("SELECT")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </Stack>
  );
}

const FormInput = ({
  data,
  formObject,
  setFormObject,
  formData,
  setFormData,
}) => {
  const { t } = useTranslation();
  return (
    data &&
    data.map((item, index) => {
      let attributeName = item.attributeName ? item.attributeName : item.name;
      return (
        <HStack
          key={index}
          bg={colors.white}
          p="5"
          alignItems="center"
          justifyContent="space-between"
        >
          <BodyLarge>
            {t(item.name)}{" "}
            {item.required ? (
              <Text color={colors.primary}>*</Text>
            ) : (
              <React.Fragment />
            )}
          </BodyLarge>
          <Button
            {...(formObject[attributeName]
              ? { _text: { color: "white", textTransform: "inherit" } }
              : item?.buttonVariant
              ? { variant: item.buttonVariant }
              : {
                  variant: "outline",
                  _text: { color: "button.500", textTransform: "inherit" },
                })}
            rounded="full"
            colorScheme="button"
            px="5"
            rightIcon={
              <IconByName
                color={
                  formObject[attributeName]
                    ? colors.white
                    : item?.buttonVariant
                    ? colors.primary
                    : colors.primary
                }
                name="ArrowDownSLineIcon"
                isDisabled
              />
            }
            onPress={(e) => setFormData(item)}
          >
            {formObject[attributeName] &&
            Array.isArray(formObject[attributeName])
              ? formObject[attributeName][0]
              : formObject[attributeName]
              ? formObject[attributeName]
              : `Select ${t(item.name)}`}
          </Button>
        </HStack>
      );
    })
  );
};
