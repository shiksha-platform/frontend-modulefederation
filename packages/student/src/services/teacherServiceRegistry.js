import mapInterfaceData from "./mapInterfaceData";
import manifest from "../manifest.json";
import { get, post, update as coreUpdate } from "@shiksha/common-lib";

const interfaceData = {
  id: "osid",
  fullName: "teacherFullName",
  refId: "teacherRefId",
  highestQualification: "highestQualification",
  firstName: "teacherFirstName",
  lastName: "teacherLastName",
  currentServiceType: "currentServiceType",
  email: "email",
  mergeParameterWithValue: {
    title: "teacherFullName",
  },
};

export const getAll = async (
  filters = {
    filters: {},
  }
) => {
  const result = await post(manifest.api_url + "Teacher/search", filters);
  if (result.data) {
    return result.data.map((e) => mapInterfaceData(e, interfaceData));
  } else {
    return [];
  }
};

export const getOne = async (filters = {}, headers = {}) => {
  const result = await get(
    manifest.api_url + "Teacher/018a8e96-6ba8-496e-93c7-c362696c5da7",
    { headers }
  ).catch((error) => error);
  if (result.data) {
    return mapInterfaceData(result.data, interfaceData);
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
    manifest.api_url + "/Teacher/" + data.id,
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
