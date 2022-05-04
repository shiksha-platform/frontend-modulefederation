import mapInterfaceData from "./mapInterfaceData";
import manifest from "../manifest.json";
import { get, post } from "@shiksha/common-lib";

const interfaceData = {
  id: "teacherId",
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
  aadhaar: "",
  cadre: "cadre",
  compSkills: "compSkills",
  designation: "designation",
  image: "image",
  schoolId: "schoolId",
  workingStatus: "workingStatus",
};

export const getAll = async (
  filters = {
    filters: {},
  }
) => {
  const result = await post(manifest.api_url + "teacher/search", filters);
  if (result.data) {
    return result.data.map((e) => mapInterfaceData(e, interfaceData));
  } else {
    return [];
  }
};

export const getOne = async (filters = {}, headers = {}) => {
  const result = await get(`${manifest.api_url}/teacher`, { headers }).catch(
    (error) => error
  );
  if (result.data) {
    return mapInterfaceData(result.data.data[0], interfaceData);
  } else {
    return {};
  }
};
