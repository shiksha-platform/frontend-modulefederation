// Lib
import {
  classRegistryService,
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

export const UpdateAttendance = async (data): Promise<any> => {
  return await attendanceRegistryService.update(
    {
      id: data.attendanceId,
      attendance: data.attendance,
    },
    {
      onlyParameter: ["attendance", "id", "date", "classId"],
    }
  );
};

export const CreateAttendance = async ({
  dataObject,
  student,
  teacherId,
}): Promise<any> => {
  return await attendanceRegistryService.create({
    studentId: student.id,
    date: dataObject.date,
    attendance: dataObject.attendance,
    attendanceNote: "Test",
    classId: student.currentClassID,
    subjectId: "History",
    teacherId: teacherId,
  });
};

export const GetOneClass = async (id) => {
  return await classRegistryService.getOne({ id });
};

export const GetAllStudents = async (id) => {
  return await studentRegistryService.getAll({ classId: id });
};
