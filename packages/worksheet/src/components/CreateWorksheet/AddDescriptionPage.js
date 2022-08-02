import { Button, Text, Box, FormControl, Input, Select } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { defaultInputs } from "config/worksheetConfig";
import {
  capture,
  telemetryFactory,
  worksheetRegistryService,
  overrideColorTheme,
  BodyLarge,
} from "@shiksha/common-lib";
import moment from "moment";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const getArray = (item) =>
  Array.isArray(item) ? item : item ? JSON.parse(item) : [];

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
  const formInput = [
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
  ];

  const validate = () => {
    let attribute = ["name", "description", "subject", "grade", "topic"];
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
      setFormObject(data);
      const { osid } = await worksheetRegistryService.create(data);
      let type = "Worksheet-Search-Questions-End";
      let state = data?.state;
      if (createType === "auto") {
        type = "Worksheet-Auto-Generate-End";
        state = "Publish";
      }
      const telemetryData = telemetryFactory.end({
        appName,
        type,
        worksheetId: osid,
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
    }
  };
  console.log(formData);
  return (
    <Box>
      {formInput.map((item, index) => {
        let attribute = item.attributeName ? item.attributeName : item.name;
        let placeholder = item.placeholder ? item.placeholder : item.name;
        return (
          <Box key={index + item.name} p="5" bg={colors.white}>
            <FormControl isInvalid={attribute in errors}>
              <FormControl.Label>
                <BodyLarge>{item.label ? item.label : item.name}</BodyLarge>
              </FormControl.Label>
              {item.type === "select" ? (
                <Select
                  bg={colors.lightGray5}
                  accessibilityLabel={placeholder}
                  placeholder={placeholder}
                  key={index + item.name}
                  selectedValue={formData[attribute]}
                  {...(item?._formInput ? item?._formInput : {})}
                  onValueChange={(e) => {
                    setFormData({ ...formData, [attribute]: e });
                  }}
                >
                  {item?.data &&
                    item?.data.map((e, index) => (
                      <Select.Item key={index} label={e} value={e} />
                    ))}
                </Select>
              ) : item.type === "multiselect" ? (
                <select
                  bg={colors.lightGray5}
                  accessibilityLabel={placeholder}
                  placeholder={placeholder}
                  key={index + item.name}
                  value={formData[attribute]}
                  multiple={true}
                  onChange={(e) => {
                    let value = [];
                    if (
                      formData[attribute] &&
                      formData[attribute].includes(e.target.value)
                    ) {
                      value = formData[attribute].filter(
                        (item) => item !== e.target.value
                      );
                    } else {
                      value = [
                        ...(formData[attribute] ? formData[attribute] : []),
                        e.target.value,
                      ];
                    }
                    setFormData({
                      ...formData,
                      [attribute]: value,
                    });
                  }}
                >
                  {item?.data &&
                    item?.data.map((e, index) => (
                      <option
                        key={index}
                        label={e}
                        value={e}
                        style={{ padding: "10px" }}
                      />
                    ))}
                </select>
              ) : (
                <Input
                  bg={colors.lightGray5}
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
                    color: colors.eventError,
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

      <Box bg={colors.white} p="5" position="sticky" bottom="0" shadow={2}>
        <Button
          colorScheme="button"
          _text={{ color: colors.white }}
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
