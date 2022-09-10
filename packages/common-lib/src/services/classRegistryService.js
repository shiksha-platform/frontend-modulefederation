import { get, post, update as coreUpdate } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import * as questionRegistryService from './questionRegistryService'

const interfaceData = {
  id: 'groupId',
  schoolId: 'schoolId',
  type: 'type',
  name: 'name',
  section: 'section',
  status: 'status',
  image: 'image',
  gradeLevel: 'gradeLevel',
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
    `${process.env.REACT_APP_API_URL}/group/participant/${params.teacherId}?role=Teacher`,
    {
      ...params,
      headers
    }
  )
  if (result.data) {
    if (params.coreData === 'getCoreData') {
      return result.data.data
    }
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
    process.env.REACT_APP_API_URL + '/group/' + data.id,
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
    process.env.REACT_APP_API_URL + '/group/' + data.id,
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

export const getAllData = async (
  { coreData, ...filters } = {},
  header = {}
) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await post(
    `${process.env.REACT_APP_API_URL}/group/search`,
    { filters },
    {
      headers
    }
  )

  if (result.data) {
    if (coreData === 'getCoreData') {
      return result.data.data
    }
    if (coreData === 'getStudents') {
      return await getStudents(result.data.data)
    }
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
    `${process.env.REACT_APP_API_URL}/group/${filters.id}`,
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

export const getChild = async ({ groupId, ...params } = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await get(
    `${process.env.REACT_APP_API_URL}/group/${groupId}/child`,
    { params, headers }
  )
  if (result.data) {
    return result.data.data
  } else {
    return {}
  }
}

export const getGradeSubjects = async (
  { teacherId, ...params } = {},
  header = {}
) => {
  const groupData = await getAll({ teacherId, coreData: 'getCoreData' })
  let data = await Promise.all(
    groupData.map(async (item) => await getDataWithSubjectOne(item))
  )
  return data.reduce((newData, old) => [...newData, ...old])
}

export const getGradeSubjectsQuery = async (params = {}, header = {}) => {
  const groupData = await getAllData({ ...params, coreData: 'getCoreData' })
  let data = await Promise.all(
    groupData.map(async (item) => await getDataWithSubjectOne(item))
  )
  return data.reduce((newData, old) => [...newData, ...old])
}

const getDataWithSubjectOne = async (object) => {
  let subjectData = []
  const item = mapInterfaceData(object, interfaceData)
  if (item.gradeLevel) {
    subjectData = await questionRegistryService.getSubjectsList({
      gradeLevel: item.gradeLevel,
      adapter: 'diksha'
    })
  }
  return subjectData.map((e) => {
    return { ...item, subjectName: e?.code }
  })
}

export const getStudents = async (data) => {
  return await Promise.all(data.map(async (item) => await getStudent(item)))
}

const getStudent = async (object) => {
  let studentData = []
  const item = mapInterfaceData(object, interfaceData)
  if (item.id) {
    studentData = await getChild({
      groupId: item.id,
      role: 'Student'
    })
  }
  return { ...item, studentData }
}
