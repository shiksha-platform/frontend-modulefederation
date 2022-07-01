import { IconByName } from "@shiksha/common-lib";
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
    ["type"]: ["subject", "gradeLevel"].includes(e.attributeName)
      ? "stingValueArray"
      : "array",
  };
});

export default function Form({
  createType,
  setCreateType,
  formObject,
  setFormObject,
  setPageName,
  setLimit,
  alertMessage,
  setAlertMessage,
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({});
  const [inputs, setInputs] = React.useState(newDefaultInputs);
  const attributeName = getAttribute(formData);
  const type = getType(formData);
  const valueArr = getValueByType(formObject[attributeName], type);

  React.useEffect((e) => {
    if (createType === "auto") {
      setInputs([...newDefaultInputs, ...autoGenerateInputs]);
    }
  }, []);

  const handelAddQuestion = () => {
    if (createType === "auto") {
      setLimit({
        limit: formObject.number_of_questions
          ? formObject.number_of_questions
          : null,
      });
      setPageName("WorksheetTemplate");
    } else {
      setPageName("ListOfQuestions");
    }
  };

  return (
    <Stack space={1} mb="2">
      <AlertValidationModal {...{ alertMessage, setAlertMessage }} />
      <FormInput
        {...{ formObject, setFormObject, formData, setFormData }}
        data={inputs}
      />
      <Box bg="white" p="5" position="sticky" bottom="84" shadow={2}>
        <Button.Group>
          {createType === "create" ? (
            <Button
              flex="1"
              variant="outline"
              onPress={(e) => {
                setCreateType("auto");
                setInputs([...newDefaultInputs, ...autoGenerateInputs]);
              }}
            >
              {t("Auto Generate")}
            </Button>
          ) : (
            <></>
          )}
          <Button
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            flex="1"
            onPress={handelAddQuestion}
          >
            {t("Search Questions")}
          </Button>
        </Button.Group>
      </Box>
      <Actionsheet isOpen={formData?.name} onClose={() => setFormData({})}>
        <Actionsheet.Content alignItems={"left"} bg="worksheetCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t(`Select ${formData?.name}`)}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={(e) => setFormData({})}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"}>
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
                      ? "button.500"
                      : "gray.300"
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
                      ? "gray.200"
                      : "white"
                  }
                >
                  <HStack space="2" colorScheme="button" alignItems="center">
                    {type === "array" ? (
                      <IconByName
                        isDisabled
                        color={
                          valueArr.includes(value) ? "button.500" : "gray.300"
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
              _text={{ color: "white" }}
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
          bg="white"
          p="5"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize={"14px"} fontWeight="500">
            {t(item.name)}
          </Text>
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
                    ? "white"
                    : item?.buttonVariant
                    ? "button.500"
                    : "button.500"
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
