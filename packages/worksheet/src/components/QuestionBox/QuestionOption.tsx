// Lib
import * as React from "react";
import { HStack } from "native-base";
import { BodyMedium, overrideColorTheme } from "@shiksha/common-lib";

// Components
import HtmlPrint from "components/HTMLPrint";

// Constants
import colorTheme from "../../colorTheme";
const alphabet = ["a", "b", "c", "d", "e", "f"];
const colors = overrideColorTheme(colorTheme);

// Interface
export interface IQuestionOption {
  item: any;
  isAnswerHide: boolean;
  index: number;
}

// Returns a single option for a Question
const QuestionOption: React.FC<IQuestionOption> = ({
  item,
  isAnswerHide,
  index,
}) => {
  return (
    <HStack space="1" alignItems="baseline">
      <BodyMedium
        textTransform="inherit"
        color={item.answer && !isAnswerHide ? "worksheet.success" : ""}
      >
        {alphabet[index] + ". "}
      </BodyMedium>
      <BodyMedium
        color={item.answer && !isAnswerHide ? "worksheet.success" : ""}
      >
        <HtmlPrint html={item?.value?.body} />
      </BodyMedium>
    </HStack>
  );
};

export default QuestionOption;
