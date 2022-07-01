import { get, post } from './RestClient'

export const getAllQuestions = async (filter, request) => {
  const questionList = await post(
    'https://vdn.diksha.gov.in/action/composite/v3/search',
    {
      request: {
        filters: {
          objectType: 'Question',
          status: ['Live'],
          ...filter
        },
        ...request
      }
    }
  )

  if (questionList.data && questionList?.data?.result.count > 0) {
    return getQuestionByIds(questionList?.data?.result?.Question, 'identifier')
  } else {
    return []
  }
}

export const getQuestionByIds = (questions, subParam) => {
  const data = questions.map(
    async (question) =>
      await readQuestion(subParam ? question[subParam] : question)
  )
  return Promise.all(data).then((values) => values)
}

const readQuestion = async (questionId) => {
  const question = await get(
    `https://vdn.diksha.gov.in/action/question/v1/read/${questionId}`,
    {
      params: {
        fields:
          'body,instructions,primaryCategory,mimeType,qType,answer,responseDeclaration,interactionTypes,interactions,name,solutions,editorState,media,name,board,medium,gradeLevel,subject,topic,learningOutcome,marks,bloomsLevel,author,copyright,license'
      }
    }
  )
  if (question.data) {
    const { editorState, subject, topic, gradeLevel, qType, identifier } =
      question.data.result.question
    return {
      ...editorState,
      subject,
      topic,
      class: gradeLevel,
      qType,
      questionId: identifier
    }
  } else {
    return []
  }
}
