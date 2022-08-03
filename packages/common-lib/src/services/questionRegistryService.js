import { get, post } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'

const interfaceData = {
  questionId: 'questionId',
  body: 'body',
  question: 'body',
  answer: 'answer',
  options: 'options',
  class: 'class',
  compatibilityLevel: 'compatibilityLevel',
  language: 'language',
  learningOutcome: 'learningOutcome',
  maxScore: 'maxScore',
  subject: 'subject',
  topic: 'topic',
  type: 'type'
}

export const getAllQuestions = async (params = {}, header = {}) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    ContentType: 'application/json',
    Accept: 'application/json',
    ...header
  }
  try {
    const result = await get(
      `${process.env.REACT_APP_API_URL}/question/${params?.adapter}/search?server=dev`,
      {
        params: params,
        headers
      }
    )
    if (result?.data?.data && result.data.data.length) {
      return result.data.data.map((e) => mapInterfaceData(e, interfaceData))
    }
  } catch (e) {
    console.error(e)
  }
  return []
}
export const getAll = async (filter, request) => {
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
