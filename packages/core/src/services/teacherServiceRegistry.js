import mapInterfaceData from "./mapInterfaceData";
import manifest from "../manifest.json";
import * as RestClient from "@shiksha/common-lib";

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
  const result = await RestClient.post(
    "https://dev-shiksha.uniteframework.io/registry/api/v1" + "/Teacher/search",
    filters
  );
  if (result.data) {
    return result.data.map((e) => mapInterfaceData(e, interfaceData));
  } else {
    return [];
  }
};

export const getOne = async (filters = {}, headers = {}) => {
  const result = await RestClient.get(
    "https://dev-shiksha.uniteframework.io/registry/api/v1" +
      "/Teacher/a7024a1b-1fc6-4337-adc9-fc024943e8f8",
    {
      headers: headers,
    }
  ).catch((error) => error);
  if (result.data) {
    return mapInterfaceData(result.data, interfaceData);
  } else {
    return {};
  }
};
