import { get } from './RestClient'

export const getQuestionIds = async (params = {}, header = {}) => {
    const headers = {
        ...header,
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
    const result = await get(
        `${process.env.REACT_APP_API_URL}/questionsConfig?type=${params?.type}&grade=${params?.grade}`,
        params,
        {
            headers
        }
    )

    if (result && result.data && result.data.data) {
        return result?.data?.data?.identifiers
    } else {
        return []
    }
}