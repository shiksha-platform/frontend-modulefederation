import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'
import { get, post } from './RestClient'

const interfaceData = {
  worksheetId: 'worksheetId',
  name: 'name',
  state: 'state',
  subject: 'subject',
  grade: 'grade',
  level: 'level',
  topic: 'topic',
  instructions: 'instructions',
  feedback: 'feedback',
  hints: 'hints',
  navigationMode: 'navigationMode',
  timeLimits: 'timeLimits',
  showHints: 'showHints',
  questions: 'questions',
  questionSets: 'questionSets',
  outcomeDeclaration: 'outcomeDeclaration',
  outcomeProcessing: 'outcomeProcessing',
  questionSetType: 'questionSetType',
  criteria: 'criteria',
  usedFor: 'usedFor',
  description: 'purpose',
  visibility: 'visibility',
  qumlVersion: 'qumlVersion'
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
    manifest.api_url + '/worksheet/search',
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
  const result = await post(manifest.api_url + '/worksheet', newData, {
    headers: headers?.headers ? headers?.headers : {}
  })
  if (result.data) {
    return true
    // return result.data.map((e) => mapInterfaceData(e, interfaceData));
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
    manifest.api_url + '/attendance/' + data.id,
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
