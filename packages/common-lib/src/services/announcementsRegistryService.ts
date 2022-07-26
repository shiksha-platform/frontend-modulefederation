import { get, post, update as coreUpdate } from './RestClient'
import mapInterfaceData from './mapInterfaceData'

export const getAnnouncementsSet = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }

  const result = await get('http://localhost:3000/api/v1' + '/announcements', {
    params: { ...params },
    headers
  })
  if (result.data.data) {
    console.log(result);
    return result.data.data;
  } else {
    return {}
  }
}




