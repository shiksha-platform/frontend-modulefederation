// Some simple sorting codes

export interface IStudentSorting {
  (students: Array<any>): Array<any>
}
// Sort by name
export const sortByName: IStudentSorting = (students) => {
  return students.sort(function (oldItem, newItem) {
    return oldItem.firstName === newItem.firstName
      ? 0
      : oldItem.firstName < newItem.firstName
      ? -1
      : 1
  })
}

// Sort via admission number
export const sortByAdmissionNo: IStudentSorting = (students) => {
  return students.sort(function (a, b) {
    return a.admissionNo - b.admissionNo
  })
}
