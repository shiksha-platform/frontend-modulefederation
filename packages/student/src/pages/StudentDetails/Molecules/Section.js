import React from "react";
import { Text, Box, HStack } from "native-base";

const Section = ({ title, button, children, _box }) => (
  <Box bg={"white"} p="5" {..._box}>
    <HStack alignItems={"center"} justifyContent={"space-between"}>
      <Text fontSize="16px" fontWeight="500">
        {title}
      </Text>
      {button}
    </HStack>
    {children}
  </Box>
);

export default Section;
