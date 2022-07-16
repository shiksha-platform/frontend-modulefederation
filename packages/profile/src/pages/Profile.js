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
  teacherRegistryService,
  attendanceRegistryService,
  H4,
  H1,
  H3,
  overrideColorTheme,
} from "@shiksha/common-lib";
import AttendanceSummaryCard from "../components/AttendanceSummaryCard";
import SelfAttedanceSheet from "../components/SelfAttedanceSheet";
import moment from "moment";
import colorTheme from "../colorTheme";
import TeacherEdit from "../components/TeacherEdit";

const colors = overrideColorTheme(colorTheme);
// Start editing here, save and see your changes.
export default function Profile({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [teacherObject, setTeacherObject] = useState({});
  const teacherId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = React.useState(false);
  const [attendance, setAttendance] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      if (!ignore) {
        const resultTeacher = await teacherRegistryService.getOne();
        setTeacherObject(resultTeacher);
        let thisMonthParams = {
          fromDate: moment().startOf("month").format("YYYY-MM-DD"),
          toDate: moment().format("YYYY-MM-DD"),
          userId: localStorage.getItem("id"),
        };
        const thisDiffDays = moment(thisMonthParams.toDate).diff(
          thisMonthParams.fromDate,
          "Days"
        );
        const thisMonthAttendance = await attendanceRegistryService.getAll(
          thisMonthParams
        );

        const thisMonthCount = thisMonthAttendance.filter(
          (e) => e.attendance === "Present"
        ).length;
        const thisPersantage = (thisMonthCount * 100) / thisDiffDays;

        let lastMonthDays = calendar(-1, "monthInDays");
        let lastMonthParams = {
          fromDate: lastMonthDays?.[0]?.format("YYYY-MM-DD"),
          toDate:
            lastMonthDays?.[lastMonthDays.length - 1]?.format("YYYY-MM-DD"),
          userId: localStorage.getItem("id"),
        };
        const lastDiffDays = moment(lastMonthParams.toDate).diff(
          lastMonthParams.fromDate,
          "Days"
        );
        const lastMonthAttendance = await attendanceRegistryService.getAll(
          lastMonthParams
        );

        const lastMonthCount = lastMonthAttendance.filter(
          (e) => e.attendance === "Present"
        ).length;
        const lastPersantage = (lastMonthCount * 100) / lastDiffDays;

        setAttendance({
          thisMonth: thisPersantage,
          lastMonth: lastPersantage,
        });
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
    <SelfAttedanceSheet
      {...{
        showModal,
        setShowModal,
        appName,
        setAttendance,
      }}
    >
      <Layout
        imageUrl={`${window.location.origin}/class.png`}
        _appBar={{ languages: manifest.languages }}
        _header={{
          title: t("MY_CLASSES"),
          customeComponent: (
            <Box minH={"150px"}>
              <Box
                position={"absolute"}
                bg={colors.cardBgTransparent}
                bottom={0}
                p={5}
                pb={8}
                width={"100%"}
              >
                <HStack alignItems="center" justifyContent="space-between">
                  <VStack>
                    <H4 color={colors.white}>{t("MY_PROFILE")}</H4>
                    <H1 color={colors.white}>
                      {teacherObject?.firstName + " " + teacherObject?.lastName}
                    </H1>
                  </VStack>
                  {/* <HStack>
                    <IconByName color={colors.white} name="CameraLineIcon" />
                    <IconByName color={colors.white} name="ShareLineIcon" />
                  </HStack> */}
                </HStack>
              </Box>
            </Box>
          ),
        }}
        subHeader={
          <Menu
            routeDynamics={true}
            _icon={{ isDisabled: true }}
            items={[
              {
                keyId: 1,
                title: t("TAKE_ATTENDANCE"),
                icon: "CalendarCheckLineIcon",
                boxMinW: "177px",
                _text: { minW: "115px" },
                onPress: (e) => handalSelfAttendance(),
              },
            ]}
            type={"vertical"}
          />
        }
        _subHeader={{
          bottom: "15px",
          bg: colors.cardBg,
        }}
        _footer={footerLinks}
      >
        <Stack space={1}>
          <Section title={t("ATTENDANCE")} />
          <Section>
            <Stack space={5}>
              <AttendanceSummaryCard {...attendance} />
              <Stack px="5">
                <Button
                  flex="1"
                  variant="outline"
                  onPress={(e) => handalReportTelemetry()}
                >
                  {t("ATTENDANCE_REPORTS")}
                </Button>
              </Stack>
            </Stack>
          </Section>
          <TeacherEdit
            header={t("PERSONAL_DETAILS")}
            teacherObject={teacherObject}
            onlyParameterProp={[
              "employeeCode",
              "joiningDate",
              "birthDate",
              "gender",
            ]}
            isEditable={false}
          />
          <TeacherEdit
            header={t("CONTACT_DETAILS")}
            teacherObject={teacherObject}
            setTeacherObject={setTeacherObject}
            onlyParameterProp={["phoneNumber", "email"]}
          />
        </Stack>
      </Layout>
    </SelfAttedanceSheet>
  );
}

const Section = ({ title, button, children, _box, _title }) => (
  <Box bg={colors.white} p="5" {..._box}>
    <HStack alignItems={"center"} justifyContent={"space-between"} {..._title}>
      <H3>{title}</H3>
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
              color={colors.gray}
              fontWeight="500"
              {..._text}
            >
              {header}
            </Text>
            <IconByName
              size="sm"
              isDisabled={true}
              color={
                !collaps || collapsButton
                  ? colors.grayInLight
                  : colors.grayInDark
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
