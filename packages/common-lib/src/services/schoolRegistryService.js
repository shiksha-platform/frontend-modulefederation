import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'

const interfaceData = {
  schoolId: 'schoolId',
  schoolName: 'schoolName',
  schoolEmail: 'email',
  schoolUdise: 'udise',
  schoolMediumOfInstruction: 'mediumOfInstruction',
  schoolPhoneNumber: 'phoneNumber',
  schoolAddress: 'address',
  schoolHeadMaster: 'headMaster',
  schoolType: 'schoolType',
  schoolWebsite: 'website',
  schoolVillage: 'village',
  schoolBlock: 'block',
  schoolDistrict: 'district',
  schoolStateId: 'stateId',
  schoolPincode: 'pincode',
  schoolLocationId: 'locationId',
  schoolEnrollCount: 'enrollCount',
  schoolStatus: 'status',
  schoolLatitude: 'latitude',
  schoolLongitude: 'longitude',
  schoolMetaData: 'metaData',
  schoolDeactivationReason: 'deactivationReason',
  schoolCreatedAt: 'createdAt',
  schoolUpdatedAt: 'updatedAt',
  schoolCreatedBy: 'createdBy',
  schoolUpdatedBy: 'updatedBy'
}

let only = Object.keys(interfaceData)

export const getAll = async ({ limit, ...params } = {}, header = {}) => {
  let headers = {
    ...header,
    headers: {
      ...header.header,
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const result = await post(
    process.env.REACT_APP_API_URL + '/school/search',
    { filters: params, limit: limit },
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )

  if (result.data.data) {
    return result.data.data.map((e) => mapInterfaceData(e, interfaceData))
  } else {
    console.warn('An error has occured while getting the response from API')
    return []
  }
}

export const getOne = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  try {
    const result = await get(
      process.env.REACT_APP_API_URL + '/school/' + params.id,
      {
        headers
      }
    )
    if (result?.data?.data) {
      let mapResult = mapInterfaceData(result.data.data, interfaceData)
      mapResult.id = mapResult.id?.startsWith('1-')
        ? mapResult.id?.replace('1-', '')
        : mapResult.id
      return mapResult
    } else {
      return {}
    }
  } catch (e) {
    console.warn('An error has occured while getting the response from API', e)
    return {}
  }
}

export const create = async (data, header = {}) => {
  let headers = {
    ...header,
    headers: {
      ...header.header,
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  let newInterfaceData = interfaceData
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)
  const result = await post(
    process.env.REACT_APP_API_URL + '/school',
    newData,
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )
  if (result.data) {
    let { Worksheet } = result.data?.data?.result
    return Worksheet
  } else {
    console.warn('An error has occured while getting the response from API')
    return false
  }
}

export const update = async (data = {}, headers = {}) => {
  let newInterfaceData = interfaceData
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)

  const result = await coreUpdate(
    process.env.REACT_APP_API_URL + '/school/' + data.id,
    newData,
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )
  if (result.data) {
    return result
  } else {
    console.warn('An error has occured while getting the response from API')
    return {}
  }
}
