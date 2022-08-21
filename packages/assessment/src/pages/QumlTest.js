import {
  Collapsible,
  IconByName,
  Layout,
  assessmentRegistryService,
  overrideColorTheme,
  H2,
  Loading,
  useWindowSize,
  telemetryFactory,
  capture,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Stack, Avatar } from "native-base";
import colorTheme from "../colorTheme";
import { QUMLBaseURL } from "assets/constants";
const colors = overrideColorTheme(colorTheme);

export default function QumlTest({
  appName,
  classId,
  setPageName,
  handleBackButton,
  selectedStudent,
  selectedAssessmentType,
  selectedCompetencies,
  selectedSubject,
  questionIds,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [assessmentStartTime, setAssessmentStartTime] = React.useState();
  /*const [questionIds, setQuestionIds] = useState(
    JSON.parse(localStorage.getItem("assessment-questionIds")) || []
  );*/
  const [width, height] = useWindowSize();

  const startAssessment = async (qumlResult) => {
    setLoading(true);
    // const subject = localStorage.getItem("assessment-subject");
    // const competencies = JSON.parse(localStorage.getItem("assessment-competencies"));
    // const classId = localStorage.getItem("assessment-class");
    // const assessmentType = localStorage.getItem("assessment-type");
    // const studentId = JSON.parse(localStorage.getItem("assessment-student")).id || null;
    // const questionIds = JSON.parse(localStorage.getItem('assessment-questionIds'));
    // const qumlResult = JSON.parse(localStorage.getItem('assessment-quml-result'));

    const params = {
      subject: selectedSubject,
      competencies: selectedCompetencies,
      classId,
    };
    const data = {
      filter: JSON.stringify(params),
      type: selectedAssessmentType,
      questions: questionIds,
      source: "diksha",
      answersheet: JSON.stringify(qumlResult[0]),
      studentId: selectedStudent.id,
      teacherId:
        localStorage.getItem("id") || "1bae8f4e-506b-40ca-aa18-07f7c0e64488",
    };
    const result = await assessmentRegistryService.createUpdateAssessment(data);
    getAssessmentData(result);
  };

  const getAssessmentData = async (result) => {
    // const id = result.result?.Trackassessment?.osid || "";
    const id = result.data?.insert_trackassessment_one?.trackAssessmentId || "";
    const assessmentDetails =
      await assessmentRegistryService.getAssessmentDetails(id);
    localStorage.setItem("assessment-score", assessmentDetails[0].score);
    localStorage.setItem(
      "assessment-totalScore",
      assessmentDetails[0].totalScore
    );
    setLoading(false);
    // navigate("/assessment/assessment-result");
    setPageName("assessmentResult");
  };

  const _handleWrittenSpotAssessmentStart = () => {
    const telemetryData = telemetryFactory.start({
      appName: appName,
      type: "Spot-Assessment-Written-Start",
      studentId: selectedStudent.id,
    });
    capture("START", telemetryData);
    setAssessmentStartTime(+new Date());
  };

  const _handleWrittenSpotAssessmentEnd = () => {
    const endTime = +new Date();
    const diff = (endTime - assessmentStartTime) / 1000 || 0;
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Spot-Assessment-End",
      studentId: selectedStudent.id,
      duration: diff,
    });
    capture("END", telemetryData);
  };

  React.useEffect(() => {
    _handleWrittenSpotAssessmentStart();
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== "https://quml.shikshaplatform.io") return;
        startAssessment(event.data);
      },
      false
    );

    return () => {
      window.removeEventListener("message", (val) => {});
      _handleWrittenSpotAssessmentEnd();
    };
  }, []);

  if (loading) {
    return <Loading height={height} />;
  }

  return (
    <Layout
      _header={{
        title: "Assessment",
      }}
      _appBar={{
        languages: ["en"],
        onPressBackButton: handleBackButton,
      }}
      subHeader={
        <VStack>
          <Text fontSize={"lg"} textTransform="none">
            {t("Attempt the questions")}
          </Text>
        </VStack>
      }
      _subHeader={{ bg: colors.cardBg }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            module: "Registry",
            route: "/classes",
            routeparameters: {},
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      {questionIds && (
        <iframe
          src={`${QUMLBaseURL()}/?questions=${questionIds.join(",")}`}
          frameBorder="0"
          style={{ height: "calc(100vh - 315px)" }}
        />
      )}
    </Layout>
  );
}
