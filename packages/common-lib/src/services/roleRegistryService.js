import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'
import * as likeRegistryService from './likeRegistryService'
import * as commentRegistryService from './commentRegistryService'

const interfaceData = {
  roleId: 'id',
  title: 'title',
  parentId: 'parentId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
}

let only = Object.keys(interfaceData)

export const getAll = async ({ limit, ...params } = {}, header = {}) => {
  try {
    let headers = {
      ...header,
      headers: {
        ...header.header,
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    const result = await post(
      process.env.REACT_APP_API_URL + '/role/search',
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
  } catch (e) {
    console.log(e.message)
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
      process.env.REACT_APP_API_URL + '/role/' + filters.id,
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
  const result = await post(process.env.REACT_APP_API_URL + '/role', newData, {
    headers: headers?.headers ? headers?.headers : {}
  })
  if (result.data) {
    let { Worksheet } = result.data?.data?.result
    return Worksheet
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
    process.env.REACT_APP_API_URL + '/role/' + data.id,
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
