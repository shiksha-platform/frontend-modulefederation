import React from "react";
import { Box, HStack, Text, VStack } from "native-base";
import { colourPalette } from "constants/colours";
import "../../App.css";
import { IconByName } from "@shiksha/common-lib";

const QuestionBox = ({ questionObject, selectData, setSelectData, _box }) => {
  const createMarkup = (markup) => {
    return { __html: markup };
  };
  const alphabet = ["a", "b", "c", "d", "e", "f"];

  const isExist = () =>
    selectData &&
    selectData.filter((e) => e.questionId === questionObject?.questionId)
      .length;

  return (
    <Box shadow={2} rounded="xl">
      <Box
        bg={colourPalette.secondary}
        p="5"
        {...(questionObject?.options
          ? { roundedTop: "xl" }
          : { rounded: "xl" })}
        {..._box}
      >
        <HStack justifyContent="space-between">
          <div
            dangerouslySetInnerHTML={createMarkup(questionObject?.question)}
          />
          {selectData ? (
            <IconByName
              color={isExist() ? "button.500" : "gray.300"}
              name={isExist() ? "CheckboxLineIcon" : "CheckboxBlankLineIcon"}
              onPress={(e) => {
                if (isExist()) {
                  const newData = selectData.filter(
                    (e) => e.questionId !== questionObject?.questionId
                  );
                  setSelectData(newData);
                } else {
                  setSelectData([...selectData, questionObject]);
                }
              }}
            />
          ) : (
            ""
          )}
        </HStack>
      </Box>
      {questionObject?.options ? (
        <Box bg="#FFF8F7" p="4" roundedBottom={"xl"}>
          <VStack space="2">
            {questionObject.options?.map((item, index) => {
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
