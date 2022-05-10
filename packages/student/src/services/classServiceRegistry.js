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
    `${manifest.api_url}/group/participant/${params.teacherId}?role=Teacher`,
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
  const result = await get(`${manifest.api_url}/group/${filters.id}`, {
    headers,
  });
  if (result.data) {
    return mapInterfaceData(result.data.data, interfaceData);
  } else {
    return {};
  }
};
