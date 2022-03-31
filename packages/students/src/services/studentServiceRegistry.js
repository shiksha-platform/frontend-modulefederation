import * as generalServices from "@shiksha/common-lib";
import mapInterfaceData from "./mapInterfaceData";
import manifest from "./manifest.json";

const interfaceData = {
    id: "id",
    fullName: "studentFullName",
    firstName: "studentFirstName",
    fathersName: "studentFathersName",
    phoneNumber: "studentPhoneNumber",
    lastName: "studentLastName",
    refId: "studentRefId",
    admissionNo: "admissionNo",
    currentClassID: "currentClassID",
    email: "email",
    osOwner: "osOwner",
    address: "address",
    gender: "gender",
    mergeParameterWithDefaultValue: {
        fullName: "Sagar Takle",
        firstName: "Sagar",
        fathersName: "Arun",
        lastName: "Takle",
        admissionNo: "1",
        gender: "Male",
        currentClassID: "dee531ae-9db0-4989-b6a1-da60080679df",
    },
};

export const getAll = async (
    filters = {
        limit: 5,
        filters: {},
    }
) => {
    const result = await generalServices.get(
        manifest.api_url + "/group/" + filters?.classId + "/members",
        filters
    );
    if (result?.data?.data && result.data.data.length) {
        return result.data.data.map((e) => mapInterfaceData(e, interfaceData));
    } else {
        return [];
    }
};

export const getOne = async (filters = {}, headers = {}) => {
    const result = await generalServices.get(
        manifest.api_url + "Student/" + filters.id,
        {
            headers: headers,
        }
    );
    if (result.data) {
        let resultStudent = mapInterfaceData(result.data, interfaceData);
        resultStudent.id = resultStudent.id?.startsWith("1-")
            ? resultStudent.id?.replace("1-", "")
            : resultStudent.id;
        return resultStudent;
    } else {
        return {};
    }
};

export const update = async (data = {}, headers = {}) => {
    let newInterfaceData = interfaceData;
    if (headers?.removeParameter || headers?.onlyParameter) {
        newInterfaceData = {
            ...interfaceData,
            removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
            onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : [],
        };
    }
    let newData = mapInterfaceData(data, newInterfaceData, true);

    const result = await generalServices.update(
        manifest.api_url + "Student/" + data.id,
        newData,
        {
            headers: headers?.headers ? headers?.headers : {},
        }
    );
    if (result.data) {
        return result;
    } else {
        return {};
    }
};

export const setDefaultValue = async (data) => {
    return data.map((e) => mapInterfaceData(e, interfaceData));
};
