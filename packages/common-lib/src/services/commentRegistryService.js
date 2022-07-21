import { get, post, update as updateRequest } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'
import * as teacherRegistryService from './teacherRegistryService'

const interfaceData = {
  id: 'commentId',
  contextId: 'contextId',
  context: 'context',
  userId: 'userId',
  comment: 'comment',
  parentId: 'parentId',
  status: 'status',
  privacy: 'privacy'
}

let commentEntityAttributes = Object.keys(interfaceData)

export const getAll = async ({ limit, ...params } = {}, header = {}) => {
  const result = await post(
    manifest.api_url + '/comment/search',
    { filters: params, limit: limit },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        ...header
      }
    }
  )
  if (result.data.data) {
    const data = result.data.data.map((e) => mapInterfaceData(e, interfaceData))

    return data
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
  const result = await post(manifest.api_url + '/comment', newData, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      ...headers
    }
  })
  if (result.data) {
    let { Comment } = result.data?.data?.result
    return Comment
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
    manifest.api_url + '/comment/' + data.id,
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
