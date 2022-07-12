// Lib
import * as React from "react";
import { Actionsheet, VStack, Button } from "native-base";
import { Subtitle, BodyMedium } from "@shiksha/common-lib";

// Utils
import { colorTheme } from "utils/functions/ColorTheme";

export const SmsModal: React.FC<any> = ({
  smsShowModal,
  setSmsShowModal,
  t,
}) => {
  return (
    <Actionsheet isOpen={smsShowModal} onClose={() => setSmsShowModal(false)}>
      <Actionsheet.Content alignItems={"left"}>
        {/* <HStack justifyContent={"end"}>
		<IconByName
		  name="CloseCircleLineIcon"
		  onPress={(e) => setSmsShowModal(false)}
		/>
	  </HStack> */}
        <VStack space={5} alignItems="center" p="5">
          <Subtitle color={colorTheme.messageSent}>
            Message Sent to Parent
          </Subtitle>
          <Subtitle color={colorTheme.messageAlert}>Absent alert</Subtitle>
          <BodyMedium color={colorTheme.messageInfo} textAlign="center">
            Hello Mr. B.K. Chaudhary, this is to inform you that your ward
            Sheetal is absent in school on Wednesday, 12th of January 2022.
          </BodyMedium>
          <Button
            variant="outline"
            colorScheme="button"
            onPress={(e) => setSmsShowModal(false)}
          >
            {t("CLOSE")}
          </Button>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
