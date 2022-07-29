import { get, post, update as coreUpdate } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'

const interfaceData = {
  id: 'notificationLogId',
  content: 'content',
  recepients: 'recepients',
  module: 'module',
  templateContentId: 'templateContentId',
  medium: 'medium',
  sentDate: 'sentDate',
  sentBy: 'sentBy',
  options: 'options',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
  //updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  templateId: 'templateId'
}

let only = Object.keys(interfaceData)

export const allLogGet = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const { id } = params
  const result = await get(
    process.env.REACT_APP_API_URL + '/instantNotification/log/' + `${id}`,
    {
      params: { ...params },
      headers
    }
  )
  if (result.data.data) {
    return result.data.data
    // return result.data.data.map((e) => mapInterfaceData(e, interfaceData))
  } else {
    return []
  }
}

export const sendNotificationPost = async (data, headers = {}) => {
  let newInterfaceData = interfaceData
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)
  const result = await post(
    process.env.REACT_APP_API_URL + '/instantNotification/instantSend',
    data,
    {
      params: data,
      headers: headers?.headers ? headers?.headers : {}
      //Have to change the path
      //headers
    }
  )
  if (result.data) {
    return true
  } else {
    return false
  }
}

export const sendNotificationSearch = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await post(
    process.env.REACT_APP_API_URL + '/instantNotification/log/search',
    params,
    {
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

export const scheduledLogGet = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const { id } = params
  const result = await get(
    process.env.REACT_APP_API_URL + '/scheduleNotification/log/' + `${id}`,
    {
      params: { ...params },
      headers
    }
  )
  if (result.data.data) {
    return result.data.data
    // return result.data.data.map((e) => mapInterfaceData(e, interfaceData))
  } else {
    return []
  }
}

export const sendScheduledNotificationPost = async (data, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  let newInterfaceData = interfaceData
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)
  const result = await post(
    process.env.REACT_APP_API_URL + '/scheduleNotification/scheduledSend',
    data,
    {
      params: data,
      headers
    }
  )
  if (result.data) {
    return true
  } else {
    return false
  }
}

export const sendScheduledNotificationSearch = async (
  params = {},
  header = {}
) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await post(
    process.env.REACT_APP_API_URL + '/scheduleNotification/search',
    params,
    {
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
