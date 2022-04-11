import * as generalServices from "@shiksha/common-lib";
import mapInterfaceData from "./mapInterfaceData";
import manifest from "../manifest.json";

const interfaceData = {
  id: "id",
  studentId: "userId",
  topicId: "topicId",
  attendance: "attendance",
  date: "date",
  classId: "groupId",
  teacherId: "teacherId",
  admissionNo: "admissionNo",
  currentClassID: "groupId",
  email: "email",
};

let only = Object.keys(interfaceData);

export const getAll = async (params = {}, header = {}) => {
  let headers = {
    ...header,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const result = await generalServices.get(manifest.api_url + "/attendance", {
    ...params,
    headers,
  });

  if (result.data) {
    return result.data.map((e) => mapInterfaceData(e, interfaceData));
  } else {
    return [];
  }
};

export const create = async (data, headers = {}) => {
  let newInterfaceData = interfaceData;
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only,
  };
  let newData = mapInterfaceData(data, newInterfaceData, true);
  const result = await generalServices.post(
    manifest.api_url + "/attendance",
    newData,
    {
      headers: headers?.headers ? headers?.headers : {},
    }
  );
  if (result.data) {
    return true;
    // return result.data.map((e) => mapInterfaceData(e, interfaceData));
  } else {
    return false;
  }
};

export const update = async (data = {}, headers = {}) => {
  let newInterfaceData = interfaceData;
  newInterfaceData = {
    ...interfaceData,
    removeParameter: headers?.removeParameter ? headers?.removeParameter : [],
    onlyParameter: headers?.onlyParameter ? headers?.onlyParameter : only,
  };
  let newData = mapInterfaceData(data, newInterfaceData, true);

  const result = await generalServices.update(
    manifest.api_url + "/attendance/" + data.id,
    newData,
    {
      headers: headers?.headers ? headers?.headers : {},
    }
  );
  if (result.data) {
    return result;
  } else {
    return {};
  }
};
