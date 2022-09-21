import {
  Button,
  Box,
  FormControl,
  Input,
  Select,
  Pressable,
  HStack,
  Text,
  ScrollView,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { defaultInputs } from "config/worksheetConfig";
import {
  capture,
  telemetryFactory,
  worksheetRegistryService,
  questionRegistryService,
  BodyLarge,
  getArray,
  IconByName,
  BodySmall,
} from "@shiksha/common-lib";
import moment from "moment";

export default function AddDescriptionPage({
  manifest,
  questions,
  setPageName,
  formObject,
  setFormObject,
  createType,
  worksheetStartTime,
  appName,
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [inputs, setInputs] = React.useState([]);

  const validate = () => {
    let attribute = ["name", "description", "subject", "grade"];
    let errorArr = {};
    attribute.forEach((item) => {
      if (!formData[item] || formData[item] === "") {
        errorArr = {
          ...errorArr,
          [item]: `${item === "grade" ? "class" : item} is invalid`,
        };
      }
    });
    setErrors(errorArr);
    for (let prop in errorArr) {
      return !prop;
    }
    return true;
  };

  React.useEffect((e) => {
    setInputs([
      { name: "name", placeholder: t("ENTER_TITLE"), label: t("TITLE") },
      {
        name: "description",
        placeholder: t("ENTER_DESCRIPTION"),
        label: t("DESCRIPTION"),
      },
      ...defaultInputs.map((e) => {
        const source = getArray(manifest?.["question-bank.questionResource"]);
        return {
          ...e,
          type: "select",
          ...(e.attributeName === "topic" ? { type: "multiselect" } : {}),
          attributeName:
            e.attributeName === "gradeLevel" ? "grade" : e.attributeName,
          data: e.attributeName === "source" ? source : e.data,
        };
      }),
    ]);
    setFormData({
      ...formObject,
      ["grade"]: formObject.grade?.[0],
      ["source"]: formObject.source?.[0],
      ["subject"]: formObject.subject?.[0],
      // ["topic"]: formObject.topic?.[0],
    });
  }, []);

  const handleSubmit = async () => {
    if (validate()) {
      const data = {
        ...formData,
        questions: questions.map((e) => e.questionId),
      };
      const worksheetId = await worksheetRegistryService.create(data);
      let type = "Worksheet-Search-Questions-End";
      let state = data?.state;
      if (createType === "auto") {
        type = "Worksheet-Auto-Generate-End";
        state = "Publish";
      }
      const telemetryData = telemetryFactory.end({
        appName,
        type,
        worksheetId,
        subject: data?.subject,
        grade: data?.grade,
        topic: data?.topic,
        numberOfQuestions: data?.questions?.length,
        state,
        duration: worksheetStartTime
          ? moment().diff(worksheetStartTime, "seconds")
          : 0,
      });
      capture("END", telemetryData);
      setPageName("success");
      setFormObject(data);
    }
  };

  const setDependentData = async (data, value) => {
    let attributeName = ["grade"].includes(data.attributeName)
      ? "gradeLevel"
      : data.attributeName;
    const nameData = defaultInputs.find((e) => e.dependent === attributeName);
    if (nameData?.urlName === "getSubjectsList") {
      const selectData = await questionRegistryService.getSubjectsList({
        adapter: formObject?.source,
        gradeLevel: value,
      });
      setInputs(
        inputs.map((e) => {
          if (e.attributeName === nameData.attributeName) {
            return { ...e, data: selectData.map((e) => e.code) };
          }
          return e;
        })
      );
    } else if (nameData?.urlName === "getTopicsList") {
      const selectData = await questionRegistryService.getTopicsList({
        adapter: formObject?.source,
        subject: value,
      });
      setInputs(
        inputs.map((e) => {
          if (e.attributeName === nameData.attributeName) {
            return { ...e, data: selectData };
          }
          return e;
        })
      );
    }
  };

  const handelSelect = (value, attribute, inputData) => {
    setDependentData(inputData, value);
    setFormData({ ...formData, [attribute]: value });
  };

  return (
    <Box>
      {inputs.map((item, index) => {
        let attribute = item.attributeName ? item.attributeName : item.name;
        let placeholder = item.placeholder ? item.placeholder : item.name;
        return (
          <Box key={index + item.name} p="5" bg={"worksheet.white"}>
            <FormControl isInvalid={attribute in errors}>
              <FormControl.Label>
                <BodyLarge>{item.label ? item.label : item.name}</BodyLarge>
              </FormControl.Label>
              {item.type === "select" ? (
                <Select
                  bg={"worksheet.lightGray5"}
                  accessibilityLabel={placeholder}
                  placeholder={placeholder}
                  key={index + item?.name}
                  selectedValue={formData[attribute]}
                  {...(item?._formInput ? item?._formInput : {})}
                  onValueChange={(e) => {
                    handelSelect(e, attribute, item);
                  }}
                >
                  {item?.data &&
                    item?.data.map((e, index) => {
                      if (e.value) {
                        return (
                          <Select.Item
                            key={index}
                            label={e?.label}
                            value={e.value}
                          />
                        );
                      } else {
                        return <Select.Item key={index} label={e} value={e} />;
                      }
                    })}
                </Select>
              ) : item.type === "multiselect" ? (
                <ScrollView
                  borderWidth={1}
                  borderColor="worksheet.lightGray3"
                  minH="36px"
                  maxH="108px"
                  bg={"worksheet.lightGray5"}
                  rounded="sm"
                >
                  {item?.data?.length <= 0 ? (
                    <BodySmall p="2" color="worksheet.lightGray0">
                      {placeholder}
                    </BodySmall>
                  ) : (
                    item?.data?.map((value, index) => (
                      <Pressable
                        p="2"
                        key={index}
                        onPress={(e) => {
                          let newValue = [];
                          if (
                            formData[attribute] &&
                            formData[attribute].includes(value)
                          ) {
                            newValue = formData[attribute].filter(
                              (item) => item !== value
                            );
                          } else {
                            newValue = [
                              ...(formData[attribute]
                                ? formData[attribute]
                                : []),
                              value,
                            ];
                          }
                          setFormData({
                            ...formData,
                            [attribute]: newValue,
                          });
                        }}
                      >
                        <HStack
                          space="2"
                          colorScheme="button"
                          alignItems="center"
                        >
                          <IconByName
                            isDisabled
                            _icon={{ size: "20px" }}
                            color={
                              formData[attribute]?.includes(value)
                                ? "primary"
                                : "gray"
                            }
                            name={
                              formData[attribute]?.includes(value)
                                ? "CheckboxLineIcon"
                                : "CheckboxBlankLineIcon"
                            }
                          />
                          <BodySmall>{value}</BodySmall>
                        </HStack>
                      </Pressable>
                    ))
                  )}
                </ScrollView>
              ) : (
                <Input
                  bg={"worksheet.lightGray5"}
                  variant="filled"
                  p={2}
                  {...item}
                  key={index + item.name}
                  value={formData[attribute]}
                  onChange={(e) => {
                    setFormData({ ...formData, [attribute]: e.target.value });
                  }}
                />
              )}
              {attribute in errors ? (
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: "xs",
                    color: "worksheet.eventError",
                    fontWeight: 500,
                  }}
                >
                  {errors[attribute]}
                </FormControl.ErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
          </Box>
        );
      })}

      <Box bg={"worksheet.white"} p="5" position="sticky" bottom="0" shadow={2}>
        <Button
          colorScheme="button"
          _text={{ color: "worksheet.white" }}
          px="5"
          flex="1"
          onPress={handleSubmit}
        >
          {t("SAVE")}
        </Button>
      </Box>
    </Box>
  );
}
