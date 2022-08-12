import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'

const interfaceData = {
  id: 'courseId',
  name: 'name',
  posterImage: 'posterImage',
  subject: 'subject',
  description: 'description'
}

let only = Object.keys(interfaceData)

export const getAll = async ({ adapter, ...params } = {}, header = {}) => {
  let headers = {
    ...header,
    headers: {
      ...header.header,
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const result = await get(
    process.env.REACT_APP_API_URL + '/course/' + adapter + '/search',
    null,
    { params, headers }
  )

  if (result.data.data) {
    const newData = result.data.data.map((e) =>
      mapInterfaceData(e, interfaceData)
    )
    return await getDataWithUser(newData)
  } else {
    return []
  }
}

export const getOne = async ({ id, adapter }, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  try {
    const result = await get(
      process.env.REACT_APP_API_URL + '/course/' + adapter + '/courseid',
      {
        params: { courseId: id },
        headers
      }
    )
    if (result?.data?.data) {
      return mapInterfaceData(result.data.data, interfaceData)
    } else {
      return {}
    }
  } catch {
    return {}
  }
}
