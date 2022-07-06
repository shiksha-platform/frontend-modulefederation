// Lib
import {
  studentRegistryService,
  attendanceRegistryService,
} from "@shiksha/common-lib";

export const GetAttendance = async (params): Promise<any> => {
  return await attendanceRegistryService.getAll(params);
};

export const DefaultStudents = async (data): Promise<any> => {
  return await studentRegistryService.setDefaultValue(data);
};

export const MultipleAttendance = async (data): Promise<any> => {
  return await attendanceRegistryService.Multiple(data);
};
