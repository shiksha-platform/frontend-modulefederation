import React from "react";
import { Box, HStack } from "native-base";
import { H3, overrideColorTheme } from "@shiksha/common-lib";
import colorTheme from "../../../colorTheme";

const colors = overrideColorTheme(colorTheme);
const Section = ({ title, button, children, _box }) => (
  <Box bg={colors.white} p="5" {..._box}>
    <HStack alignItems={"center"} justifyContent={"space-between"}>
      <H3>{title}</H3>
      {button}
    </HStack>
    {children}
  </Box>
);

export default Section;
