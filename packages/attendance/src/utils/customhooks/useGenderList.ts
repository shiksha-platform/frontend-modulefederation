// Lib
import * as React from "react";

// Utilities
import { filterGenderList } from "utils/functions/FilterGenderList";

export interface IUseGenderList {
  students: Array<any>;
  t: any;
}
// Maintains the genderList state
// Currently used in attendance
export const useGenderList = ({ students, t }: IUseGenderList) => {
  const [genderList, setGenderList] = React.useState<Array<any>>([]);
  React.useEffect(() => {
    const genderList = filterGenderList(students, t);
    setGenderList([...genderList, t("TOTAL")]);
  }, [students]);

  return { genderList };
};
