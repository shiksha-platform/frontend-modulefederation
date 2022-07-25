import { get, post } from './RestClient'
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

const studentInterfaceData = {
  id: 'studentId',
  fullName: 'firstName',
  firstName: 'firstName',
  fathersName: 'fatherFirstName',
  phoneNumber: 'studentPhoneNumber',
  lastName: 'lastName',
  aadhaar: 'aadhaar',
  classId: 'classId',
  schoolId: 'schoolId',
  refId: 'studentRefId',
  birthDate: 'birthDate',
  bloodGroup: 'bloodGroup',
  bpl: 'bpl',
  height: 'height',
  weight: 'weight',
  homeless: 'homeless',
  iscwsn: 'iscwsn',
  migrant: 'migrant',
  religion: 'religion',
  singleGirl: 'singleGirl',
  socialCategory: 'socialCategory',
  admissionNo: 'refId1',
  currentClassID: 'classId',
  email: 'studentEmail',
  address: 'address',
  gender: 'gender',
  attendance: 'attendance'
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
    `${process.env.REACT_APP_API_URL}/question/${adapter}/subjectlist`,
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
    `${process.env.REACT_APP_API_URL}/question/${adapter}/competencieslist`,
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
  const result = await post(
    `${process.env.REACT_APP_API_URL}/trackassessment`,
    params,
    {
      headers
    }
  )

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
  const result = await get(
    `${process.env.REACT_APP_API_URL}/trackassessment/${params}`,
    {
      headers
    }
  )

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
  const result = await post(
    `${process.env.REACT_APP_API_URL}/attendance/${groupId}/studentdetails`,
    {},
    {
      params,
      headers
    }
  )

  if (result.data && result.data.data) {
    const data = result.data.data.map((e) =>
      mapInterfaceData(e, studentInterfaceData)
    )
    return _.sortBy(data, 'firstName')
  } else {
    return []
  }
}
