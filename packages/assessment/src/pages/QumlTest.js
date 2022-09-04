import {
  Layout,
  assessmentRegistryService,
  Loading,
  telemetryFactory,
  capture,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Text, VStack } from "native-base";
import { QUMLBaseURL } from "assets/constants";

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
  footerLinks,
  setAlert,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [assessmentStartTime, setAssessmentStartTime] = React.useState();

  const startAssessment = async (qumlResult) => {
    setLoading(true);
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
      status: "COMPLETED",
      groupId: classId,
    };
    const result = await assessmentRegistryService
      .createUpdateAssessment(data)
      .catch((e) => {
        setLoading(false);
        setAlert({ type: "warning", title: e.message });
        setPageName("assessmentResult");
      });
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

    setAlert({ type: "success", title: "you have successfully submitted" });
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
        if (event.origin !== QUMLBaseURL) return;
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
    return <Loading />;
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
      _subHeader={{ bg: "assessment.cardBg" }}
      _footer={footerLinks}
    >
      {questionIds && (
        <iframe
          src={`${QUMLBaseURL}/?questions=${questionIds.join(",")}`}
          frameBorder="0"
          style={{ height: "calc(100vh - 315px)" }}
        />
      )}
    </Layout>
  );
}
