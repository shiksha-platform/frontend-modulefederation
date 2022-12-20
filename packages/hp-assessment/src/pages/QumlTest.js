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
const STATUS_NIPUN = "NIPUN";
const STATUS_NIPUN_READY = "NIPUN_READY";
const STATUS_ABSENT = "ABSENT";

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
  let promiseArray = [];

  const startAssessment = async (qumlResult) => {
    setLoading(true);
    const className = localStorage.getItem("hp-assessment-groupName") || "";

    if (className === "1" || className === "2") {
      startGradeOneAssessment(qumlResult);
    } else {
      startGradeThreeAssessment(qumlResult);
    }

    /*const params = {
      classId,
    };
    const data = {
      filter: JSON.stringify(params),
      type: "Written Assessment",
      questions: questionIds.split(","),
      source: "diksha",
      answersheet: JSON.stringify(qumlResult[0]),
      studentId: selectedStudentId,
      teacherId:
        localStorage.getItem("id") || "1bae8f4e-506b-40ca-aa18-07f7c0e64488",
      groupId: localStorage.getItem('hp-assessment-groupId') || '',
      status: STATUS_NIPUN
    };
    const result = await assessmentRegistryService.createUpdateAssessment(data);
    getAssessmentData(result);*/
  };

  const startGradeOneAssessment = async (qumlResult) => {
    const params = {};
    const data1 = {
      filter: JSON.stringify(params),
      type: "ORF_LANGUAGE",
      questions: questionIds.split(","),
      source: "diksha",
      answersheet:
        localStorage.getItem("hp-assessment-oral-test-result-0") ||
        JSON.stringify([{ children: [{ score: 5 }] }]),
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN,
    };

    const data2 = {
      filter: JSON.stringify(params),
      type: "ORF_LANGUAGE",
      questions: questionIds.split(","),
      source: "diksha",
      answersheet:
        localStorage.getItem("hp-assessment-oral-test-result-1") ||
        JSON.stringify([{ children: [{ score: 5 }] }]),
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN,
    };

    const data3 = {
      filter: JSON.stringify(params),
      type: "WRITTEN_LANGUAGE",
      questions: questionIds.split(","),
      source: "diksha",
      answersheet: JSON.stringify(qumlResult),
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN,
    };

    // const result1 = await assessmentRegistryService.createUpdateAssessment(data1);
    // const result2 = await assessmentRegistryService.createUpdateAssessment(data2);
    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data1));
    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data2));
    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data3));

    Promise.all(promiseArray).then((res) => {
      getAssessmentData(
        res,
        res[2].data?.insert_trackassessment_one?.trackAssessmentId || ""
      );
      /*getAssessmentData(
        res,
        res[1].data?.insert_trackassessment_one?.trackAssessmentId || "",
        1,
        1
      );
      getAssessmentData(
        res,
        res[2].data?.insert_trackassessment_one?.trackAssessmentId || "",
        1,
        2
      );*/
      // setLoading(false);
    });
  };

  const startGradeThreeAssessment = async (qumlResult) => {
    const params = {};
    const data1 = {
      filter: JSON.stringify(params),
      type: "ORF_LANGUAGE",
      questions: questionIds.split(","),
      source: "diksha",
      answersheet:
        localStorage.getItem("hp-assessment-oral-test-result-0") ||
        JSON.stringify([{ correctWords: "24", timeTaken: "120" }]),
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN,
    };

    const data2 = {
      filter: JSON.stringify(params),
      type: "WRITTEN_NUMERACY",
      questions: questionIds.split(","),
      source: "diksha",
      answersheet: JSON.stringify(qumlResult),
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN,
    };

    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data1));
    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data2));

    Promise.all(promiseArray).then((res) => {
      getAssessmentData(
        res,
        res[1].data?.insert_trackassessment_one?.trackAssessmentId || "",
      );
      /*getAssessmentData(
        res,
        res[1].data?.insert_trackassessment_one?.trackAssessmentId || "",
        3,
        1
      );*/
      // setLoading(false);
    });
  };

  const getAssessmentData = async (result, id) => {
    const assessmentDetails =
      await assessmentRegistryService.getAssessmentDetails(id);
    localStorage.setItem("assessment-score", assessmentDetails[0].score);
    localStorage.setItem(
      "assessment-totalScore",
      assessmentDetails[0].totalScore
    );
    /*if(grade === 3){
      const assessmentDetails =
        await assessmentRegistryService.getAssessmentDetails(id);
      if(index === 0) {
        localStorage.setItem("assessment-score-orf", assessmentDetails[0].score);
        localStorage.setItem(
          "assessment-totalScore-orf",
          assessmentDetails[0].totalScore
        );
      }
      if(index === 1) {
        localStorage.setItem("assessment-score-written", assessmentDetails[0].score);
        localStorage.setItem(
          "assessment-totalScore-written",
          assessmentDetails[0].totalScore
        );
      }
    }
    else if(grade === 1) {
      const assessmentDetails =
        await assessmentRegistryService.getAssessmentDetails(id);
      if(index === 0) {
        localStorage.setItem("assessment-score-orf", assessmentDetails[0].score);
        localStorage.setItem(
          "assessment-totalScore-orf",
          assessmentDetails[0].totalScore
        );
      }
      if(index === 1) {
        let a = localStorage.getItem("assessment-score-orf");
        let b = localStorage.getItem("assessment-totalScore-orf");
        localStorage.setItem("assessment-score-orf", Number(a) + Number(assessmentDetails[0].score));
        localStorage.setItem(
          "assessment-totalScore-orf",
          Number(b) + Number(assessmentDetails[0].totalScore)
        );
      }
      if(index === 2) {
        localStorage.setItem("assessment-score-written", assessmentDetails[0].score);
        localStorage.setItem(
          "assessment-totalScore-written",
          assessmentDetails[0].totalScore
        );
      }

      localStorage.setItem("assessment-score", assessmentDetails[0].score);
      localStorage.setItem(
        "assessment-totalScore",
        assessmentDetails[0].totalScore
      );
    }*/
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
          // src={`${QUMLBaseURL()}/?questions=${questionIds}`}
          src={`${QUMLBaseURL()}/?questions=${questionIds}&parentUrl=https://samarth-spot-assessment.samagra.io`}
          frameBorder="0"
          style={{ height: "calc(100vh - 164px)" }}
        />
      )}
    </Layout>
  );
}
