import React from "react";
import {
  assessmentRegistryService,
  BodyLarge,
  Caption,
  classRegistryService,
  H2,
  Layout,
  studentRegistryService,
} from "@shiksha/common-lib";
import StudentQuestionsReport from "components/SpotAssessment/StudentQuestionsReport";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HStack, VStack } from "native-base";
import moment from "moment";
import report from "utils/report";

const ORAL_ASSESSMENT = "Oral Assessment";
const WRITTEN_ASSESSMENT = "Written Assessment";

export default function StudentReport({ footerLinks }) {
  const { t } = useTranslation();

  const [students, setStudents] = React.useState([]);
  const [track, setTrack] = React.useState([]);
  let { classId, subject, date } = useParams();
  classId = classId ? classId : "ce045222-52a8-4a0a-8266-9220f63baba7";
  subject = subject ? subject : "english";
  date = date
    ? moment(date).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  const [classObject, setClassObject] = React.useState({});

  React.useEffect(async () => {
    let classObj = await classRegistryService.getOne({ id: classId });
    setClassObject(classObj);

    const param = {
      fromDate: date,
      toDate: date,
      groupId: classId,
      subject,
    };

    const data = await assessmentRegistryService
      .getAllAssessment(param)
      .catch((e) => setAlert(e.message));
    setTrack(data);
    const studentData = await studentRegistryService.getAll({
      classId,
    });
    const reportData = report(studentData, data, WRITTEN_ASSESSMENT, "data");
    console.log(reportData);
    setStudents(reportData?.presentStudents);
  }, [classId, subject, date]);

  return (
    <Layout
      _header={{
        title: "Student Report Details",
        isEnableSearchBtn: true,
        subHeading: <BodyLarge py="2">{t("Spot Assessment")}</BodyLarge>,
      }}
      _appBar={{
        languages: ["en"],
      }}
      subHeader={
        <VStack>
          <H2>{subject}</H2>
          <HStack alignItems={"center"}>
            <Caption>{classObject?.name}</Caption>
            <Caption color={"assessment.lightGray0"}> ●</Caption>
            <Caption> {`Sec ${classObject?.section}`}</Caption>
          </HStack>
        </VStack>
      }
      _subHeader={{ bg: "assessment.reportDetailsSubheaderBg" }}
      _footer={footerLinks}
    >
      <StudentQuestionsReport {...{ students, track }} />
    </Layout>
  );
}
