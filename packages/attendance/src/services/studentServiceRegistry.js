import { get, post, update as coreUpdate } from "@shiksha/common-lib";
import mapInterfaceData from "./mapInterfaceData";
import manifest from "../manifest.json";

const interfaceData = {
  id: "studentId",
  fullName: "firstName",
  firstName: "firstName",
  fathersName: "studentFathersName",
  phoneNumber: "studentPhoneNumber",
  lastName: "lastName",
  aadhaar: "aadhaar",
  classId: "classId",
  schoolId: "schoolId",
  refId: "studentRefId",
  birthDate: "birthDate",
  bloodGroup: "bloodGroup",
  bpl: "bpl",
  height: "height",
  weight: "weight",
  homeless: "homeless",
  iscwsn: "iscwsn",
  migrant: "migrant",
  religion: "religion",
  singleGirl: "singleGirl",
  socialCategory: "socialCategory",
  admissionNo: "admissionNo",
  currentClassID: "currentClassID",
  email: "email",
  address: "address",
  gender: "gender",
  mergeParameterWithDefaultValue: {
    admissionNo: "1",
    currentClassID: "dee531ae-9db0-4989-b6a1-da60080679df",
  },
};

export const getAll = async (params = {}, header = {}) => {
  let headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    ContentType: "application/json",
    Accept: "application/json",
    ...header,
  };
  const result = await get(
    manifest.api_url + "/group/" + params?.classId + "/participants",
    { params: { role: "Student", ...params }, headers }
  );
  if (result.data.data.length !== 0) {
    return result.data.data.map((e) => mapInterfaceData(e, interfaceData));
  }
  return [];
};

export const getOne = async (filters = {}, headers = {}) => {
  const result = await get(manifest.api_url + "/student/" + filters.id, {
    headers,
  });
  if (result?.data?.data) {
    let resultStudent = mapInterfaceData(result.data.data, interfaceData);
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

  const result = await coreUpdate(
    manifest.api_url + "/student/" + data.id,
    newData,
    {
      headers: headers?.headers ? headers?.headers : {},
    }
  );
  if (result?.data) {
    return result;
  } else {
    return {};
  }
};

export const setDefaultValue = async (data) => {
  return data.map((e) => mapInterfaceData(e, interfaceData));
};
