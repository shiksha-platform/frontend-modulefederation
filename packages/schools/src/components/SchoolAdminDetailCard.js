import React, { useEffect, useState } from "react";

// Import for translation
import { useTranslation } from "react-i18next";

// Imports for common library functions and native base components
import { Box, VStack, Divider } from "native-base";
import {
  H2,
  Collapsible,
  studentRegistryService,
  classRegistryService,
} from "@shiksha/common-lib";

// Import for the component for displaying school admin details
import SchoolAdminTile from "./SchoolAdminTile";

function SchoolAdminDetailCard({ schoolId }) {
  const { t } = useTranslation();
  const [totalStudents, setTotalStudents] = useState(null);
  const [grades, setGrades] = useState(null);
  const [genderCount, setGenderCount] = useState({
    male: 0,
    female: 0,
  });
  const [socialCategoryCount, setsocialCategoryCount] = useState();

  useEffect(async () => {
    // Get count of total students in school
    const data = await studentRegistryService.getAllStudents({
      schoolId: { eq: schoolId },
    });
    setTotalStudents(data?.length);

    // Get Total Classes of School
    const gradeData = await classRegistryService.getAllData({
      schoolId: { eq: schoolId },
    });
    const uniqueGradeSet = new Set();
    gradeData.map((grade) => uniqueGradeSet.add(grade?.parent));
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
    // totalStudents.map((abc) => console.log(abc));

    // Get male students count of particular school
    const maleStudent = await studentRegistryService.getAllStudents({
      schoolId: { eq: schoolId },
      gender: { eq: "male" },
    });
    setGenderCount((prevState) => ({
      ...prevState,
      male: maleStudent?.length,
    }));

    // Get female students count of particular school
    const femaleStudent = await studentRegistryService.getAllStudents({
      schoolId: { eq: schoolId },
      gender: { eq: "female" },
    });
    setGenderCount((prevState) => ({
      ...prevState,
      female: femaleStudent?.length,
    }));

    // Get socialCategory students count of particular school
    const groupByCategory = data.reduce((group, student) => {
      const { socialCategory } = student;
      group[socialCategory] = group[socialCategory] ?? [];
      group[socialCategory].push(student);
      return group;
    }, {});
    setsocialCategoryCount(groupByCategory);
  }, [schoolId]);
  return (
    <Collapsible
      defaultCollapse={true}
      header={
        <Box py={4}>
          <H2>{t("ADMINISTRATIVE_DETAILS")}</H2>
        </Box>
      }
    >
      {totalStudents ? (
        <>
          <VStack space={0} bg={"schools.lightGray5"} p={4} rounded={10}>
            {/* Tile for displaying student details */}
            <SchoolAdminTile
              key="1"
              title={`${totalStudents} students`}
              grades={grades}
              genderCount={genderCount}
              socialCategoryCount={socialCategoryCount}
            />

            {/* <Divider /> */}
            {/* <SchoolAdminTile title={"08 Teachers"} /> */}
          </VStack>
        </>
      ) : (
        <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
          {t("NO_CLASSES_AVAILABLE")}
        </Box>
      )}
    </Collapsible>
  );
}
export default SchoolAdminDetailCard;
