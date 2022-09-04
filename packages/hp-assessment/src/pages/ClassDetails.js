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
  const [totalStudentCount, setTotalStudentCount] = React.useState(20);
  const [presentStudentCount, setPresentStudentCount] = React.useState(0);
  const [absentStudentCount, setAbsentStudentCount] = React.useState(0);
  const [nipunStudentCount, setNipunStudentCount] = React.useState(0);
  const [nipunReadyStudentCount, setNipunReadyStudentCount] = React.useState(0);

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
      fromDate: "01-01-2022",
      toDate: "08-25-2022",
      groupId: "ce045222-52a8-4a0a-8266-9220f63baba7",
      subject: "English",
      // groupId: localStorage.getItem("hp-assessment-groupId") || "300bd6a6-ee1f-424a-a763-9db8b08a19e9",
    };
    const data = await assessmentRegistryService.getFilteredAssessments(params);
    calculateParticipantData(data);
    calculateAssessmentResults(data);
    setAssessmentsData(data);
  };

  const calculateParticipantData = (assessmentsData) => {
    const presentStudent = Math.floor(
      assessmentsData.filter((item) => {
        return item.status === "COMPLETED";
      }).length / 2
    );

    const absentStudent = Math.floor(
      assessmentsData.filter((item) => {
        return item.status === "ABSENT";
      }).length / 2
    );

    setAbsentStudentCount(absentStudent);
    setPresentStudentCount(presentStudent);
  };

  const calculateAssessmentResults = (assessmentsData) => {
    const nipunStudent = Math.floor(
      assessmentsData.filter((item) => {
        return item.status === "nipun";
      }).length / 2
    );

    const nipunReadyStudent = Math.floor(
      assessmentsData.filter((item) => {
        return item.status === "COMPLETED";
      }).length / 2
    );

    setNipunStudentCount(nipunStudent);
    setNipunReadyStudentCount(nipunReadyStudent);
  };

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
            colorScheme={"hpButton"}
            _text={{ color: colors.white }}
            isDisabled={false}
            onPress={_handleAssessmentStart}
          >
            {t("Conduct Student Assessment")}
          </Button>
        </Box>
        <Box p={4}>
          <VStack space={4}>
            <ClassParticipationCollapsibleCard
              assessmentsData={assessmentsData}
              totalStudentCount={totalStudentCount}
              presentStudentCount={presentStudentCount}
              absentStudentCount={absentStudentCount}
            />
            <ClassAssessmentResultCollapsibleCard
              assessmentsData={assessmentsData}
              totalStudentCount={totalStudentCount}
              nipunStudentCount={nipunStudentCount}
              nipunReadyStudentCount={nipunReadyStudentCount}
            />
          </VStack>
        </Box>
      </>
    </Layout>
  );
}
