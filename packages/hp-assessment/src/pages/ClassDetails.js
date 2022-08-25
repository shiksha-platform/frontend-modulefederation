import {
  H2,
  IconByName,
  Layout,
  ProgressBar,
  overrideColorTheme,
  telemetryFactory,
  capture,
  classRegistryService,
  hpAssessmentRegistryService,
  assessmentRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Button } from "native-base";
import SchoolAcademicDetailCard from "../components/SchoolAcademicDetailCard";
import nipun_badge from "../stories/assets/nipun_badge.svg";
import colorTheme from "../colorTheme";
import ClassAssessmentResultCollapsibleCard from "../components/ClassAssessmentResultCollapsibleCard";
import ClassParticipationCollapsibleCard from "../components/ClassParticipationCollapsibleCard";
const colors = overrideColorTheme(colorTheme);

export default function ClassDetails({ appName }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const classId =
    localStorage.getItem("hp-assessment-groupId") ||
    "2bd698db-49a4-4811-943d-9954f8c1f377";
  const [assessmentStartTime, setAssessmentStartTime] = useState();
  const [classObject, setClassObject] = useState({});
  const [assessmentsData, setAssessmentsData] = React.useState([]);
  const [totalStudentCount, setTotalStudentCount] = React.useState(0);
  const [presentStudentCount, setPresentStudentCount] = React.useState(0);
  const [absentStudentCount, setAbsentStudentCount] = React.useState(0);

  const _handleAssessmentStartEvent = () => {
    const telemetryData = telemetryFactory.start({
      appName,
      type: "HP-Spot-Assessment-Start",
    });
    capture("START", telemetryData);
    setAssessmentStartTime(+new Date());
  };

  const _handleAssessmentStart = () => {
    navigate("/hpAssessment/student-list");
    // _handleAssessmentStartEvent();
  };
  const getClassDetails = async () => {
    let classObj = await classRegistryService.getOne({ id: classId });
    setClassObject(classObj);
  };

  const getAssessmentDetails = async () => {
    const params = {
      fromDate: '01-01-2022',
      toDate: '08-20-2022',
      groupId: 'df',
      subject: 'er'
      // groupId: localStorage.getItem("hp-assessment-groupId") || "300bd6a6-ee1f-424a-a763-9db8b08a19e9",
    };
    const data = await assessmentRegistryService.getFilteredAssessments(params);
    calculateParticipantData(data);
    setAssessmentsData(data);
  };

  const calculateParticipantData = (assessmentsData) => {
    const presentStudent = assessmentsData.filter((item) => {
      return item.studentAssessmentStatus === 'COMPLETED'
    }).length / 2;

    const absentStudent = assessmentsData.filter((item) => {
      return item.studentAssessmentStatus === 'ABSENT'
    }).length / 2;
    setAbsentStudentCount(absentStudent);
    setPresentStudentCount(presentStudent);
  }

  useEffect(() => {
    getClassDetails();
    getAssessmentDetails();
  }, []);

  return (
    <Layout
      _header={{
        title: "Class Details",
        subHeading: ` Grade ${classObject?.name || "-"}`,
      }}
      _appBar={{
        languages: ["en"],
      }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            route: "/",
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            route: "/classes",
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            route: "/",
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            route: "/",
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            route: "/",
          },
        ],
      }}
    >
      <>
        <Box p={4} bg={colors.white}>
          <Button
            colorScheme={"button"}
            _text={{ color: colors.white }}
            isDisabled={false}
            onPress={_handleAssessmentStart}
          >
            {t("Conduct Student Assessment")}
          </Button>
        </Box>
        <Box p={4}>
          <VStack space={4}>
            <ClassParticipationCollapsibleCard assessmentsData={assessmentsData} totalStudentCount={totalStudentCount} presentStudentCount={presentStudentCount} absentStudentCount={absentStudentCount} />
            <ClassAssessmentResultCollapsibleCard assessmentsData={assessmentsData} totalStudentCount={totalStudentCount} presentStudentCount={presentStudentCount} absentStudentCount={absentStudentCount} />
          </VStack>
        </Box>
      </>
    </Layout>
  );
}
