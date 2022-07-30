import React from "react";
import { Text } from "native-base";
import { colourPalette } from "constants/colours";

const QuestionHeading = ({ text }) => {
  return (
    <Text
      fontWeight={600}
      fontSize="s"
      color={colourPalette.fontPrimary}
      pt="5"
      pl="5"
      bg="white"
    >
      {text}
    </Text>
  );
};

export default QuestionHeading;
