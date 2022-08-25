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

  if (result && result.data && result.data.data) {
    return result?.data?.data?.sort()
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

export const getAllAssessment = async (params = {}, header = {}) => {
  const headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await post(
    `${process.env.REACT_APP_API_URL}/trackassessment/search`,
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

// hp assessment apis

export const getAllAllocatedSchools = async (params = {}, header = {}) => {
  const headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await post(
    `${process.env.REACT_APP_API_URL}/monitortracking/search`,
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

export const getSchoolDetail = async (id, header = {}) => {
  const headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await get(`${process.env.REACT_APP_API_URL}/school/${id}`, {
    headers
  })

  if (result.data && result.data.data) {
    return result.data.data
  } else {
    return {}
  }
}
