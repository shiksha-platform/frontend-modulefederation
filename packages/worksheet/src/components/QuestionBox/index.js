import React from "react";
import { Box, HStack, Text, VStack } from "native-base";
import { colourPalette } from "constants/colours";

const QuestionBox = ({ question, options, _box }) => {
  const createMarkup = (abc) => {
    return { __html: abc };
  };
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
                <HStack key={index} space="1" alignItems="flex-start">
                  <Text>{index + 1}</Text>
                  <div
                    dangerouslySetInnerHTML={createMarkup(item?.value?.body)}
                  ></div>
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
