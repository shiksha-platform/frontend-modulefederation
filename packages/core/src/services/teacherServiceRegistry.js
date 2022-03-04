import mapInterfaceData from "./mapInterfaceData";
import manifest from "../manifest.json";
import * as RestClient from '@shiksha/common-lib';

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
    manifest.api_url + "Teacher/search",
    filters
  );
  if (result.data) {
    return result.data.map((e) => mapInterfaceData(e, interfaceData));
  } else {
    return [];
  }
};

export const getOne = async (filters = {}, headers = {}) => {
  const result = await RestClient
  
  //edccc63f-fcc7-4529-80b7-feea3fee0f3c
    .get(manifest.api_url + "Teacher/018a8e96-6ba8-496e-93c7-c362696c5da7", {
      headers: headers,
    })
    .catch((error) => error);
    if (result.data) {
      return mapInterfaceData(result.data, interfaceData);
    } else {
      return {};
    }
};
