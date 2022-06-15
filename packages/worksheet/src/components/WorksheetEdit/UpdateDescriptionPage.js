import {
  Button,
  Text,
  Box,
  FormControl,
  Input,
  Select,
  HStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { defaultInputs } from "config/worksheetConfig";
import {
  IconByName,
  Layout,
  worksheetRegistryService,
} from "@shiksha/common-lib";
import manifest from "../../manifest.json";

export default function UpdateDescriptionPage({
  setPageName,
  formObject,
  setFormObject,
  handleSubmit,
  footerLinks,
  appName,
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const formInput = [
    { name: "name", placeholder: "Enter Title", label: "Title" },
    {
      name: "description",
      placeholder: "Enter Description",
      label: "Description",
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
      ["grade"]: Array.isArray(formObject?.grade)
        ? formObject?.grade?.[0]
        : formObject?.grade,
      ["source"]: Array.isArray(formObject?.source)
        ? formObject?.source?.[0]
        : formObject?.source,
      ["subject"]: Array.isArray(formObject?.subject)
        ? formObject?.subject?.[0]
        : formObject?.subject,
      ["topic"]: Array.isArray(formObject?.topic)
        ? formObject?.topic?.[0]
        : formObject?.topic,
    });
  }, []);

  const handleFormSubmit = () => {
    if (validate()) {
      setFormObject(formData);
      setPageName("descriptionUpdated");
    }
  };

  return (
    <Layout
      _header={{
        title: formObject.name,
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
        iconComponent: (
          <Button
            _text={{ color: "white" }}
            px="15px"
            py="10px"
            fontSize="12px"
            fontWeight="600"
            onPress={handleSubmit}
          >
            {t("SAVE")}
          </Button>
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="16px" fontWeight={"600"}>
            {t("Edit your draft worksheet")}
          </Text>
          <IconByName
            name="InformationLineIcon"
            onPress={(e) => console.log(true)}
          />
        </HStack>
      }
      _subHeader={{
        bg: "worksheetCard.500",
        _text: {
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
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
            onPress={handleFormSubmit}
          >
            {t("Save and Publish")}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
