import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'

const interfaceData = {
  organizationName: 'organizationName',
  workHistoryId: 'workHistoryId',
  userId: 'userId',
  role: 'role',
  joiningDesignation: 'joiningDesignation',
  leavingDesignation: 'leavingDesignation',
  dateOfJoining: 'dateOfJoining',
  dateOfRelieving: 'dateOfRelieving',
  reason: 'reason',
  remark: 'remark',
  cadre: 'cadre',
  transferOrderNumber: 'transferOrderNumber',
  placeOfPosting: 'placeOfPosting',
  dateOfOrder: 'dateOfOrder',
  modeOfPosting: 'modeOfPosting',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
}

export const getOne = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  try {
    const result = await get(
      process.env.REACT_APP_API_URL + '/workhistory/' + filters.id,
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
    process.env.REACT_APP_API_URL + '/workhistory',
    newData,
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )
  if (result.data) {
    let { workHistory } = result.data?.data?.result
    return workHistory
  } else {
    console.warn('An error has occured while getting the response from API')
    return false
  }
}

export const sendNotificationSearch = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await post(
    process.env.REACT_APP_API_URL + '/workhistory/search',
    params,
    {
      headers
    }
  )
  if (result.data) {
    const data = result.data.data.map((e) => mapInterfaceData(e, interfaceData))
    return _.sortBy(data, 'name')
  } else {
    console.warn('An error has occured while getting the response from API')
    return []
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
    process.env.REACT_APP_API_URL + '/workhistory/' + data.id,
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
