import { get, post, update as coreUpdate } from './RestClient'
import mapInterfaceData from './mapInterfaceData'
import manifest from '../manifest.json'

const interfaceData = {
  id: 'attendanceId',
  schoolId: 'schoolId',
  userType: 'userType',
  studentId: 'userId',
  topicId: 'topicId',
  eventId: 'eventId',
  attendance: 'attendance',
  date: 'attendanceDate',
  classId: 'groupId',
  teacherId: 'teacherId',
  admissionNo: 'admissionNo',
  remark: 'remark',
  latitude: 'latitude',
  longitude: 'longitude',
  image: 'image',
  updatedAt: 'updatedAt'
}

let only = Object.keys(interfaceData)

export const getAll = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  const result = await get(manifest.api_url + '/attendance', {
    params: { ...params },
    headers
  })
  if (result.data.data) {
    return result.data.data.map((e) => mapInterfaceData(e, interfaceData))
  } else {
    return []
  }
}

export const create = async (data, headers = {}) => {
  let newInterfaceData = interfaceData
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)
  const result = await post(manifest.api_url + '/attendance', newData, {
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
