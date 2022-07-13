// Lib
import * as React from "react";
import { VStack, Text } from "native-base";
import { BodyLarge } from "@shiksha/common-lib";

export const ReportDetailTitle = ({
  _text1,
  _text2,
  _text3,
  _color1,
  _color2,
}) => {
  return (
    <VStack alignItems="center">
      <BodyLarge>
        <Text>{_text1}</Text>
        <Text color={_color1}>{_text2}</Text>
        <Text color={_color2}>{_text3}</Text>
      </BodyLarge>
    </VStack>
  );
};
