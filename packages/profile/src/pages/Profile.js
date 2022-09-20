import React, { useEffect, useState } from "react";
import { Button, Stack, Box, VStack, HStack, Avatar } from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import manifest from "../manifest.json";
import {
  calendar,
  capture,
  Layout,
  Menu,
  telemetryFactory,
  userRegistryService,
  attendanceRegistryService,
  H4,
  H1,
  H3,
  BodyLarge,
  workHistoryRegistryService,
  schoolRegistryService,
  Loading,
} from "@shiksha/common-lib";
import AttendanceSummaryCard from "../components/AttendanceSummaryCard";
import SelfAttendanceSheet from "../components/SelfAttendanceSheet";
import moment from "moment";
import TeacherEdit from "../components/TeacherEdit";

export default function Profile({ footerLinks, appName, setAlert, config }) {
  const { t } = useTranslation();
  const [teacherObject, setTeacherObject] = useState({});
  const teacherId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [attendance, setAttendance] = React.useState({});
  const [workHistoryData, setWorkHistoryData] = React.useState([]);
  const [expArray, setExpArray] = React.useState([]);
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
    leavingDesignation: "leavingDesignation",
    cadre: "cadre",
    transfer_order_number: "transferOrderNumber",
    date_of_order: "dateOfOrder",
    place_of_posting: "placeOfPosting",
    mode_of_posting: "modeOfPosting",
    phoneNumber: "phoneNumber",
    email: "email",
  };

  const schoolObject = {
    EMPLOYEE_CODE: "employeeCode",
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

    const arr = result.map(
      (e) =>
        `${e?.organizationName} ${moment(e?.dateOfJoining).format(
          "Do MMM YYYY"
        )} - ${moment(e?.dateOfRelieving).format("Do MMM YYYY")}`
    );
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
        const thisPercentage = (thisMonthCount * 100) / thisDiffDays;

        let lastMonthParams = {
          fromDate: moment()
            .add(-1, "month")
            .startOf("month")
            .format("YYYY-MM-DD"),
          toDate: moment().add(-1, "month").endOf("month").format("YYYY-MM-DD"),
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
        const lastPercentage = (lastMonthCount * 100) / lastDiffDays;

        // console.log(
        //   `(${thisMonthCount} * 100) / ${thisDiffDays} ${thisPercentage}`,
        //   `(${lastMonthCount} * 100) / ${lastDiffDays} ${lastPercentage}`
        // );

        setAttendance({
          thisMonth: thisPercentage,
          lastMonth: lastPercentage,
        });
        getWorkHistoryData();
        getSchoolData(resultTeacher.schoolId, resultTeacher);
        setLoading(false);
      }
    };
    getData();
  }, [teacherId, token]);

  const handleSelfAttendance = () => {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <SelfAttendanceSheet
      {...{
        setAlert,
        showModal,
        setShowModal,
        appName,
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
                //bg={"profile.cardBgTransparent"}
                bottom={0}
                p={5}
                pb={8}
                width={"100%"}
              >
                <HStack alignItems="center" justifyContent="space-between">
                  <VStack>
                    <H4 color={"profile.bodyText"} textTransform={"capitalize"}>
                      {t("MY_PROFILE")}
                    </H4>
                    <H1 color={"profile.bodyText"}>
                      {teacherObject?.firstName + " " + teacherObject?.lastName}
                    </H1>
                    <BodyLarge color={"profile.bodyText"}>
                      {teacherObject?.designation}
                    </BodyLarge>
                  </VStack>
                  {/* <HStack>
                    <IconByName color={"profile.white"} name="CameraLineIcon" />
                    <IconByName color={"profile.white"} name="ShareLineIcon" />
                  </HStack> */}
                  <Avatar
                    size="48px"
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
                onPress: (e) => handleSelfAttendance(),
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
            ]}
            moreParameterProp={[
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
              "EMPLOYEE_CODE",
              "employment_address",
              "district",
              "block",
            ]}
            moreParameterProp={[
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
          {config["servicedetails.allow-display-past-workhistory"] &&
          config["servicedetails.allow-display-past-workhistory"] === "true" ? (
            <TeacherEdit
              header={t("Past_Positions_and_Transfer_History")}
              teacherObject={workHistoryData}
              workData={workHistoryData}
              fieldMapper={userObject}
              nestedCollapse={true}
              nestedHeader={expArray}
              onlyParameterProp={["leavingDesignation", "cadre"]}
              moreParameterProp={[
                "transfer_order_number",
                "date_of_order",
                "place_of_posting",
                "mode_of_posting",
              ]}
              isEditable={false}
              seeMore={false}
              seeMoreBelowSection={true}
            />
          ) : (
            <React.Fragment />
          )}
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
      <H3 color={"profile.bodyText"}>{title}</H3>
      {button}
    </HStack>
    {children}
  </Box>
);
