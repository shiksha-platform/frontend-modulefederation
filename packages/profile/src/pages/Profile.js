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
} from "native-base";
import * as teacherServiceRegistry from "../services/teacherServiceRegistry";
import * as attendanceServiceRegistry from "../services/attendanceServiceRegistry";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import manifest from "../manifest.json";
import {
  calendar,
  capture,
  IconByName,
  Layout,
  Menu,
  telemetryFactory,
} from "@shiksha/common-lib";
import AttendanceSummaryCard from "components/AttendanceSummaryCard";
import SelfAttedanceSheet from "components/SelfAttedanceSheet";
import moment from "moment";

// Start editing here, save and see your changes.
export default function Profile({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [teacherObject, setTeacherObject] = useState({});
  const teacherId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = React.useState(false);
  const [attendance, setAttendance] = React.useState({});
  const navigate = useNavigate();

  const StudentEdit = React.lazy(() => import("students/StudentEdit"));

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      const resultTeacher = await teacherServiceRegistry.getOne();
      let thisMonthParams = {
        fromDate: moment().startOf("month").format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        userId: localStorage.getItem("id"),
      };
      const thisDiffDays = moment(thisMonthParams.toDate).diff(
        thisMonthParams.fromDate,
        "Days"
      );
      const thisMonthAttendance = await attendanceServiceRegistry.getAll(
        thisMonthParams
      );

      const thisMonthCount = thisMonthAttendance.filter(
        (e) => e.attendance === "Present"
      ).length;
      const thisPersantage = (thisMonthCount * 100) / thisDiffDays;

      let lastMonthDays = calendar(-1, "monthInDays");
      let lastMonthParams = {
        fromDate: lastMonthDays?.[0]?.format("YYYY-MM-DD"),
        toDate: lastMonthDays?.[lastMonthDays.length - 1]?.format("YYYY-MM-DD"),
        userId: localStorage.getItem("id"),
      };
      const lastDiffDays = moment(lastMonthParams.toDate).diff(
        lastMonthParams.fromDate,
        "Days"
      );
      const lastMonthAttendance = await attendanceServiceRegistry.getAll(
        lastMonthParams
      );

      const lastMonthCount = lastMonthAttendance.filter(
        (e) => e.attendance === "Present"
      ).length;
      const lastPersantage = (lastMonthCount * 100) / lastDiffDays;

      if (!ignore) {
        setAttendance({
          thisMonth: thisPersantage,
          lastMonth: lastPersantage,
        });
        setTeacherObject(resultTeacher);
      }
    };
    getData();
  }, [teacherId, token]);

  const handalSelfAttendance = () => {
    setShowModal(!showModal);
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Self-Attendance-Start-Mark",
    });
    capture("START", telemetryData);
  };

  const handalReportTelemetry = () => {
    setShowModal(!showModal);
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Self-Attendance-Start-Report",
    });
    capture("START", telemetryData);
    navigate("/profile/attendance");
  };

  return (
    <Layout
      imageUrl={`${window.location.origin}/class.png`}
      _appBar={{ languages: manifest.languages }}
      _header={{
        title: t("MY_CLASSES"),
        customeComponent: (
          <Box minH={"150px"}>
            <Box
              position={"absolute"}
              style={{ backgroundColor: "rgba(24, 24, 27, 0.4)" }}
              bottom={0}
              p={5}
              width={"100%"}
            >
              <HStack alignItems="center" justifyContent="space-between">
                <VStack>
                  <Text color="gray.100" fontWeight="700" fontSize="md">
                    {t("MY_PROFILE")}
                  </Text>

                  <Text color="gray.100" fontWeight="700" fontSize="2xl">
                    {teacherObject.fullName}
                  </Text>
                </VStack>
                <HStack>
                  <IconByName color="white" name="CameraLineIcon" />
                  <IconByName color="white" name="ShareLineIcon" />
                </HStack>
              </HStack>
            </Box>
          </Box>
        ),
      }}
      subHeader={
        <Menu
          routeDynamics={true}
          items={[
            {
              keyId: 1,
              title: t("TAKE_ATTENDANCE"),
              icon: "CalendarCheckLineIcon",
              boxMinW: "200px",
              onPress: (e) => handalSelfAttendance(),
            },
          ]}
          type={"veritical"}
        />
      }
      _subHeader={{
        bottom: "15px",
        bg: "classCard.500",
      }}
      _footer={footerLinks}
    >
      <SelfAttedanceSheet
        {...{
          showModal,
          setShowModal,
          appName,
        }}
      />
      <Stack space={2}>
        <Section title={t("ATTENDANCE")} />
        <Section>
          <Stack space={5}>
            <AttendanceSummaryCard {...attendance} />
            <Button variant="outline" onPress={(e) => handalReportTelemetry()}>
              {t("ATTENDANCE_REPORTS")}
            </Button>
          </Stack>
        </Section>
        <StudentEdit
          studentObject={teacherObject}
          setStudentObject={setTeacherObject}
          onlyParameterProp={["firstName", "lastName", "email"]}
          type="Teacher"
        />
        <Section
          title={t("CAREER")}
          _title={{
            borderBottomWidth: "1",
            borderBottomColor: "coolGray.200",
            py: "5",
          }}
          _box={{ mb: "4", roundedBottom: "xl", shadow: 2 }}
        >
          <Stack
            py="5"
            space={2}
            borderBottomWidth="1"
            borderBottomColor={"coolGray.200"}
          >
            <Collapsible
              header={t("MY_CLASS_RESULT")}
              _icon={{ color: "gray.700", name: "ArrowRightSLineIcon" }}
              _text={{ color: "gray.700" }}
            />
          </Stack>
          <Stack
            py="5"
            space={2}
            borderBottomWidth="1"
            borderBottomColor={"coolGray.200"}
          >
            <Collapsible
              header={t("COMPETENCY")}
              _icon={{ color: "gray.700", name: "ArrowRightSLineIcon" }}
              _text={{ color: "gray.700" }}
            />
          </Stack>
          <Stack py="5" space={2}>
            <Collapsible
              header={t("AWARDS")}
              _icon={{ color: "gray.700", name: "ArrowRightSLineIcon" }}
              _text={{ color: "gray.700" }}
            />
          </Stack>
        </Section>
      </Stack>
    </Layout>
  );
}

const Section = ({ title, button, children, _box, _title }) => (
  <Box bg={"white"} p="5" {..._box}>
    <HStack alignItems={"center"} justifyContent={"space-between"} {..._title}>
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
  _text,
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
        <Box {..._box}>
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <Text
              fontSize={typeof isHeaderBold === "undefined" ? "14px" : ""}
              color="coolGray.400"
              fontWeight="500"
              {..._text}
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
