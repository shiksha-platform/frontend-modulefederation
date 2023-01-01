import {
  Layout,
  assessmentRegistryService,
  H2,
  Loading,
  useWindowSize,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUMLBaseURL } from "assets/constants";
const STATUS_NIPUN = "NIPUN";

export default function QumlTest({
  appName,
  classId,
  setPageName,
  handleBackButton
}) {
  const [localPageName, setlocalPageName] = useState("questionId");
  const rcId = localStorage.getItem("hp-assessment-written-reading-comprehension") || "";
  const questionIds =
    localStorage.getItem("hp-assessment-written-questionIds") || "";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
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
  };

  const startGradeOneAssessment = async (qumlResult) => {
    const data1 = {
      type: "ORF_LANGUAGE",
      questions: [questionIds],
      source: "diksha",
      answersheet:
        localStorage.getItem("hp-assessment-oral-test-result-0") || "",
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN,
    };

    const data2 = {
      type: "ORF_LANGUAGE",
      questions: [questionIds],
      source: "diksha",
      answersheet:
        localStorage.getItem("hp-assessment-oral-test-result-1") || "",
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN,
    };

    const data3 = {
      type: "WRITTEN_NUMERACY",
      questions: [questionIds],
      source: "diksha",
      answersheet: JSON.stringify(qumlResult),
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN,
    };

    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data1));
    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data2));
    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data3));

    Promise.all(promiseArray).then((res) => {
      getAssessmentData(
        res,
        res[2].data?.insert_trackassessment_one?.trackAssessmentId || "", "WRITTEN_NUMERACY"
      );
      getAssessmentData(
        res,
        res[0].data?.insert_trackassessment_one?.trackAssessmentId || "", "ORF_LANGUAGE", res[1].data?.insert_trackassessment_one?.trackAssessmentId
      );
    });
  };

  const startGradeThreeAssessment = async (qumlResult) => {
    const data1 = {
      type: "ORF_LANGUAGE",
      questions: [questionIds],
      source: "diksha",
      answersheet:
        localStorage.getItem("hp-assessment-oral-test-result-0") || "",
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN
    };

    const data2 = {
      type: "WRITTEN_NUMERACY",
      questions: [questionIds],
      source: "diksha",
      answersheet: localStorage.getItem("hp-assessment-written-questionIds-answer"),
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN
    };

    const data3 = {
      type: "WRITTEN_LANGUAGE",
      questions: [rcId],
      source: "diksha",
      answersheet: JSON.stringify(qumlResult),
      studentId: selectedStudentId,
      teacherId: localStorage.getItem("id") || "",
      groupId: localStorage.getItem("hp-assessment-groupId") || "",
      status: STATUS_NIPUN
    };

    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data1));
    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data2));
    promiseArray.push(assessmentRegistryService.createUpdateAssessment(data3));

    Promise.all(promiseArray).then((res) => {
      getAssessmentData(
        res,
        res[0]?.data?.insert_trackassessment_one?.trackAssessmentId || "",
        "ORF_LANGUAGE"
      );
      getAssessmentData(
        res,
        res[1]?.data?.insert_trackassessment_one?.trackAssessmentId || "",
        "WRITTEN_NUMERACY"
      );
      getAssessmentData(
        res,
        res[2]?.data?.insert_trackassessment_one?.trackAssessmentId || "",
        "WRITTEN_LANGUAGE"
      );
    });
  };

  const getAssessmentData = async (result, id, type, id2) => {
    const assessmentDetails =
      await assessmentRegistryService.getAssessmentDetails(id);
    if (type == "WRITTEN_LANGUAGE") {
      localStorage.setItem("hpAssessment-written-language-score", JSON.stringify({ obtained: assessmentDetails[0].score, totalScore: assessmentDetails[0].totalScore }));
    } else if (type == "ORF_LANGUAGE" && id2) {
      const assessmentDetails2 = await assessmentRegistryService.getAssessmentDetails(id2);
      if (assessmentDetails2) {
        const ans = parseInt(((assessmentDetails[0].score + assessmentDetails2[0].score) / 2).toFixed());
        localStorage.setItem("hpAssessment-orf-language-score", JSON.stringify({ obtained: (assessmentDetails[0].score + assessmentDetails2[0].score) / 2 }));
      }
    } else if (type == "ORF_LANGUAGE") {
      localStorage.setItem("hpAssessment-orf-language-score", JSON.stringify({ obtained: assessmentDetails[0].score.toFixed() }));
    } else if (type == "WRITTEN_NUMERACY") {
      localStorage.setItem("hpAssessment-written-numeracy-score", JSON.stringify({ obtained: assessmentDetails[0].score, totalScore: assessmentDetails[0].totalScore }));
    }

    setLoading(false);
    localStorage.removeItem('hp-assessment-written-questionIds-answer');
    localStorage.removeItem('hp-assessment-third-grade-quml-page-name');

    navigate("/hpAssessment/final-assessment-success");
  };

  React.useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== QUMLBaseURL()) return;
        if (localPageName == "questionId" && localStorage.getItem('hp-assessment-groupName') == 3) {
          if (localStorage.getItem('hp-assessment-third-grade-quml-page-name') === "questionId")
            localStorage.setItem('hp-assessment-written-questionIds-answer', JSON.stringify(event.data))
          localStorage.setItem("hp-assessment-third-grade-quml-page-name", "readingComprehension");
          return setlocalPageName(() => "readingComprehension");
        }
        else
          startAssessment(event.data);
      },
      false
    );

    return () => {
      window.removeEventListener("message", (val) => { });
    };
  }, [localPageName]);

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
    >
      {localPageName == "questionId" ? (
        <>
          {questionIds ? (
            <iframe
              src={`${QUMLBaseURL()}/?questionId=${questionIds}&parentUrl=https://samarth-spot-assessment.samagra.io`}
              style={{ height: "calc(100vh - 164px)" }}
            />
          ) : (
            <Loading height="calc(100vh - 164px)" />
          )}
        </>
      ) : (
        <>
          {rcId ? (
            <iframe
              src={`${QUMLBaseURL()}/?questionId=${rcId}&parentUrl=https://samarth-spot-assessment.samagra.io`}
              style={{ height: "calc(100vh - 164px)" }}
            />
          ) : (
            <Loading height="calc(100vh - 164px)" />
          )}
        </>
      )}
    </Layout>
  );
}
