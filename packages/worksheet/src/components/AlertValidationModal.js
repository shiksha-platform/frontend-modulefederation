import { Button, Modal, Text, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

const AlertValidationModal = ({ alertMessage, setAlertMessage }) => {
  const { t } = useTranslation();
  const handleClose = () => {
    setAlertMessage();
  };

  return (
    <Modal safeAreaTop={true} isOpen={alertMessage} onClose={handleClose}>
      <Modal.Content>
        <VStack space={5} p="5">
          <Text fontWeight="700" fontSize="22px">
            {alertMessage}
          </Text>
          <Button.Group>
            <Button
              flex="1"
              fontSize="12px"
              fontWeight="600"
              colorScheme="button"
              _text={{ color: "white" }}
              onPress={handleClose}
            >
              {t("CANCEL")}
            </Button>
          </Button.Group>
        </VStack>
      </Modal.Content>
    </Modal>
  );
};
export default React.memo(AlertValidationModal);
