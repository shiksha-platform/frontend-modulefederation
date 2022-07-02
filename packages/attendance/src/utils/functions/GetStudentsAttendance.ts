import moment from "moment";

export const GetStudentsAttendance = ({ students, attendance }) => {
  return students
    .map((item) => {
      return attendance
        .slice()
        .reverse()
        .find(
          (e) =>
            e.date === moment().format("YYYY-MM-DD") && e.studentId === item.id
        );
    })
    .filter((e) => e);
};
