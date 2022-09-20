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
  updatedAt: 'updatedAt',
  parentName: 'parentName'
}

let only = Object.keys(interfaceData)

export const getAll = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  const result = await get(process.env.REACT_APP_API_URL + '/attendance', {
    params: { ...params },
    headers
  })
  if (result.data.data) {
    return result.data.data.map((e) => mapInterfaceData(e, interfaceData))
  } else {
    return []
  }
}

export const getOne = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  const result = await get(
    process.env.REACT_APP_API_URL +
      `/attendance/usersegment/` +
      `${params.attendance}`,
    {
      params: { ...params },
      headers
    }
  )
  if (result.data) {
    //return result.data.data.map((e) => mapInterfaceData(e, interfaceData))
    return result.data.data
  } else {
    return []
  }
}

export const create = async (data, headers = {}) => {
  let header = {
    ...headers,
    Authorization: 'Bearer ' + localStorage.getItem('token')
    // 'Content-Type': 'multipart/form-data'
  }
  let newInterfaceData = interfaceData
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)
  // newData = addFile(newData, newData.image)

  const result = await post(
    process.env.REACT_APP_API_URL + '/attendance',
    newData,
    {
      headers: header
    }
  )

  if (result.data) {
    return result.data?.data?.attendanceId
  } else {
    return false
  }
}

export const update = async (data = {}, headers = {}) => {
  let header = {
    ...headers,
    Authorization: 'Bearer ' + localStorage.getItem('token')
    // 'Content-Type': 'multipart/form-data'
  }
  let newInterfaceData = interfaceData
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only
  }
  let newData = mapInterfaceData(data, newInterfaceData, true)
  // newData = addFile(newData, newData.image)
  const result = await coreUpdate(
    process.env.REACT_APP_API_URL + '/attendance/' + data.id,
    newData,
    {
      headers: header
    }
  )
  if (result.data) {
    return result
  } else {
    return {}
  }
}

export const multipal = async (data = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  const result = await post(
    process.env.REACT_APP_API_URL + '/attendance/bulkAttendance',
    data,
    { headers }
  )
  if (result.data) {
    return result
  } else {
    return {}
  }
}

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime })
}

const addFile = (newData) => {
  let { image, ...data } = newData
  if (image) {
    const file = dataURLtoFile(image, `selfie-${new Date().toDateString()}`)
    const form_data = new FormData()
    form_data.append('image', file, file.name)
    for (let item in data) {
      form_data.append(item, data[item])
    }
    return form_data
  } else {
    return newData
  }
}
