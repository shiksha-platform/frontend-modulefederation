import mapInterfaceData from './mapInterfaceData'
import { get, post, update as updateRequest } from './RestClient'

const interfaceData = {
  id: 'teacherId',
  fullName: 'fullName',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  aadhaar: 'aadhaar',
  cadre: 'cadre',
  compSkills: 'compSkills',
  designation: 'designation',
  image: 'image',
  workingStatus: 'workingStatus',
  birthDate: 'birthDate',
  block: 'block',
  bloodGroup: 'bloodGroup',
  createdAt: 'createdAt',
  disability: 'disability',
  district: 'district',
  employmentType: 'employmentType',
  gender: 'gender',
  homeDistance: 'homeDistance',
  joiningDate: 'joiningDate',
  maritalStatus: 'maritalStatus',
  middleName: 'middleName',
  phoneNumber: 'phoneNumber',
  pincode: 'pincode',
  profQualification: 'profQualification',
  refId1: 'refId1',
  refId2: 'refId2',
  refId3: 'refId3',
  religion: 'religion',
  reportsTo: 'reportsTo',
  retirementDate: 'retirementDate',
  schoolId: 'schoolId',
  socialCategory: 'socialCategory',
  stateId: 'stateId',
  status: 'status',
  subjectIds: 'subjectIds',
  teacherAddress: 'teacherAddress',
  updatedAt: 'updatedAt',
  village: 'village',
  fcmToken: 'fcmToken',
  mergeParameterWithValue: {
    title: 'fullName'
  }
}

export const getAll = async (params = {}, header = {}) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    ...header
  }

  const result = await post(
    `${process.env.REACT_APP_API_URL}/teacher/search`,
    params,
    {
      headers
    }
  )
  if (result.data) {
    return result.data.map((e) => mapInterfaceData(e, interfaceData))
  } else {
    return []
  }
}

export const getOne = async (params = {}, header = {}) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    ...header
  }

  const result = await get(`${process.env.REACT_APP_API_URL}/teacher`, {
    params,
    headers
  }).catch((error) => error)
  if (result.data) {
    return mapInterfaceData(result.data.data[0], interfaceData)
  } else {
    return {}
  }
}

export const update = async (data = {}, header = {}) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    ...header
  }
  let newInterfaceData = interfaceData
  if (headers?.removeParameter || headers?.onlyParameter) {
    newInterfaceData = {
      ...interfaceData,
      removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
      onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : []
    }
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)

  const result = await updateRequest(
    process.env.REACT_APP_API_URL + '/teacher/' + data.id,
    newData,
    { headers }
  )
  if (result?.data) {
    return result
  } else {
    return {}
  }
}
