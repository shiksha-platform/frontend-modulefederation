import React from "react";
import { Box, HStack, VStack } from "native-base";
import "../../App.css";
import { BodyMedium } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

const styles = { questionDiv: { display: "flex" } };

const HtmlPrint = ({ html }) => {
  const createMarkup = (markup) => {
    return { __html: markup };
  };
  return <div dangerouslySetInnerHTML={createMarkup(html)} />;
};

const QuestionBox = ({ questionObject, isAnswerHide, infoIcon, _box }) => {
  const { t } = useTranslation();

  const alphabet = ["a", "b", "c", "d", "e", "f"];

  return (
    <Box shadow={2} rounded="xl">
      <Box
        bg={"worksheet.secondary"}
        p="5"
        {...(questionObject?.options ||
        (!questionObject?.options && questionObject?.answer)
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
            <HtmlPrint html={questionObject?.question} />
          </div>
          {infoIcon}
        </HStack>
      </Box>
      {!questionObject?.options && questionObject?.answer ? (
        <Box bg={"worksheet.primaryLight"} p="4" roundedBottom={"xl"}>
          <HtmlPrint html={questionObject.answer} />
        </Box>
      ) : questionObject?.options ? (
        <Box bg={"worksheet.primaryLight"} p="4" roundedBottom={"xl"}>
          <VStack space="2">
            {questionObject.options?.map((item, index) => {
              return (
                <HStack key={index} space="1" alignItems="baseline">
                  <BodyMedium
                    textTransform="inherit"
                    color={
                      item.answer && !isAnswerHide ? "worksheet.success" : ""
                    }
                  >
                    {alphabet[index] + ". "}
                  </BodyMedium>
                  <BodyMedium
                    color={
                      item.answer && !isAnswerHide ? "worksheet.success" : ""
                    }
                  >
                    <HtmlPrint html={item?.value?.body} />
                  </BodyMedium>
                </HStack>
              );
            })}
          </VStack>
        </Box>
      ) : (
        <React.Fragment />
      )}
    </Box>
  );
};

export default QuestionBox;
