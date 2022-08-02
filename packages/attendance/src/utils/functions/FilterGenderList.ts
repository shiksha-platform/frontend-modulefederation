import { MALE, FEMALE } from "./Constants";

export interface IFilterGenderList {
  (students: any, t: any): number[];
}

// Returns number of students
// which belong to the specified gender
export const filterGenderList: IFilterGenderList = (students, t) => {
  let genderList = [];
  genderList = [t("BOYS"), t("GIRLS")].filter((gender) => {
    return (
      (gender === t("BOYS") &&
        students.filter((e: any) => e.gender === MALE).length) ||
      (gender === t("GIRLS") &&
        students.filter((e: any) => e.gender === FEMALE).length)
    );
  });
  return genderList;
};
