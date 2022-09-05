import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'

const apiRoutes = {
  getSchool: '/school/'
}

const interfaceData = {
  schoolId: 'schoolId',
  schoolName: 'schoolName',
  email: 'email',
  udise: 'udise',
  mediumOfInstruction: 'mediumOfInstruction',
  phoneNumber: 'phoneNumber',
  address: 'address',
  schoolType: 'schoolType',
  website: 'website',
  village: 'village',
  block: 'block',
  district: 'district',
  cluster: 'cluster',
  stateId: 'stateId',
  pincode: 'pincode',
  locationId: 'locationId',
  enrollCount: 'enrollCount',
  status: 'status',
  latitude: 'latitude',
  longitude: 'longitude',
  metaData: 'metaData',
  deactivationReason: 'deactivationReason',
  headMaster: 'headMaster',
  board: 'board'
}

let only = Object.keys(interfaceData)

export const getSchoolById = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  try {
    const result = await get(
      process.env.REACT_APP_API_URL + apiRoutes.getSchool + filters.id,
      {
        headers
      }
    )
    if (result?.data?.data) {
      let mapResult = mapInterfaceData(result.data.data, interfaceData)
      return mapResult
    } else {
      return {}
    }
  } catch {
    return {}
  }
}
