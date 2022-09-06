import { get, post, update as coreUpdate } from './RestClient'
import qs from 'qs'

export const getContentPageData = async (slug = '', header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  const result = await get(
    `http://localhost:3000/api/v1/contentPages/${slug}`,
    {
      headers
    }
  )
  if (result.data.data) {
    console.log(result)
    return result.data.data
  } else {
    return { error: 404 }
  }
}
