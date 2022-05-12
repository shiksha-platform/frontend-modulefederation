import React, { Suspense, useEffect, useState } from "react";
import { Text, Stack, Box, HStack } from "native-base";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";
import * as attendanceServiceRegistry from "../../services/attendanceServiceRegistry";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import { useTranslation } from "react-i18next";
import { IconByName, Layout, Collapsible, H3 } from "@shiksha/common-lib";
import { useParams } from "react-router-dom";
import StudentEdit from "../../components/students/StudentEdit";
import Card from "../../components/students/Card";
import manifest from "../../manifest.json";
import InfoSection from "./Molecules/InfoSection";
import Section from "./Molecules/Section";
import LinkWrapper from "atoms/LinkWrapper";
import ButtonWrapper from "atoms/ButtonWrapper";

// Start editing here, save and see your changes.
export default function StudentDetails({ footerLinks }) {
  const { t } = useTranslation("student");
  const [studentObject, setStudentObject] = useState({});
  const [classObject, setClassObject] = useState({});
  const { studentId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [attendanceView, setAttendanceView] = useState("month");
  const AttendanceComponent = React.lazy(() =>
    import("attendance/AttendanceComponent")
  );

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      console.log("Abc", studentId);
      let student = await studentServiceRegistry.getOne({ id: studentId });

      let classObj = await classServiceRegistry.getOne({
        id: student.currentClassID,
      });
      if (!ignore) {
        setStudentObject({ ...student, name: classObj.name });
        setClassObject(classObj);
        await getAttendance({ classId: student.currentClassID });
      }
    };
    getData();
  }, [studentId]);

  const getAttendance = async (e) => {
    const attendanceData = await attendanceServiceRegistry.getAll({
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
            color: "coolGray.800",
          }}
          type="card"
          item={studentObject}
          hidePopUpButton={true}
        />
      }
      _subHeader={{ bg: "studentCard.500" }}
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
          <Box bg="white" py="5">
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
                  <Suspense fallback="loding">
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
                <HStack space={2} justifyContent={"center"}>
                  <LinkWrapper
                    to={`/attendance/${studentObject.currentClassID}`}
                    style={{
                      textDecoration: "none",
                      flex: "auto",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      rounded="lg"
                      borderColor="button.500"
                      borderWidth="1"
                      _text={{ color: "button.500" }}
                      px={4}
                      py={2}
                    >
                      {t("FULL_CLASS_ATTENDANCE")}
                    </Box>
                  </LinkWrapper>
                  <LinkWrapper
                    href={`/students/sendSms/${studentObject.id}`}
                    style={{
                      textDecoration: "none",
                      flex: "auto",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      rounded="lg"
                      bg="button.500"
                      borderColor="button.500"
                      borderWidth="1"
                      _text={{ color: "white" }}
                      px={4}
                      py={2}
                    >
                      {t("MESSAGE_HISTORY")}
                    </Box>
                  </LinkWrapper>
                </HStack>
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
              endIcon={<IconByName name={"PencilLineIcon"} isDisabled />}
              _text={{ fontWeight: "400" }}
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
              borderColor={"coolGray.200"}
            >
              <Collapsible defaultCollapse header={item.title}>
                <Box pt="18px">
                  <H3 fontWeight="500">
                    {item.value}
                  </H3>
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
              endIcon={<IconByName name={"PencilLineIcon"} isDisabled />}
              _text={{ fontWeight: "400" }}
            >
              {t("EDIT")}
            </ButtonWrapper>
          }
        >
          <Box p="5">
            <Collapsible defaultCollapse header={t("NOTES")}>
              <Box pt="18px">
                <H3 fontWeight="500" pb="30">
                  {"2 " + t("NOTES")}
                </H3>
              </Box>
            </Collapsible>
          </Box>
        </Section>
      </Stack>
    </Layout>
  );
}
