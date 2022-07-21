import { get, post } from './RestClient'
import manifest from '../manifest.json'
import mapInterfaceData from './mapInterfaceData'
const defaultAdapter = 'diksha'

const interfaceData = {
  id: 'groupId',
  schoolId: 'schoolId',
  type: 'type',
  name: 'name',
  section: 'section',
  status: 'status',
  image: 'image',
  mergeParameterWithValue: {
    title: 'name'
  },
  mergeParameterWithDefaultValue: {
    icon: 'calendar',
    route: '/classes/:id'
  }
}

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

export const getSubjectsList = async (params = {}, header = {}) => {
  const headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const adapter = params.adapter ? params.adapter : defaultAdapter
  const result = await get(
    `${manifest.api_url}/question/${adapter}/subjectlist`,
    params,
    {
      headers
    }
  )

  if (result.data && result.data.data) {
    return result.data.data.sort()
  } else {
    return []
  }
}

export const getCompetenciesList = async (params = {}, header = {}) => {
  const headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const adapter = params.adapter ? params.adapter : defaultAdapter
  const result = await get(
    `${manifest.api_url}/question/${adapter}/competencieslist`,
    {
      params,
      headers
    }
  )

  if (result.data && result.data.data) {
    return result.data.data.sort()
  } else {
    return []
  }
}

export const createUpdateAssessment = async (params = {}, header = {}) => {
  const headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await post(`${manifest.api_url}/trackassessment`, params, {
    headers
  })

  if (result.data && result.data.data) {
    return result.data.data
  } else {
    return {}
  }
}

export const getAssessmentDetails = async (params = {}, header = {}) => {
  const headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await get(`${manifest.api_url}/trackassessment/${params}`, {
    headers
  })

  if (result.data && result.data.data) {
    return result.data.data
  } else {
    return {}
  }
}

export const getAttendanceDetailsByClass = async (
  groupId,
  params = {},
  header = {}
) => {
  const headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await get(
    `${manifest.api_url}/attendance/${groupId}/studentdetails`,
    {
      params,
      headers
    }
  )

  if (result.data && result.data.data) {
    return result.data.data.sort()
  } else {
    return []
  }
}
