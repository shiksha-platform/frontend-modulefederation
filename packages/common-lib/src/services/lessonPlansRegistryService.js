import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'
import { get, post, update as coreUpdate } from './RestClient'
import * as likeRegistryService from './likeRegistryService'
import * as commentRegistryService from './commentRegistryService'

const interfaceData = {
  id: 'contentId',
  name: 'name',
  code: 'code',
  status: 'status',
  channel: 'channel',
  mediaType: 'mediaType',
  compatibilityLevel: 'compatibilityLevel',
  audience: 'audience', //Array
  posterImage: 'posterImage',
  duration: 'duration',
  downloadUrl: 'downloadUrl',
  previewUrl: 'previewUrl',
  author: 'author',
  languageCode: 'languageCode', //Array
  language: 'language', //Array
  ageGroup: 'ageGroup', //Array
  contentType: 'contentType',
  category: 'category', //Array
  teachingMode: 'teachingMode',
  skills: 'skills', //Array
  keywords: 'keywords', //Array
  description: 'description',
  instructions: 'instructions',
  body: 'body',
  learningObjective: 'learningObjective', //Array
  creator: 'creator',
  reviewer: 'reviewer',
  lastSubmittedBy: 'lastSubmittedBy',
  lastSubmittedOn: 'lastSubmittedOn',
  lastPublishedBy: 'lastPublishedBy',
  lastPublishedOn: 'lastPublishedOn',
  subject: 'subject', //Array
  questionCategories: 'questionCategories', //Array
  medium: 'medium', //Array
  gradeLevel: 'gradeLevel', //Array
  topic: 'topic', //Array
  subjectCodes: 'subjectCodes', //Array
  difficultyLevel: 'difficultyLevel',
  board: 'board',
  primaryCategory: 'primaryCategory',
  accessibility: 'accessibility', //Array
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy'
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
    process.env.REACT_APP_API_URL + '/lessonPlan/search',
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
      process.env.REACT_APP_API_URL + `/lessonPlan/${filters.id}`,
      {
        //params: filters.id,
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
    process.env.REACT_APP_API_URL + '/lessonPlan',
    newData,
    {
      headers: headers?.headers ? headers?.headers : {}
    }
  )
  if (result.data) {
    return true
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
    process.env.REACT_APP_API_URL + '/lessonPlan/' + data.id,
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

export const getLessonPlansLikes = async (id) => {
  return await likeRegistryService.getAll({
    contextId: { eq: id },
    context: { eq: 'Lessonplans' },
    type: { eq: 'like' }
  })
}

export const getLessonPlansComments = async (id, filter = {}) => {
  return await commentRegistryService.getAll({
    contextId: { eq: id },
    context: { eq: 'Lessonplan' },
    ...filter
  })
}
