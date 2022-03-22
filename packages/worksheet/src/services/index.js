import axios from "axios";

export const getAllQuestions = async () => {
  const questionList = await axios.post(
    "https://dockstaging.sunbirded.org/action/composite/v3/search",
    {
      request: {
        filters: {
          objectType: "Question",
          status: ["Live"],
          qType: "SA",
        },
      },
    }
  );
  if (questionList.data) {
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
    `https://dockstaging.sunbirded.org/action/question/v1/read/${questionId}`,
    {
      params: {
        fields:
          "body,instructions,primaryCategory,mimeType,qType,answer,responseDeclaration,interactionTypes,interactions,name,solutions,editorState,media,name,board,medium,gradeLevel,subject,topic,learningOutcome,marks,bloomsLevel,author,copyright,license",
      },
    }
  );
  if (question.data) {
    return question.data.result.question.body;
  } else {
    return [];
  }
};
