import moment from "moment";

export interface IGetStudentsAttendance {
  students?: Array<any>;
  attendance: Array<any>;
  type?: string;
}
// type tells if format matching or the other one
export const GetStudentsAttendance = ({
  students,
  attendance,
  type,
}: IGetStudentsAttendance) => {
  if (type.toLowerCase() === "format")
    return students
      .map((item) => {
        return attendance
          .slice()
          .reverse()
          .find(
            (e) =>
              e.date === moment().format("YYYY-MM-DD") &&
              e.studentId === item.id
          );
      })
      .filter((e) => e);
  else
    return attendance
      .slice()
      .reverse()
      .filter(
        (value, index, self) =>
          self.findIndex(
            (m) => value?.studentId === m?.studentId && value?.date === m?.date
          ) === index
      )
      .filter((e) => e);
};
