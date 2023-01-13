import React from "react";
import { Text, Box, Pressable, Image, Avatar } from "native-base";
import { useTranslation } from "react-i18next";
import {
  capture,
  Layout,
  Tab,
  overrideColorTheme,
  H3,
  IconByName,
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";
const colors = overrideColorTheme();

const MyClassRoute = React.lazy(() => import("classes/MyClassRoute"));
const TimeTableRoute = React.lazy(() => import("calendar/TimeTableRoute"));

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const SelfAttendanceSheet = React.lazy(() =>
  import("profile/SelfAttendanceSheet")
);

const MyClasses = ({ footerLinks, setAlert, appName }) => {
  const { t } = useTranslation();
  const [selfAttendance, setSelfAttendance] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  let newAvatar = localStorage.getItem("firstName");

  let cameraUrl = "";
  let avatarUrlObject = cameraUrl
    ? {
        source: {
          uri: cameraUrl,
        },
      }
    : {};

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <SelfAttendanceSheet
      {...{
        setAlert,
        showModal,
        setShowModal,
        setAttendance: setSelfAttendance,
        appName,
      }}
    >
      <Layout
        _header={{
          title: t("MY_CLASS"),
          subHeading: moment().format("hh:mm A"),
          iconComponent: (
            <Pressable onPress={(e) => setShowModal(true)}>
              {cameraUrl ? (
                <Image
                  ref={myRef}
                  {...avatarUrlObject}
                  rounded="lg"
                  alt="Profile"
                  size="50px"
                />
              ) : (
                <Avatar>{newAvatar?.toUpperCase().substr(0, 2)}</Avatar>
              )}
              {selfAttendance?.attendance ? (
                <IconByName
                  name={
                    selfAttendance.attendance === PRESENT &&
                    selfAttendance?.remark !== ""
                      ? "AwardFillIcon"
                      : selfAttendance.attendance === ABSENT
                      ? "CloseCircleFillIcon"
                      : "CheckboxCircleFillIcon"
                  }
                  isDisabled
                  color={
                    selfAttendance.attendance === PRESENT &&
                    selfAttendance?.remark !== ""
                      ? "attendance.special_duty"
                      : selfAttendance.attendance === ABSENT
                      ? "attendance.absent"
                      : "attendance.present"
                  }
                  position="absolute"
                  bottom="-5px"
                  right="-5px"
                  bg="white"
                  rounded="full"
                />
              ) : (
                ""
              )}
            </Pressable>
          ),
        }}
        _appBar={{ languages: manifest.languages }}
        subHeader={<H3 textTransform="none">{t("THE_CLASS_YOU_TAKE")}</H3>}
        _subHeader={{
          bg: colors?.cardBg,
          _text: {
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "inherit",
          },
        }}
        _footer={footerLinks}
      >
        <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
          <Tab
            routes={[
              { title: t("MY_CLASS"), component: <MyClassRoute /> },
              { title: t("TIME_TABLE"), component: <TimeTableRoute /> },
            ]}
          />
        </Box>
      </Layout>
    </SelfAttendanceSheet>
  );
};

export default MyClasses;
