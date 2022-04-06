import * as generalServices from "@shiksha/common-lib";
import mapInterfaceData from "./mapInterfaceData";
import manifest from "../manifest.json";

const interfaceData = {
  id: "osid",
  classID: "classID",
  schoolID: "schoolID",
  class: "class",
  section: "section",
  className: "className",
  osCreatedAt: "osCreatedAt",
  osUpdatedAt: "osUpdatedAt",
  osCreatedBy: "osCreatedBy",
  osUpdatedBy: "osUpdatedBy",
  mergeParameterWithValue: {
    title: "className",
  },
  mergeParameterWithDefaultValue: {
    icon: "calendar",
    route: "/classes/:id",
  },
};

export const getAll = async (
  filters = {
    filters: {},
  }
) => {
  const result = await generalServices.post(
    manifest.api_url + "Class/search",
    filters
  );
  if (result.data) {
    console.log(result.data);
    // console.log(result.data.map((e) => mapInterfaceData(e, interfaceData)))
    // return result.data.map((e) => mapInterfaceData(e, interfaceData));
    return result.data;
  } else {
    return [];
  }
};

export const getAllClasses = async (user_id = "") => {
  const result = await generalServices.get(
    `https://dev.shikshaplatform.io/group/memberships/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  if (result.data.data) {
    return result.data.data;
  } else {
    return [];
  }
};

export const getOne = async (filters = {}, headers = {}) => {
  const result = await generalServices.get(
    manifest.api_url + "Class/" + filters.id,
    {
      headers: headers,
    }
  );
  if (result.data) {
    return mapInterfaceData(result.data, interfaceData);
  } else {
    return {};
  }
};
