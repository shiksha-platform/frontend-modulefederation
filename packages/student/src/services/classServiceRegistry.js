import { get, post } from "@shiksha/common-lib";
import mapInterfaceData from "./mapInterfaceData";
import manifest from "../manifest.json";

const interfaceData = {
  id: "id",
  schoolId: "schoolId",
  type: "type",
  name: "name",
  status: "status",
  createdOn: "createdOn",
  createdBy: "createdBy",
  updatedBy: "updatedBy",
  updatedOn: "updatedOn",
  mergeParameterWithValue: {
    title: "name",
  },
  mergeParameterWithDefaultValue: {
    icon: "calendar",
    route: "/classes/:id",
  },
};

export const getAll = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const result = await get(
    manifest.api_url + "/group/memberships/" + params.teacherId,
    {
      ...params,
      headers,
    }
  );
  if (result.data) {
    return result.data.data.map((e) => mapInterfaceData(e, interfaceData));
  } else {
    return [];
  }
};

export const getOne = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const result = await get(manifest.api_url + "/group/" + filters.id, {
    headers,
  });
  if (result.data) {
    return mapInterfaceData(result.data.data, interfaceData);
  } else {
    return {};
  }
};
