import mapInterfaceData from "./mapInterfaceData";
import manifest from "../manifest.json";
import { get, post } from "@shiksha/common-lib";

const interfaceData = {
  id: "teacherId",
  fullName: "fullName",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  aadhaar: "aadhaar",
  cadre: "cadre",
  compSkills: "compSkills",
  designation: "designation",
  image: "image",
  workingStatus: "workingStatus",
  birthDate: "birthDate",
  block: "block",
  bloodGroup: "bloodGroup",
  createdAt: "createdAt",
  disability: "disability",
  district: "district",
  employmentType: "employmentType",
  gender: "gender",
  homeDistance: "homeDistance",
  joiningDate: "joiningDate",
  maritalStatus: "maritalStatus",
  middleName: "middleName",
  phoneNumber: "phoneNumber",
  pincode: "pincode",
  profQualification: "profQualification",
  refId1: "refId1",
  refId2: "refId2",
  refId3: "refId3",
  religion: "religion",
  reportsTo: "reportsTo",
  retirementDate: "retirementDate",
  schoolId: "schoolId",
  socialCategory: "socialCategory",
  stateId: "stateId",
  status: "status",
  subjectIds: "subjectIds",
  teacherAddress: "teacherAddress",
  updatedAt: "updatedAt",
  village: "village",
  mergeParameterWithValue: {
    title: "fullName",
  },
};

export const getAll = async (
  filters = {
    filters: {},
  }
) => {
  const result = await post(
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
  const result = await get(
    "https://dev-shiksha.uniteframework.io/registry/api/v1" +
      "/Teacher/a7024a1b-1fc6-4337-adc9-fc024943e8f8",
    { headers }
  ).catch((error) => error);
  if (result.data) {
    return mapInterfaceData(result.data, interfaceData);
  } else {
    return {};
  }
};
