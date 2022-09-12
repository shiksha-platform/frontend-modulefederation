import { get, post, update as coreUpdate } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'

const interfaceData = {
  messageState: 'messageState',
  readTimestamp: 'readTimestamp',
  sentTimestamp: 'sentTimestamp',
  deliveryTimestamp: 'deliveryTimestamp',
  provider: 'provider',
  botUuid: 'botUuid',
  payload: 'payload',
  channel: 'channel',
  ownerOrgId: 'ownerOrgId',
  id: 'id',
  messageId: 'messageId',
  sessionId: 'sessionId',
  ownerId: 'ownerId',
  fromId: 'fromId',
  userId: 'userId',
  timestamp: 'timestamp'
}

export const getAllForUser = async (params, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  const result = await get(
    process.env.REACT_APP_API_URL + '/inappnotification/userhistory',
    {
      params: params,
      headers
    }
  )
  if (result.data.data.records) {
    return result.data.data.records.map((e) =>
      mapInterfaceData(e, interfaceData)
    )
  } else {
    return []
  }
}

export const getAllForBot = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  const result = await get(
    process.env.REACT_APP_API_URL + 'inappnotification/bothistory',
    {
      params: { ...params },
      headers
    }
  )
  if (result.data.records) {
    return result.data.records.map((e) => mapInterfaceData(e, interfaceData))
  } else {
    return []
  }
}

export const sendReadReceipt = async (params, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  const result = await post(
    process.env.REACT_APP_API_URL + '/inappnotification/readreceipt',
    params,
    {
      params,
      headers
    }
  )
  if (result.message === 'Ok') {
    return true
  } else {
    return false
  }
}
