import { get, post, update as updateRequest } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import * as userRegistryService from './userRegistryService'

const interfaceData = {
  id: 'commentId',
  contextId: 'contextId',
  context: 'context',
  userId: 'userId',
  comment: 'comment',
  parentId: 'parentId',
  status: 'status',
  privacy: 'privacy',
  createdAt: 'createdAt'
}

let commentEntityAttributes = Object.keys(interfaceData)

export const getAll = async ({ limit, ...params } = {}, header = {}) => {
  const result = await post(
    process.env.REACT_APP_API_URL + '/comment/search',
    { filters: params, limit: limit },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        ...header
      }
    }
  )
  if (result.data.data) {
    const newData = result.data.data.map((e) =>
      mapInterfaceData(e, interfaceData)
    )
    return await getDataWithUser(newData)
  } else {
    return []
  }
}

export const create = async (
  data,
  { removeParameter, onlyParameter, ...headers } = {}
) => {
  let newInterfaceData = interfaceData
  newInterfaceData = {
    ...interfaceData,
    removeParameter: removeParameter ? removeParameter : [],
    onlyParameter: onlyParameter ? onlyParameter : commentEntityAttributes
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)
  const result = await post(
    process.env.REACT_APP_API_URL + '/comment',
    newData,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        ...headers
      }
    }
  )
  if (result.data) {
    return result.data?.data?.commentId
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
    onlyParameter: onlyParameter ? onlyParameter : commentEntityAttributes
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)

  const result = await updateRequest(
    process.env.REACT_APP_API_URL + '/comment/' + data.id,
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

export const getDataWithUser = async (data) => {
  return await Promise.all(
    data.map(async (item) => {
      let userData = {}
      console.log(item)
      if (item.userType === 'Teacher' || true) {
        console.log(item.userId, 'USER ID')
        userData = await userRegistryService.getOne({ id: item?.userId })
      }
      return { ...item, userData }
    })
  )
}
