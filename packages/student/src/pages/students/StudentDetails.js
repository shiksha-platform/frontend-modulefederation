import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Stack,
  Box,
  VStack,
  HStack,
  Pressable,
  PresenceTransition,
  Link,
} from "native-base";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import { useTranslation } from "react-i18next";
import { IconByName, Layout } from "@shiksha/common-lib";
import { useParams } from "react-router-dom";
import StudentEdit from "../../components/students/StudentEdit";
import Card from "../../components/students/Card";
import manifest from "../../manifest.json";

// Start editing here, save and see your changes.
export default function StudentDetails() {
  const { t } = useTranslation();
  const [studentObject, setStudentObject] = useState({});
  const [classObject, setClassObject] = useState({});
  const { studentId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [attendanceView, setAttendanceView] = useState("month");

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
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
    // const attendanceData = await GetAttendance({
    //   studentId: {
    //     eq: studentId,
    //   },
    //   classId: {
    //     eq: e.classId ? e.classId : studentObject.currentClassID,
    //   },
    //   teacherId: {
    //     eq: teacherId,
    //   },
    // });

    const attendanceData = [];
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
          textTitle={studentObject.fullName}
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
      <Stack space={2}>
        <StudentEdit {...{ studentObject, setStudentObject }} />

        <Section title={t("ACADEMIC")}>
          <InfoSection
            isLastBorderEnable
            items={[
              {
                title: t("CLASS"),
                value: classObject?.name
                  ? classObject?.class + " " + classObject?.section
                  : studentObject.currentClassID,
              },
            ]}
          />
          <Box bg="white" py="5">
            <Collapsible
              defaultCollapse
              isDisableCollapse
              onPressFuction={(e) => {
                setAttendanceView(attendanceView === "month" ? "" : "month");
              }}
              collapsButton={attendanceView === "month" ? false : true}
              header={t("ATTENDANCE")}
              body={
                <>
                  {manifest.showOnStudentProfile &&
                  studentObject &&
                  studentObject?.id ? (
                    <>
                      <h2>AttendanceComponent</h2>
                    </>
                  ) : (
                    // <AttendanceComponent
                    //   type={attendanceView}
                    //   page={0}
                    //   student={studentObject}
                    //   withDate={true}
                    //   hidePopUpButton={true}
                    //   attendanceProp={attendance}
                    //   getAttendance={getAttendance}
                    //   _card={{
                    //     img: false,
                    //     _textTitle: { display: "none" },
                    //     _textSubTitle: { display: "none" },
                    //   }}
                    // />
                    <></>
                  )}
                  <HStack space={2} justifyContent={"center"}>
                    <Link
                      to={"/attendance/" + studentObject.currentClassID}
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
                    </Link>
                    <Link
                      to={"/students/sendSms/" + studentObject.id}
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
                    </Link>
                  </HStack>
                </>
              }
            />
          </Box>
        </Section>

        <Section
          title={t("LEARNING")}
          button={
            <Button
              variant="ghost"
              colorScheme="button"
              endIcon={<IconByName name={"PencilLineIcon"} isDisabled />}
              _text={{ fontWeight: "400" }}
            >
              {t("EDIT")}
            </Button>
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
              <Collapsible
                defaultCollapse
                header={item.title}
                body={
                  <Box pt="18px">
                    <Text fontWeight="500" fontSize="14px">
                      {item.value}
                    </Text>
                  </Box>
                }
              />
            </Box>
          ))}
        </Section>
        <Section
          title={t("NOTES_FEEDBACK_ON_STUDENT")}
          _box={{ mb: "4", roundedBottom: "xl", shadow: 2 }}
          button={
            <Button
              variant="ghost"
              colorScheme="button"
              endIcon={<IconByName name={"PencilLineIcon"} isDisabled />}
              _text={{ fontWeight: "400" }}
            >
              {t("EDIT")}
            </Button>
          }
        >
          <Box p="5">
            <Collapsible
              defaultCollapse
              header={t("NOTES")}
              body={
                <Box pt="18px">
                  <Text fontWeight="500" fontSize="14px" pb="30">
                    {"2 " + t("NOTES")}
                  </Text>
                </Box>
              }
            />
          </Box>
        </Section>
      </Stack>
    </Layout>
  );
}

const InfoSection = ({ items, isLastBorderEnable }) => {
  const { t } = useTranslation();
  return items.map((item, index) => (
    <VStack
      space="3"
      py="5"
      borderBottomWidth={
        items.length - 1 !== index || isLastBorderEnable ? "1" : "0"
      }
      borderColor={"coolGray.200"}
      key={index}
    >
      <Text fontSize={"14px"} fontWeight="500" color={"coolGray.400"}>
        {item.title}
      </Text>
      {item.value ? (
        <Text>{item.value}</Text>
      ) : (
        <Text italic>{t("NOT_ENTERED")}</Text>
      )}
    </VStack>
  ));
};

const Section = ({ title, button, children, _box }) => (
  <Box bg={"white"} p="5" {..._box}>
    <HStack alignItems={"center"} justifyContent={"space-between"}>
      <Text fontSize="16px" fontWeight="500">
        {title}
      </Text>
      {button}
    </HStack>
    {children}
  </Box>
);

const Collapsible = ({
  header,
  body,
  defaultCollapse,
  isHeaderBold,
  isDisableCollapse,
  onPressFuction,
  collapsButton,
  _header,
  _icon,
  _box,
}) => {
  const [collaps, setCollaps] = useState(defaultCollapse);

  return (
    <>
      <Pressable
        onPress={() => {
          if (onPressFuction) {
            onPressFuction();
          }
          if (!isDisableCollapse) {
            setCollaps(!collaps);
          }
        }}
      >
        <Box>
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <Text
              fontSize={typeof isHeaderBold === "undefined" ? "14px" : ""}
              color="coolGray.400"
              fontWeight="500"
            >
              {header}
            </Text>
            <IconByName
              size="sm"
              isDisabled={true}
              color={
                !collaps || collapsButton ? "coolGray.400" : "coolGray.600"
              }
              name={
                !collaps || collapsButton
                  ? "ArrowDownSLineIcon"
                  : "ArrowUpSLineIcon"
              }
              {..._icon}
            />
          </HStack>
        </Box>
      </Pressable>
      <PresenceTransition visible={collaps}>{body}</PresenceTransition>
    </>
  );
};
