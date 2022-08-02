import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'

const interfaceData = {
  id: 'id',
  type: 'type',
  useCase: 'useCase',
  body: 'body',
  meta: 'meta',
  user: 'user',
  tag: 'tag',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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
  const result = await get(
    process.env.REACT_APP_API_URL + '/template/:/searchByTag',
    {
      params: { ...params, limit },
      headers: headers?.headers ? headers?.headers : {}
    }
  )

  if (result.data.data) {
    return result.data.data.map((e) => mapInterfaceData(e, interfaceData))
  } else {
    return []
  }
}

export const getOne = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  try {
    const result = await get(
      process.env.REACT_APP_API_URL + '/template/' + filters.id,
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
  } catch {
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
    process.env.REACT_APP_API_URL + '/template',
    newData,
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )
  if (result.data) {
    let { template } = result.data?.data?.result
    return template
  } else {
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
    process.env.REACT_APP_API_URL + '/template/' + data.id,
    newData,
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )
  if (result.data) {
    return result
  } else {
    return {}
  }
}
