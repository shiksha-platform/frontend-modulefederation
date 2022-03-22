import React from "react";
import { Box } from "native-base";
import { colourPalette } from "constants/colours";

const QuestionBox = ({ children }) => {
  const createMarkup = (abc) => {
    return { __html: abc };
  };
  return (
    <Box bg={colourPalette.secondary} p="5" m="4" rounded={"xl"} shadow={2}>
      <div dangerouslySetInnerHTML={createMarkup(children)}></div>
    </Box>
  );
};

export default QuestionBox;
