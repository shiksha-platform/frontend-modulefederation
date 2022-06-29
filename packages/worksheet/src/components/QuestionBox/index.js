import React from "react";
import { Box, HStack, VStack } from "native-base";
import { colourPalette } from "constants/colours";
import "../../App.css";
import { IconByName, BodyMedium } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

const styles = { questionDiv: { display: "flex" } };

const QuestionBox = ({
  questionObject,
  selectData,
  setSelectData,
  isAnswerHide,
  infoIcon,
  _box,
}) => {
  const { t } = useTranslation();

  const createMarkup = (markup) => {
    return { __html: markup };
  };
  const alphabet = ["a", "b", "c", "d", "e", "f"];

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
        <HStack
          justifyContent="space-between"
          space={1}
          alignItems="flex-start"
        >
          <div style={styles.questionDiv}>
            <div
              dangerouslySetInnerHTML={createMarkup(questionObject?.question)}
            />
            {infoIcon}
          </div>
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
            <React.Fragment />
          )}
        </HStack>
      </Box>
      {questionObject?.options ? (
        <Box bg="#FFF8F7" p="4" roundedBottom={"xl"}>
          <VStack space="2">
            {questionObject.options?.map((item, index) => {
              return (
                <HStack key={index} space="1" alignItems="baseline">
                  <BodyMedium
                    textTransform="inherit"
                    color={
                      item.answer && !isAnswerHide ? "successAlertText.500" : ""
                    }
                  >
                    {alphabet[index] + ". "}
                  </BodyMedium>
                  <BodyMedium
                    color={
                      item.answer && !isAnswerHide ? "successAlertText.500" : ""
                    }
                  >
                    <div
                      dangerouslySetInnerHTML={createMarkup(item?.value?.body)}
                    />
                  </BodyMedium>
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
