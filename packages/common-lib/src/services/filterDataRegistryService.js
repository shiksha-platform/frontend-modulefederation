import { get, post } from './RestClient'

export const getSubjects = async ({ adapter } = {}, header = {}) => {
  const result = await get(
    `${process.env.REACT_APP_API_URL}/question/${adapter}/subjectlist`,
    null,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        ...header
      }
    }
  )
  if (result?.data?.data) {
    return result.data.data
  } else {
    return []
  }
}
