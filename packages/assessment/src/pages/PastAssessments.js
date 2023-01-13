import {
  BodyLarge,
  H2,
  Layout,
  ProgressBar,
  overrideColorTheme,
  Caption,
  assessmentRegistryService,
  Loading,
  useWindowSize,
  studentRegistryService,
  classRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, HStack, VStack, Button } from "native-base";
import colorTheme from "../colorTheme";
import moment from "moment";
import report from "utils/report";
import ReportCard from "components/ReportCard";
const colors = overrideColorTheme(colorTheme);

const ORAL_ASSESSMENT = "Oral Assessment";
const WRITTEN_ASSESSMENT = "Written Assessment";

export default function PastAssessments({ footerLinks, setAlert }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allGroupedAssessments, setAllGroupedAssessments] = useState({});
  const [studentlist, setStudentlist] = useState([]);
  const [classObject, setClassObject] = useState({});

  let { classId, subject } = useParams();
  classId = classId ? classId : "ce045222-52a8-4a0a-8266-9220f63baba7";
  subject = subject ? subject : "English";

  const getStudentsList = async () => {
    const list = await studentRegistryService
      .getAll({ classId })
      .catch((e) => setAlert(e.message));
    setStudentlist(list ? list : []);
    setLoading(false);
  };

  const getClass = async () => {
    const classDetails = await classRegistryService
      .getOne({ id: classId })
      .catch((e) => setAlert(e.message));
    setClassObject(classDetails);
  };

  const getAllAssessment = async () => {
    const data = await assessmentRegistryService
      .getAllAssessment({
        groupId: classId,
        subject: subject,
      })
      .catch((e) => setAlert(e.message));
    const groupedAssessments = groupBy(data, "date");
    setAllGroupedAssessments(groupedAssessments);
    setLoading(false);
  };

  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const getCards = () => {
    let content = [];
    for (let key in allGroupedAssessments) {
      const progressAssessmentWritten = report(
        studentlist,
        allGroupedAssessments[key],
        WRITTEN_ASSESSMENT
      );
      const progressAssessmentOral = report(
        studentlist,
        allGroupedAssessments[key],
        ORAL_ASSESSMENT
      );
      content.push(
        <Box key={key}>
          {/*<BodyLarge mb={2}>{allGroupedAssessments[key][0].date}</BodyLarge>*/}
          <BodyLarge mb={2}>{moment(key).format("DD MMM Y")}</BodyLarge>
          <VStack space={4}>
            <ReportCard
              {...{
                writtenData: progressAssessmentWritten,
                oralData: progressAssessmentOral,
              }}
            />
            <Button
              onPress={(e) =>
                navigate(
                  `/assessment/assessment-detailed-report/${classId}/${subject}/${key}`
                )
              }
              _text={{ color: "white" }}
              py={3}
            >
              {t("VIEW_REPORT")}
            </Button>
          </VStack>
        </Box>
      );
    }
    return content.length ? content : <H2>Data Not Found</H2>;
  };

  useEffect(() => {
    getStudentsList();
    getClass();
    getAllAssessment();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout
      _header={{
        title: "Past Assessments",
      }}
      _appBar={{
        languages: ["en"],
        // onPressBackButton: handleBackButton,
      }}
      subHeader={
        <VStack>
          <H2>{subject}</H2>
          <HStack alignItems={"center"}>
            <Caption color={colors.gray}>
              {classObject && classObject.name}
            </Caption>
            {classObject && classObject.section && (
              <Caption color={colors.gray}> {classObject.section}</Caption>
            )}
          </HStack>
        </VStack>
      }
      _subHeader={{ bg: colors.cardBg, py: "6" }}
      _footer={footerLinks}
    >
      <Box p={4}>
        <VStack space={12}>{getCards()}</VStack>
      </Box>
    </Layout>
  );
}
