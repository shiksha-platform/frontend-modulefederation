import { Button, Text, Box, FormControl, Input, Select } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { defaultInputs } from "config/worksheetConfig";
import { worksheetRegistryService } from "@shiksha/common-lib";

export default function AddDescriptionPage({
  questions,
  setPageName,
  formObject,
  setFormObject,
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
      return {
        ...e,
        type: "select",
        attributeName:
          e.attributeName === "gradeLevel" ? "grade" : e.attributeName,
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
      ["topic"]: formObject.topic?.[0],
    });
  }, []);

  const handleSubmit = () => {
    if (validate()) {
      const data = {
        ...formData,
        questions: questions.map((e) => e.questionId),
      };
      setFormObject(data);
      worksheetRegistryService.create(data);
      setPageName("success");
    }
  };

  return (
    <Box>
      {formInput.map((item, index) => {
        let attribute = item.attributeName ? item.attributeName : item.name;
        let placeholder = item.placeholder ? item.placeholder : item.name;
        return (
          <Box key={index + item.name} p="5" bg="white">
            <FormControl isInvalid={attribute in errors}>
              <FormControl.Label>
                <Text fontSize={"14px"} fontWeight="500">
                  {item.label ? item.label : item.name}
                </Text>
              </FormControl.Label>
              {item.type === "select" ? (
                <Select
                  bg={"gray.100"}
                  accessibilityLabel={placeholder}
                  placeholder={placeholder}
                  key={index + item.name}
                  selectedValue={formData[attribute]}
                  onValueChange={(e) => {
                    setFormData({ ...formData, [attribute]: e });
                  }}
                >
                  {item?.data &&
                    item?.data.map((e, index) => (
                      <Select.Item key={index} label={e} value={e} />
                    ))}
                </Select>
              ) : (
                <Input
                  bg={"gray.100"}
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
                    color: "error.500",
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

      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button
          colorScheme="button"
          _text={{ color: "white" }}
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
