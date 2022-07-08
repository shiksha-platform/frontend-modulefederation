import { get, post, update as coreUpdate } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'
import { sortArray } from '../components/helper'

const interfaceData = {
  id: 'groupId',
  schoolId: 'schoolId',
  type: 'type',
  name: 'name',
  section: 'section',
  status: 'status',
  image: 'image',
  mergeParameterWithValue: {
    title: 'name'
  },
  mergeParameterWithDefaultValue: {
    icon: 'calendar',
    route: '/classes/:id'
  }
}

export const getAll = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await get(
    `${manifest.api_url}/group/participant/${params.teacherId}?role=Teacher`,
    {
      ...params,
      headers
    }
  )
  if (result.data) {
    const data = result.data.data.map((e) => mapInterfaceData(e, interfaceData))
    return data.sort(function (a, b) {
      return a.name - b.name
    })
  } else {
    return []
  }
}

export const update = async (data = {}, header = {}) => {
  let newInterfaceData = interfaceData
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  if (headers?.removeParameter || headers?.onlyParameter) {
    newInterfaceData = {
      ...interfaceData,
      removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
      onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : []
    }
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)
  const result = await coreUpdate(
    manifest.api_url + '/group/' + data.id,
    newData,
    {
      headers: headers ? headers : {}
    }
  )
  if (result?.data) {
    return result
  } else {
    return {}
  }
}

export const updateImage = async (data = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await coreUpdate(
    manifest.api_url + '/group/' + data.id,
    data,
    {
      headers: headers ? headers : {}
    }
  )
  if (result?.data) {
    return result
  } else {
    return {}
  }
}

export const getAllData = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await post(`${manifest.api_url}/group/search`, params, {
    headers
  })

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
  const result = await get(`${manifest.api_url}/group/${filters.id}`, {
    headers
  })
  if (result.data) {
    return mapInterfaceData(result.data.data, interfaceData)
  } else {
    return {}
  }
}
