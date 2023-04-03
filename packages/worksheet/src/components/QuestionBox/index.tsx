// Lib
import React from "react";
import { Box, HStack, VStack } from "native-base";

// Styles
import "../../App.css";

// Constants
import { colourPalette } from "constants/colours";
import colorTheme from "colorTheme";

// Components
import HtmlPrint from "components/HTMLPrint";
import QuestionOption from "./QuestionOption";

const styles = { questionDiv: { display: "flex" } };

// Interface
export interface IQuestionBox {
  questionObject: any;
  isAnswerHide: boolean;
  infoIcon: Object;
  _box: Object;
}

// Renders a box for a question using an object
const QuestionBox: React.FC<IQuestionBox> = ({
  questionObject,
  isAnswerHide,
  infoIcon,
  _box,
}) => {
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
            {questionObject.options?.map((item, index) => (
              <QuestionOption
                item={item}
                isAnswerHide={isAnswerHide}
                index={index}
                key={`qo${index}`}
              />
            ))}
          </VStack>
        </Box>
      ) : (
        <React.Fragment />
      )}
    </Box>
  );
};

export default QuestionBox;
