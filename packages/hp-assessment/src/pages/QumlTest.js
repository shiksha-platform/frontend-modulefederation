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
}) {
  const questionIds =
    localStorage.getItem("hp-assessment-written-questionIds") || "";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [assessmentStartTime, setAssessmentStartTime] = React.useState();
  const [width, height] = useWindowSize();
  const selectedStudentId = localStorage.getItem(
    "hp-assessment-selectedStudentId"
  );

  const startAssessment = async (qumlResult) => {
    setLoading(true);

    const params = {
      classId,
    };
    const data = {
      filter: JSON.stringify(params),
      // type: selectedAssessmentType,
      type: "Written Assessment",
      questions: questionIds.split(","),
      source: "diksha",
      answersheet: JSON.stringify(qumlResult[0]),
      // studentId: selectedStudent.id,
      studentId: selectedStudentId,
      teacherId:
        localStorage.getItem("id") || "1bae8f4e-506b-40ca-aa18-07f7c0e64488",
      status: "COMPLETED",
    };
    const result = await assessmentRegistryService.createUpdateAssessment(data);
    getAssessmentData(result);
  };

  const getAssessmentData = async (result) => {
    const id = result.data?.insert_trackassessment_one?.trackAssessmentId || "";
    const assessmentDetails =
      await assessmentRegistryService.getAssessmentDetails(id);
    localStorage.setItem("assessment-score", assessmentDetails[0].score);
    localStorage.setItem(
      "assessment-totalScore",
      assessmentDetails[0].totalScore
    );
    setLoading(false);
    navigate("/hpAssessment/final-assessment-success");
    // setPageName("assessmentResult");
  };

  /*const _handleWrittenSpotAssessmentStart = () => {
    const telemetryData = telemetryFactory.start({
      appName: appName,
      type: "Spot-Assessment-Written-Start",
      studentId: selectedStudent.id,
    });
    capture("START", telemetryData);
    setAssessmentStartTime(+new Date());
  };*/

  /*const _handleWrittenSpotAssessmentEnd = () => {
    const endTime = +new Date();
    const diff = (endTime - assessmentStartTime) / 1000 || 0;
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Spot-Assessment-End",
      studentId: selectedStudent.id,
      duration: diff,
    });
    capture("END", telemetryData);
  };*/

  React.useEffect(() => {
    // _handleWrittenSpotAssessmentStart();
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
      // _handleWrittenSpotAssessmentEnd();
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
        <H2 textTransform="none" color="hpAssessment.white">
          {t("Attempt the questions")}
        </H2>
      }
      _subHeader={{ bg: "hpAssessment.cardBg1" }}
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
          src={`${QUMLBaseURL()}/?questions=${questionIds}`}
          frameBorder="0"
          style={{ height: "calc(100vh - 315px)" }}
        />
      )}
    </Layout>
  );
}
