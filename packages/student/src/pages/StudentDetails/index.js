import React, { Suspense, useEffect, useState } from "react";
import { Text, Stack, Box, HStack, Button } from "native-base";
import { useTranslation } from "react-i18next";
import {
  IconByName,
  Layout,
  Collapsible,
  capture,
  telemetryFactory,
  H3,
  studentRegistryService,
  attendanceRegistryService,
  classRegistryService,
  overrideColorTheme,
} from "@shiksha/common-lib";
import colorTheme from "../../colorTheme";

const colors = overrideColorTheme(colorTheme);
import { useNavigate, useParams } from "react-router-dom";
import StudentEdit from "../../components/students/StudentEdit";
import Card from "../../components/students/Card";
import manifest from "../../manifest.json";
import InfoSection from "./Molecules/InfoSection";
import Section from "./Molecules/Section";
import ButtonWrapper from "atoms/ButtonWrapper";

const AttendanceComponent = React.lazy(() =>
  import("attendance/AttendanceComponent")
);
// Start editing here, save and see your changes.
export default function StudentDetails({ footerLinks, appName }) {
  const { t } = useTranslation("student");
  const [studentObject, setStudentObject] = useState({});
  const [classObject, setClassObject] = useState({});
  const { studentId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [attendanceView, setAttendanceView] = useState("month");
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      if (!ignore) {
        let student = await studentRegistryService.getOne({ id: studentId });
        let newStudent = student;

        if (student.currentClassID) {
          let classObj = await classRegistryService.getOne({
            id: student.currentClassID,
          });
          newStudent = { ...student, name: classObj.name };
          setClassObject(classObj);
        }
        setStudentObject(newStudent);
        await getAttendance({ studentId: student.id });
      }
    };
    getData();
  }, [studentId]);

  useEffect(() => {
    capture("PAGE");
  }, []);

  const getAttendance = async (e) => {
    const attendanceData = await attendanceRegistryService.getAll({
      studentId,
      classId: e.classId ? e.classId : studentObject.currentClassID,
      teacherId,
    });
    setAttendance(attendanceData);
  };

  return (
    <Layout
      _header={{
        title: t("STUDENTS_DETAIL"),
        subHeading: t("ABOUT"),
      }}
      subHeader={
        <Card
          textTitle={studentObject.firstName + " " + studentObject.lastName}
          _textTitle={{ bold: false, fontWeight: "500", fontSize: "16px" }}
          _textSubTitle={{
            bold: false,
            fontWeight: "400",
            fontSize: "12px",
            color: colors.studentNametext,
          }}
          type="card"
          item={studentObject}
          hidePopUpButton={true}
        />
      }
      _subHeader={{ bg: colors.studentBg }}
      _appBar={{ languages: manifest.languages }}
      _footer={footerLinks}
    >
      <Stack space={2}>
        <StudentEdit {...{ studentObject, setStudentObject }} />

        <Section title={t("ACADEMIC")}>
          <InfoSection
            isLastBorderEnable
            items={[
              {
                title: t("CLASS"),
                value: classObject?.name
                  ? classObject?.name
                  : studentObject.currentClassID,
              },
            ]}
          />
          <Box bg={colors.white} py="5">
            <Collapsible
              defaultCollapse
              isDisableCollapse
              onPressFuction={(e) => {
                setAttendanceView(
                  attendanceView === "month" ? "weeks" : "month"
                );
              }}
              collapsButton={attendanceView === "month" ? false : true}
              header={t("ATTENDANCE")}
            >
              <>
                {manifest.showOnStudentProfile &&
                studentObject &&
                studentObject?.id ? (
                  <></>
                ) : (
                  <Suspense fallback="loading">
                    <AttendanceComponent
                      type={attendanceView}
                      page={0}
                      student={studentObject}
                      withDate={true}
                      hidePopUpButton={true}
                      attendanceProp={attendance}
                      getAttendance={getAttendance}
                      _card={{
                        isHideStudentCard: true,
                      }}
                    />
                  </Suspense>
                )}
                <Button.Group>
                  <Button
                    flex="1"
                    colorScheme="button"
                    variant="outline"
                    onPress={(e) => {
                      navigate("/attendance/" + studentObject.currentClassID);
                    }}
                  >
                    {t("FULL_CLASS_ATTENDANCE")}
                  </Button>
                </Button.Group>
              </>
            </Collapsible>
          </Box>
        </Section>

        <Section
          title={t("LEARNING")}
          button={
            <ButtonWrapper
              variant="ghost"
              colorScheme="button"
              _text={{
                fontWeight: "600",
                fontSize: "14px",
                textTransform: "capitalize",
              }}
            >
              {t("EDIT")}
            </ButtonWrapper>
          }
        >
          {[
            { title: t("RESULTS"), value: "Best in class" },
            { title: t("COMPETENCY"), value: "Creative" },
            { title: t("AWARDS"), value: "No awards yet" },
          ].map((item, index) => (
            <Box
              key={index}
              p="5"
              borderBottomWidth="1"
              borderColor={colors.coolGraylight}
            >
              <Collapsible defaultCollapse header={item.title}>
                <Box pt="18px">
                  <H3>{item.value}</H3>
                </Box>
              </Collapsible>
            </Box>
          ))}
        </Section>
        <Section
          title={t("NOTES_FEEDBACK_ON_STUDENT")}
          _box={{ mb: "4", roundedBottom: "xl", shadow: 2 }}
          button={
            <ButtonWrapper
              variant="ghost"
              colorScheme="button"
              _text={{
                fontWeight: "600",
                fontSize: "14px",
                textTransform: "capitalize",
              }}
            >
              {t("EDIT")}
            </ButtonWrapper>
          }
        >
          <Box p="5">
            <Collapsible defaultCollapse header={t("NOTES")}>
              <Box pt="18px">
                <H3 pb="30">{"2 " + t("NOTES")}</H3>
              </Box>
            </Collapsible>
          </Box>
        </Section>
      </Stack>
    </Layout>
  );
}
