import axios from "axios";

export const getAllQuestions = async (filter) => {
  const questionList = await axios.post(
    "https://vdn.diksha.gov.in/action/composite/v3/search",
    {
      request: {
        filters: {
          objectType: "Question",
          status: ["Live"],
          ...filter,
          // qType: "MCQ",
          // qType: "SA",
        },
      },
    }
  );

  if (questionList.data && questionList?.data?.result.count > 0) {
    const data = questionList?.data?.result?.Question.map(
      async (question) => await readQuestion(question.identifier)
    );
    return Promise.all(data).then((values) => values);
  } else {
    return [];
  }
};

const readQuestion = async (questionId) => {
  const question = await axios.get(
    `https://vdn.diksha.gov.in/action/question/v1/read/${questionId}`,
    {
      params: {
        fields:
          "body,instructions,primaryCategory,mimeType,qType,answer,responseDeclaration,interactionTypes,interactions,name,solutions,editorState,media,name,board,medium,gradeLevel,subject,topic,learningOutcome,marks,bloomsLevel,author,copyright,license",
      },
    }
  );
  if (question.data) {
    const { editorState, subject, topic, gradeLevel, qType, identifier } =
      question.data.result.question;
    return {
      ...editorState,
      subject,
      topic,
      class: gradeLevel,
      qType,
      questionId: identifier,
    };
  } else {
    return [];
  }
};
