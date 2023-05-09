export const sortByName = (students) => {
  return students.sort(function (oldItem, newItem) {
    return oldItem.firstName === newItem.firstName
      ? 0
      : oldItem.firstName < newItem.firstName
      ? -1
      : 1;
  });
};

export const sortByAdmissionNo = (students) => {
  return students.sort(function (a, b) {
    return a.admissionNo - b.admissionNo;
  });
};
