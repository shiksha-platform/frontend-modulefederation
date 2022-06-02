import { Button, Text, Box, FormControl, Input } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

export default function AddDescriptionPage({ setPageName }) {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({});
  const formInput = [
    { name: "title", placeholder: "Enter Title", label: "Title" },
    {
      name: "description",
      placeholder: "Enter Description",
      label: "Description",
    },
    {
      name: "difficulty_level",
      placeholder: "Enter Difficulty level",
      label: "Difficulty level",
    },
    { name: "topics", placeholder: "Enter Topics", label: "Topics" },
    { name: "subject", placeholder: "Enter Subject", label: "Subject" },
    { name: "level", placeholder: "Enter Level", label: "Level" },
    { name: "skills", placeholder: "Enter Skills", label: "Skills" },
  ];
  return (
    <Box>
      {formInput.map((item, index) => {
        return (
          <Box key={index + item.name} p="5" bg="white">
            <FormControl>
              <FormControl.Label>
                <Text fontSize={"14px"} fontWeight="500">
                  {item.label}
                </Text>
              </FormControl.Label>
              <Input
                bg={"gray.100"}
                variant="filled"
                p={2}
                {...item}
                key={index + item.name}
              />
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
          onPress={(e) => setPageName("success")}
        >
          {t("Save and Publish")}
        </Button>
      </Box>
    </Box>
  );
}
