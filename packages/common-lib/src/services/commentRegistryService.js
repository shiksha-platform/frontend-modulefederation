import { get, post, update as updateRequest } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'

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
    manifest.api_url + '/comment/search',
    { filters: params, limit: limit },
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )
  if (result.data.data) {
    return result.data.data.map((e) => mapInterfaceData(e, interfaceData))
  } else {
    return []
  }
}

export const create = async (data, headers = {}) => {
  let newInterfaceData = interfaceData
  let header = {
    ...headers,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)
  const result = await post(manifest.api_url + '/comment', newData, {
    headers: header
  })
  if (result.data) {
    let { Comment } = result.data?.data?.result
    return Comment
  } else {
    return false
  }
}

export const update = async (data = {}, headers = {}) => {
  let newInterfaceData = interfaceData
  let header = {
    ...headers,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only
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
