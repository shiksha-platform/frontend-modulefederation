import mapInterfaceData from './mapInterfaceData'
import { get, post, update as coreUpdate } from './RestClient'

const interfaceData = {
    schoolId: "schoolId",
    schoolName: "schoolName",
    email: "email",
    udise: "udise",
    mediumOfInstruction: "mediumOfInstruction",
    phoneNumber: "phoneNumber",
    address: "address",
    schoolType: "schoolType",
    website: "website",
    village: "village",
    block: "block",
    district: "district",
    stateId: "stateId",
    pincode: "pincode",
    locationId: "locationId",
    enrollCount: "enrollCount",
    status: "status",
    latitude: "latitude",
    longitude: "longitude",
    metaData: "metaData",
    deactivationReason: "deactivationReason",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    createdBy: "createdBy",
    updatedBy: "updatedBy"
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
        process.env.REACT_APP_API_URL + '/school/search',
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

export const getOne = async (params = {}, header = {}) => {
    let headers = {
        ...header,
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
    try {
        const result = await get(
            process.env.REACT_APP_API_URL + '/school/' + params.id,
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
    const result = await post(process.env.REACT_APP_API_URL + '/school', newData, {
        headers: headers?.headers ? headers?.headers : {}
    })
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
        process.env.REACT_APP_API_URL + '/school/' + data.id,
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
