import { get, post } from "@shiksha/common-lib";
import mapInterfaceData from "./mapInterfaceData";
import manifest from "../manifest.json";

const interfaceData = {
  id: "groupId",
  schoolId: "schoolId",
  type: "type",
  name: "name",
  status: "status",
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
    `${manifest.api_url}/${manifest.api_version}/group/participant/49819de2-3c8e-473c-bda7-a1b6ea9efbbb?role=Teacher`,
    {
      ...params,
      headers,
    }
  );
  if (result.data) {
    return result.data.data.map((e) => mapInterfaceData(e, interfaceData));
    return [];
  } else {
    return [];
  }
};

export const getOne = async (filters = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const result = await get(
    `${manifest.api_url}/${manifest.api_version}/group/${filters.id}`,
    {
      headers,
    }
  );
  if (result.data) {
    return mapInterfaceData(result.data.data, interfaceData);
  } else {
    return {};
  }
};
