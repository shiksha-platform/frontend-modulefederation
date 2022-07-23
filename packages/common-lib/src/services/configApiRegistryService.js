import { get, post, update as coreUpdate } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'
import { sortArray } from '../components/helper'

const interfaceData = {
  id: 'configId',
  module: 'module',
  key: 'key',
  value: 'value',
  canOverride: 'canOverride',
  overrideBy: 'overrideBy',
  isPublic: 'isPublic'
}

export const getApiConfig = async (modules = []) => {
  const arr = await getAll()
  let object = {}
  arr.forEach((e) => {
    object = { ...object, [e.key]: e.value }
  })
  return object
}

export const getAll = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await get(
    `${process.env.REACT_APP_API_URL}/config/{module}/all`,
    {
      ...params,
      headers
    }
  )
  if (result.data) {
    const data = result.data.data.map((e) => mapInterfaceData(e, interfaceData))
    return _.sortBy(data, 'name')
  } else {
    return []
  }
}

export const getOne = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await get(
    `${process.env.REACT_APP_API_URL}/config/${filters.id}`,
    {
      headers
    }
  )
  if (result.data) {
    return mapInterfaceData(result.data.data, interfaceData)
  } else {
    return {}
  }
}
