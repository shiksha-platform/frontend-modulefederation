import React, { useEffect, useState } from "react";
import { Box, VStack, Divider } from "native-base";
import {
  H2,
  Collapsible,
  studentRegistryService,
  classRegistryService,
} from "@shiksha/common-lib";
import SchoolAdminTile from "./SchoolAdminTile";

function SchoolAdminDetailCard({ schoolId }) {
  const [totalStudents, setTotalStudents] = useState(null);
  const [grades, setGrades] = useState(null);

  useEffect(async () => {
    // Get Total Students of School
    const data = await studentRegistryService.getAllStudents({
      schoolId: { eq: schoolId },
    });
    setTotalStudents(data?.length);

    // Get Total Classes of School
    const gradeData = await classRegistryService.getAllData({
      schoolId: { eq: schoolId },
    });
    const uniqueGradeSet = new Set();
    gradeData.map((grade) => uniqueGradeSet.add(grade.gradeLevel));
    const arrayUniqueGradeSet = Array.from(uniqueGradeSet);
    setGrades(arrayUniqueGradeSet);

    // arrayUniqueGradeSet.map((grade) => console.log(grade));

    // Get Students count Grade wise
    let totalStudentsInGrade = new Array(arrayUniqueGradeSet.size);
    arrayUniqueGradeSet.map(async (grade, i) => {
      const studentGradeData = await studentRegistryService.getAllStudents({
        schoolId: { eq: schoolId },
        groupId: { eq: grade },
      });
      totalStudentsInGrade[i] = studentGradeData.length;
    });
    console.log("TOTALSTUDENT");
    totalStudents.map((abc) => console.log(abc));
  }, [schoolId]);
  return (
    <Collapsible
      defaultCollapse={true}
      header={
        <Box py={4}>
          <H2>Administrative Details</H2>
        </Box>
      }
    >
      {totalStudents ? (
        <>
          <VStack space={0} bg={"schools.lightGray5"} p={4} rounded={10}>
            <SchoolAdminTile
              title={`${totalStudents} students`}
              grades={grades}
            />
            <Divider />
            <SchoolAdminTile title={"08 Teachers"} />
          </VStack>
        </>
      ) : (
        <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
          No classes available in this school
        </Box>
      )}
    </Collapsible>
  );
}
export default SchoolAdminDetailCard;
