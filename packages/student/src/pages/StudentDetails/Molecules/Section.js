import React from "react";
import { Box, HStack } from "native-base";
import { H2 } from "@shiksha/common-lib";

const Section = ({ title, button, children, _box }) => (
  <Box bg={"white"} p="5" {..._box}>
    <HStack alignItems={"center"} justifyContent={"space-between"}>
      <H2 fontWeight="500">{title}</H2>
      {button}
    </HStack>
    {children}
  </Box>
);

export default Section;
