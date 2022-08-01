import { get, post, update as coreUpdate } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'

const interfaceData = {
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
  gender: 'gender'
}

export const getAll = async ({ sortBy, ...params }, header = {}) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    ContentType: 'application/json',
    Accept: 'application/json',
    ...header
  }
  const result = await get(
    `${process.env.REACT_APP_API_URL}/group/${params?.classId}/participants?role=Student`,
    {
      headers
    }
  )
  if (result?.data?.data && result.data.data.length) {
    const studentData = result.data.data.map((e) =>
      mapInterfaceData(e, interfaceData)
    )
    if (sortBy && sortBy !== '') {
      return studentData.sort(function (oldItem, newItem) {
        return oldItem[sortBy] === newItem[sortBy]
          ? 0
          : oldItem[sortBy] < newItem[sortBy]
          ? -1
          : 1
      })
    } else {
      return studentData
    }
  }
  return []
}

export const getOne = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await get(
    process.env.REACT_APP_API_URL + '/student/' + filters.id,
    {
      headers
    }
  )
  if (result?.data?.data) {
    let resultStudent = mapInterfaceData(result.data.data, interfaceData)
    resultStudent.id = resultStudent.id?.startsWith('1-')
      ? resultStudent.id?.replace('1-', '')
      : resultStudent.id
    return resultStudent
  } else {
    return {}
  }
}

export const update = async (data = {}, headers = {}) => {
  let newInterfaceData = interfaceData
  if (headers?.removeParameter || headers?.onlyParameter) {
    newInterfaceData = {
      ...interfaceData,
      removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
      onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : []
    }
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)

  const result = await coreUpdate(
    process.env.REACT_APP_API_URL + '/student/' + data.id,
    newData,
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )
  if (result?.data) {
    return result
  } else {
    return {}
  }
}

export const setDefaultValue = async (data) => {
  return data.map((e) => mapInterfaceData(e, interfaceData))
}
