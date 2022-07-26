// Lib
import * as React from "react";
import { Box, HStack } from "native-base";
import { BodyLarge, IconByName } from "@shiksha/common-lib";

// Utils
import { colorTheme } from "utils/functions/ColorTheme";

export const IconComponent = ({ lastTitle, iconName }) => {
  return (
    <Box rounded={"full"} px="5" py="2" bg={colorTheme.primary}>
      <HStack space="2">
        <BodyLarge color={colorTheme.white}>{lastTitle}</BodyLarge>
        {
          // @ts-ignore
          <IconByName color={colorTheme.white} name={iconName} isDisabled />
        }
      </HStack>
    </Box>
  );
};
