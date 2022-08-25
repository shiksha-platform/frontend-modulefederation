import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Stack,
  Box,
  FormControl,
  Input,
  useToast,
  HStack,
  VStack,
  Select,
  Pressable,
  Avatar,
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  H1,
  H3,
  userRegistryService,
  overrideColorTheme,
  Collapsible,
  H2,
  BodyLarge,
  BodyMedium,
  Subtitle,
  H4,
  attendanceRegistryService,
  Layout,
  Menu,
  calendar,
  telemetryFactory,
} from "@shiksha/common-lib";
import colorTheme from "../colorTheme";
import manifest from "../manifest.json";
import moment from "moment";
import { Section } from "components/TeacherEdit";
import TeacherEdit from "components/TeacherEdit";
import SelfAttendanceSheet from "../components/SelfAttendanceSheet";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const colors = overrideColorTheme(colorTheme);

const SeeMore = ({ footerLinks, appName }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [attendance, setAttendance] = React.useState({});
  const [teacherObject, setTeacherObject] = React.useState({});
  const { state } = useParams();
  const navigate = useNavigate();
  const teacherId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { t } = useTranslation();

  const apiFieldMapping = {
    designation: "leavingDesignation",
    cadre: "cadre",
    transfer_order_number: "transferOrderNumber",
    date_of_order: "dateOfOrder",
    place_of_posting: "placeOfPosting",
    mode_of_posting: "modeOfPosting",
  };
  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      if (!ignore) {
        const resultTeacher = await userRegistryService.getOne();
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

  return (
    <SelfAttendanceSheet
      {...{
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
                //bg={colors.teacherBackground2}
                bottom={0}
                p={5}
                pb={8}
                width={"100%"}
              >
                <HStack alignItems="center" justifyContent="space-between">
                  <VStack>
                    <H4 color={colors.date}>{t("MY_PROFILE")}</H4>
                    <H1 color={colors.date}>
                      {teacherObject?.firstName +
                        " " +
                        teacherObject?.lastName}
                    </H1>
                    <BodyLarge color={colors.date}>
                      {teacherObject?.designation}
                    </BodyLarge>
                  </VStack>
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
        <TeacherEdit
          header={location.state.header}
          teacherObject={location.state}
          onlyParameterProp={location.state.objectProp}
          isEditable={false}
          SeeMore={false}
          nestedCollapse={location.state.nestedCollapse === true ? true : false}
          nestedHeader={
            location.state.nestedHeader?.length > 0
              ? location.state.nestedHeader
              : []
          }
          seeMoreBelowSection={false}
          workData={
            location.state.updatedObject?.length > 0 ? location.state.updatedObject : []
          }
          fieldMapper={
            location.state.nestedCollapse === true ? apiFieldMapping : location.state?.fieldMapper
          }
        />
      </Layout>
    </SelfAttendanceSheet>
  );
};

export default SeeMore;
