import { BodyMedium, H1, overrideColorTheme } from "@shiksha/common-lib";
import {
  Actionsheet,
  Box,
  Button,
  FormControl,
  Input,
  Stack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function InputForm({
  showModule,
  setShowModule,
  handleWorksheetSubmit,
}) {
  const { t } = useTranslation();
  const [inputData, setInputData] = React.useState("Untitled");
  const handleInput = (event) => {
    setInputData(event.target.value);
  };

  const handleSubmit = () => {
    handleWorksheetSubmit(inputData);
  };

  return (
    <Actionsheet isOpen={showModule} onClose={() => setShowModule(false)}>
      <Actionsheet.Content alignItems={"left"} bg={colors.worksheetCardBg}>
        <Stack p={5} pt={1} pb="15px">
          <H1>{t("Enter Worksheet Details")}</H1>
        </Stack>
      </Actionsheet.Content>
      <Box bg={colors.white} width={"100%"} p="5">
        <FormControl isRequired>
          <FormControl.Label mb="10px">
            <BodyMedium>{t("NAME")}</BodyMedium>
          </FormControl.Label>
          <Input
            rounded="lg"
            height="48px"
            bg={colors.white}
            variant="unstyled"
            p={"10px"}
            placeholder={t("ENTER") + " " + t("NAME")}
            onChange={handleInput}
            value={inputData ? inputData : ""}
          />
        </FormControl>
        <Button.Group>
          <Button
            colorScheme="button"
            px="5"
            flex="1"
            variant="outline"
            onPress={handleSubmit}
          >
            {t("Skip")}
          </Button>
          <Button
            colorScheme="button"
            _text={{ color: colors.white }}
            px="5"
            flex="1"
            onPress={handleSubmit}
          >
            {t("Save")}
          </Button>
        </Button.Group>
      </Box>
    </Actionsheet>
  );
}
