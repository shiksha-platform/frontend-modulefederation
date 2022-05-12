import React from "react";
import { Box, HStack, Text, VStack } from "native-base";
import { colourPalette } from "constants/colours";
import "../../App.css";

const QuestionBox = ({ question, options, _box }) => {
  const createMarkup = (abc) => {
    return { __html: abc };
  };
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  return (
    <Box shadow={2} rounded="xl">
      <Box
        bg={colourPalette.secondary}
        p="5"
        {...(options ? { roundedTop: "xl" } : { rounded: "xl" })}
        {..._box}
      >
        <div dangerouslySetInnerHTML={createMarkup(question)}></div>
      </Box>
      {options ? (
        <Box bg="#FFF8F7" p="4" roundedBottom={"xl"}>
          <VStack space="2">
            {options?.map((item, index) => {
              return (
                <HStack key={index} space="1" alignItems="baseline">
                  <Text fontSize="14" fontWeight="400" textTransform="inherit">
                    {alphabet[index] + ". "}
                  </Text>
                  <Text fontSize="14" fontWeight="400">
                    <div
                      dangerouslySetInnerHTML={createMarkup(item?.value?.body)}
                    />
                  </Text>
                </HStack>
              );
            })}
          </VStack>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default QuestionBox;
