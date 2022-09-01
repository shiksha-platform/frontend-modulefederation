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
  Avatar,
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
  userRegistryService,
  attendanceRegistryService,
  roleRegistryService,
  H4,
  H1,
  H3,
  overrideColorTheme,
  BodyLarge,
  workHistoryRegistryService,
  schoolRegistryService,
} from "@shiksha/common-lib";
import AttendanceSummaryCard from "../components/AttendanceSummaryCard";
import SelfAttendanceSheet from "../components/SelfAttendanceSheet";
import moment from "moment";
import colorTheme from "../colorTheme";
import TeacherEdit from "../components/TeacherEdit";

const colors = overrideColorTheme(colorTheme);

export default function Profile({ footerLinks, appName, setAlert }) {
  const { t } = useTranslation();
  const [teacherObject, setTeacherObject] = useState({});
  const teacherId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = React.useState(false);
  const [attendance, setAttendance] = React.useState({});
  const [workHistoryData, setWorkHistoryData] = React.useState([]);
  const [expArray, setExpArray] = React.useState([]);
  const [schoolData, setSchoolData] = React.useState({});
  const [roleData, setRoleData] = React.useState({});
  const navigate = useNavigate();

  const userObject = {
    aadhar_number: "aadhaar",
    residential_address: "address",
    district: "district",
    block: "block",
    pincode: "pincode",
    date_of_birth: "birthDate",
    gender: "gender",
    social_category: "socialCategory",
    blood_group: "bloodGroup",
    marital_status: "maritalStatus",
    disability: "disability",
    designation: "leavingDesignation",
    cadre: "cadre",
    transfer_order_number: "transferOrderNumber",
    date_of_order: "dateOfOrder",
    place_of_posting: "placeOfPosting",
    mode_of_posting: "modeOfPosting",
    phoneNumber: "phoneNumber",
    email: "email",
  };

  const schoolObject = {
    employee_code: "employeeCode",
    employment_address: "schoolAddress",
    district: "schoolDistrict",
    block: "schoolBlock",
    pincode: "schoolPincode",
    employment_type: "employmentType",
    "present_designation/cadre": "designation",
    qualifications: "profQualification",
    teacher_category: "designation",
    "subjects / subject ids": "subjectIds",
    date_of_joining: "joiningDate",
    reporting_officer: "reportsTo",
    place_of_current_posting: "schoolDistrict",
  };

  const getWorkHistoryData = async () => {
    const result = await workHistoryRegistryService.sendNotificationSearch({
      userId: teacherId,
    });

    let arr = [];
    result.map((e) => {
      const startDate = new Date(e?.dateOfJoining).toDateString();
      const endDate = new Date(e?.dateOfRelieving).toDateString();
      arr = [
        ...arr,
        `${e?.organizationName}        ${startDate}  -  ${endDate}`,
      ];
    });
    setExpArray(arr);
    setWorkHistoryData(result);
  };

  const getSchoolData = async (id, resultTeacher) => {
    const result = await schoolRegistryService.getOne({ id: id });
    setTeacherObject({ ...resultTeacher, ...result });
  };

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      if (!ignore) {
        const resultTeacher = await userRegistryService.getOne();
        //setTeacherObject(resultTeacher);
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
        getWorkHistoryData();
        getSchoolData(resultTeacher.schoolId, resultTeacher);
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
    <SelfAttendanceSheet
      {...{
        setAlert,
        showModal,
        setShowModal,
        appName,
        setAttendance,
      }}
    >
      <Layout
        //imageUrl={`${process.env.PUBLIC_URL}/class.png`}
        _appBar={{ languages: manifest.languages }}
        _header={{
          title: t("MY_CLASSES"),
          customeComponent: (
            <Box minH={"150px"}>
              <Box
                position={"absolute"}
                bg={"profile.cardBgTransparent"}
                bottom={0}
                p={5}
                pb={8}
                width={"100%"}
              >
                <HStack alignItems="center" justifyContent="space-between">
                  <VStack>
                    <H4 color={"profile.white"}>{t("MY_PROFILE")}</H4>
                    <H1 color={"profile.white"}>
                      {teacherObject?.firstName + " " + teacherObject?.lastName}
                    </H1>
                    <BodyLarge color={colors.date}>
                      {teacherObject?.designation}
                    </BodyLarge>
                  </VStack>
                  {/* <HStack>
                    <IconByName color={colors.white} name="CameraLineIcon" />
                    <IconByName color={colors.white} name="ShareLineIcon" />
                  </HStack> */}
                  <Avatar
                    size="48px"
                    bg="amber.500"
                    source={{
                      uri: teacherObject?.image,
                    }}
                  >
                    {`${teacherObject?.firstName} ${teacherObject?.lastName}`
                      .toUpperCase()
                      .substr(0, 2)}
                  </Avatar>
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
                title: t("MARK_ATTENDANCE"),
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
          bg: "profile.cardBg",
        }}
        _footer={footerLinks}
      >
        <Stack space={2}>
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
            fieldMapper={userObject}
            onlyParameterProp={[
              "aadhar_number",
              "residential_address",
              "district",
              "block",
              "pincode",
              "date_of_birth",
              "gender",
              "social_category",
              "blood_group",
              "marital_status",
              "disability",
            ]}
            isEditable={false}
            seeMore={true}
          />
          <TeacherEdit
            header={t("Employment Details")}
            teacherObject={teacherObject}
            fieldMapper={schoolObject}
            onlyParameterProp={[
              "employee_code",
              "employment_address",
              "district",
              "block",
              "pincode",
              "employment_type",
              "present_designation/cadre",
              "qualifications",
              "teacher_category",
              "subjects / subject ids",
              "date_of_joining",
              "reporting_officer",
              "place_of_current_posting",
            ]}
            isEditable={false}
            seeMore={true}
          />
          <TeacherEdit
            header={t("Past_Positions_and_Transfer_History")}
            teacherObject={workHistoryData}
            workData={workHistoryData}
            fieldMapper={userObject}
            nestedCollapse={true}
            nestedHeader={expArray}
            onlyParameterProp={[
              "designation",
              "cadre",
              "transfer_order_number",
              "date_of_order",
              "place_of_posting",
              "mode_of_posting",
            ]}
            isEditable={false}
            seeMore={false}
            seeMoreBelowSection={true}
          />
          <TeacherEdit
            header={t("CONTACT_DETAILS")}
            teacherObject={teacherObject}
            fieldMapper={userObject}
            setTeacherObject={setTeacherObject}
            onlyParameterProp={["phoneNumber", "email"]}
            isEditable={false}
            seeMore={false}
          />
        </Stack>
      </Layout>
    </SelfAttendanceSheet>
  );
}

const Section = ({ title, button, children, _box, _title }) => (
  <Box bg={"profile.white"} p="5" {..._box}>
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
              color={"profile.gray"}
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
                  ? "profile.lightGray1"
                  : "profile.darkGary3"
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
