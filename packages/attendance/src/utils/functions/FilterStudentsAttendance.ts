export interface IFilterStudentsAttendance {
  attendance: Array<any>;
}

// Returns attendance following a certain criteria
// type specifies on what criteria
export const filterStudentsAttendance = ({
  attendance,
}: IFilterStudentsAttendance) => {
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
