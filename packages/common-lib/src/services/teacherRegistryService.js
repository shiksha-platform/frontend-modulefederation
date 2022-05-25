import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'
import { get, post } from './RestClient'

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
  mergeParameterWithValue: {
    title: 'fullName'
  }
}

export const getAll = async (
  filters = {
    filters: {}
  }
) => {
  const result = await post(`${manifest.api_url}/teacher/search`, filters)
  if (result.data) {
    return result.data.map((e) => mapInterfaceData(e, interfaceData))
  } else {
    return []
  }
}

export const getOne = async (filters = {}, headers = {}) => {
  const result = await get(`${manifest.api_url}/teacher`, { headers }).catch(
    (error) => error
  )
  if (result.data) {
    return mapInterfaceData(result.data.data[0], interfaceData)
  } else {
    return {}
  }
}
