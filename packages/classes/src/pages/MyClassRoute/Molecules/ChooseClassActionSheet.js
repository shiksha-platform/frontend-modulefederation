import React from "react";
import { Box, useDisclose, Actionsheet, Link } from "native-base";
import { useTranslation } from "react-i18next";

const ChooseClassActionSheet = () => {
  const { t } = useTranslation();

  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <Link onPress={onOpen}>
        <Box
          rounded="lg"
          borderColor="button.500"
          borderWidth="1"
          _text={{ color: "button.500" }}
          px={4}
          py={2}
          style={{ textTransform: "uppercase" }}
        >
          {t("CHOOSE_ANOTHER_CLASS")}
        </Box>
      </Link>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>Option 1</Actionsheet.Item>
          <Actionsheet.Item>Option 2</Actionsheet.Item>
          <Actionsheet.Item>Option 3</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default ChooseClassActionSheet;
