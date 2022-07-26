import * as React from "react";

export const useStudentIds = ({ students }) => {
  const [studentIds, setStudentIds] = React.useState([]);
  React.useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (!ignore) {
        const temp = students.map((e) => e.id);
        setStudentIds(temp);
      }
    };
    getData();
    return () => {
      ignore = true;
    };
  }, [students]);

  return { studentIds };
};
