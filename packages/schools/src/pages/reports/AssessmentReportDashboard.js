import {
  assessmentRegistryService,
  classRegistryService,
  H2,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "manifest.json";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, HStack, VStack } from "native-base";

import ClassCollapsibleCard from "../../components/Reports/AssessmentReports/ClassCollapsibleCard";
import ExaminationTypeFilterButton from "../../components/Reports/AssessmentReports/ExaminationTypeFilterButton";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function AssessmentReportDashboard({ footerLinks }) {
  const { t } = useTranslation();
  const { classId } = useParams();
  const [classObject, setClassObject] = React.useState({});
  const [classes, setClasses] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);

  React.useEffect(async () => {
    const parentGrade = await classRegistryService.getOne({
      id: classId,
    });

    const data = await assessmentRegistryService.getSubjectsList({
      gradeLevel: parentGrade?.gradeLevel,
    });

    const classResponse = await classRegistryService.getAllData({
      parentId: { eq: classId },
    });
    setClassObject(parentGrade);
    setSubjects(data);
    setClasses(classResponse);
  }, []);

  return (
    <Layout
      _header={{
        title: `${classObject?.name} Assessment Reports`,
      }}
      subHeader={<H2>View Assessment report</H2>}
      _subHeader={{ bg: "schools.cardBg" }}
      _appBar={{
        languages: manifest.languages,
      }}
      _footer={footerLinks}
    >
      <Box p={6}>
        <VStack space={6}>
          <Box>
            <HStack justifyContent="end">
              <ExaminationTypeFilterButton />
            </HStack>
          </Box>
          <VStack space={6}>
            {classes &&
              classes.map((item, index) => {
                return (
                  <ClassCollapsibleCard
                    defaultCollapse={!index}
                    item={item}
                    key={index}
                    subjects={subjects}
                  />
                );
              })}
          </VStack>
        </VStack>
      </Box>
    </Layout>
  );
}
