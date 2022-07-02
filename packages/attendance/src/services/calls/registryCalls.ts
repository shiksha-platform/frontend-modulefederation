// Lib
import {
  studentRegistryService,
  attendanceRegistryService,
} from "@shiksha/common-lib";

export const GetAttendance = async (params) => {
  return await attendanceRegistryService.getAll(params);
};

export const DefaultStudents = async (data): Promise<any> => {
  return await studentRegistryService.setDefaultValue(data);
};
