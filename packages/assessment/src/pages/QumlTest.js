import {
  Collapsible,
  IconByName,
  Layout,
  assessmentRegistryService,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Stack, Avatar } from "native-base";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function QumlTest() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [headerDetails, setHeaderDetails] = useState();
  const [questionIds, setQuestionIds] = useState(
    JSON.parse(localStorage.getItem("assessment-questionIds")) || []
  );

  const startAssessment = async (qumlResult) => {
    const subject = localStorage.getItem("assessment-subject");
    const competencies = JSON.parse(
      localStorage.getItem("assessment-competencies")
    );
    const classId = localStorage.getItem("assessment-class");
    const assessmentType = localStorage.getItem("assessment-type");
    const studentId =
      JSON.parse(localStorage.getItem("assessment-student")).id || null;
    // const questionIds = JSON.parse(localStorage.getItem('assessment-questionIds'));
    // const qumlResult = JSON.parse(localStorage.getItem('assessment-quml-result'));

    const params = {
      subject,
      competencies: competencies,
      classId,
    };
    const data = {
      filter: JSON.stringify(params),
      type: assessmentType,
      questions: questionIds,
      source: "diksha",
      answersheet: JSON.stringify(qumlResult[0]),
      studentId: studentId,
      teacherId:
        localStorage.getItem("id") || "1bae8f4e-506b-40ca-aa18-07f7c0e64488",
    };
    const result = await assessmentRegistryService.createUpdateAssessment(data);
    getAssessmentData(result);
  };

  const getAssessmentData = async (result) => {
    const id = result.result?.Trackassessment?.osid || "";
    const assessmentDetails =
      await assessmentRegistryService.getAssessmentDetails(id);
    console.log("assessmentDetails", assessmentDetails);
    localStorage.setItem("assessment-score", assessmentDetails.score);
    navigate("/assessment-result");
  };

  React.useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== "http://139.59.25.99:8090")
          // if (event.origin !== "http://192.168.0.123:4200")
          return;
        localStorage.setItem(
          "assessment-quml-result",
          JSON.stringify(event.data)
        );
        startAssessment(event.data);
      },
      false
    );

    return () => {
      window.removeEventListener("message", (val) => {});
    };
  }, []);

  return (
    <Layout
      _header={{
        title: "Test",
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={
        <VStack>
          <Text fontSize={"lg"}>
            {headerDetails && headerDetails.student
              ? headerDetails.student.name
              : "Attempt the questions"}
          </Text>
          {headerDetails &&
            headerDetails.student &&
            headerDetails.student.fathersName && (
              <Text fontSize={"xs"} color={"muted.600"}>
                Mr. {headerDetails.student.fathersName}
              </Text>
            )}
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
          src={`http://139.59.25.99:8090/?questions=${questionIds.join(",")}`}
          // src={`http://192.168.0.123:4200/?questions=${questionIds.join(',')}`}
          frameBorder="0"
          style={{ height: "calc(100vh - 315px)" }}
        />
      )}
      {/*<iframe
        src="http://139.59.25.99:8090/?questions=do_431353902437642240011003,do_431353902009694617611001,do_431353902575100723211006"
        frameBorder="0"
        style={{ height: "calc(100vh - 315px)" }}
      />*/}
    </Layout>
  );
}
