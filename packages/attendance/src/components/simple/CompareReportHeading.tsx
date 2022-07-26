// Lib
import * as React from "react";
import { VStack, Text } from "native-base";

export const CompareReportHeading = ({ _textMed, _textSmall }) => {
  return (
    <>
      <VStack>
        <Text bold fontSize={"md"}>
          {_textMed}
        </Text>
        <Text fontSize={"xs"}>{_textSmall}</Text>
      </VStack>
    </>
  );
};
