import {
  get,
  post,
  update as updateRequest,
  distory as distoryRequest
} from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import * as userRegistryService from './userRegistryService'

const interfaceData = {
  id: 'likeId',
  contextId: 'contextId',
  context: 'context',
  userId: 'userId',
  type: 'type'
}

let commentEntityAttributes = Object.keys(interfaceData)

export const getAll = async ({ limit, ...params } = {}, header = {}) => {
  const result = await post(
    process.env.REACT_APP_API_URL + '/like/search',
    { filters: params, limit: limit },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        ...header
      }
    }
  )
  if (result.data.data) {
    return await getDataWithRelational(result.data.data)
  } else {
    return []
  }
}

export const create = async (
  data,
  { removeParameter, onlyParameter, ...headers } = {}
) => {
  let newInterfaceData = interfaceData
  let header = {
    ...headers,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  newInterfaceData = {
    ...interfaceData,
    removeParameter: removeParameter ? removeParameter : [],
    onlyParameter: onlyParameter ? onlyParameter : commentEntityAttributes
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)
  const result = await post(process.env.REACT_APP_API_URL + '/like', newData, {
    headers: header
  })
  if (result.data) {
    return result.data?.data?.likeId
  } else {
    return false
  }
}

export const update = async (
  data = {},
  { removeParameter, onlyParameter, ...headers } = {}
) => {
  let newInterfaceData = interfaceData
  let header = {
    ...headers,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  newInterfaceData = {
    ...interfaceData,
    removeParameter: removeParameter ? removeParameter : [],
    onlyParameter: onlyParameter ? onlyParameter : only
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)

  const result = await updateRequest(
    process.env.REACT_APP_API_URL + '/like/' + data.id,
    newData,
    {
      headers: header
    }
  )
  if (result.data) {
    return result
  } else {
    return {}
  }
}

export const distory = async (data = {}, headers = {}) => {
  let header = {
    ...headers,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await distoryRequest(
    process.env.REACT_APP_API_URL + '/like/' + data.id,
    data,
    {
      headers: header
    }
  )
  if (result.data) {
    return result
  } else {
    return {}
  }
}

const getDataWithRelational = async (data) => {
  return await Promise.all(
    data.map(async (item) => await getDataWithRelationalOne(item))
  )
}

const getDataWithRelationalOne = async (object) => {
  let userData = {}
  const item = mapInterfaceData(object, interfaceData)
  if (item.userId) {
    userData = await userRegistryService.getOne({ id: item.userId })
  }
  return { ...item, userData }
}
