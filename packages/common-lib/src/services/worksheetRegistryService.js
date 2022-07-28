import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'
import { get, post, update as coreUpdate } from './RestClient'
import * as likeRegistryService from './likeRegistryService'
import * as commentRegistryService from './commentRegistryService'

const interfaceData = {
  id: 'worksheetId',
  name: 'name',
  state: 'state',
  subject: 'subject',
  grade: 'grade',
  level: 'level',
  topic: 'topic',
  source: 'source',
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
    process.env.REACT_APP_API_URL + '/worksheet/search',
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

export const getOne = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  try {
    const result = await get(
      process.env.REACT_APP_API_URL + '/worksheet/' + filters.id,
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
    process.env.REACT_APP_API_URL + '/worksheet',
    newData,
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )
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
    process.env.REACT_APP_API_URL + '/worksheet/' + data.id,
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

export const getWorksheetLikes = async (id) => {
  return await likeRegistryService.getAll({
    contextId: { eq: id },
    context: { eq: 'Worksheet' },
    type: { eq: 'like' }
  })
}

export const getWorksheetComments = async (id, filter = {}) => {
  return await commentRegistryService.getAll({
    contextId: { eq: id },
    context: { eq: 'Worksheet' },
    ...filter
  })
}
