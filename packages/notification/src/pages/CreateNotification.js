import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import {
  Text,
  Box,
  Button,
  HStack,
  VStack,
  Stack,
  Actionsheet,
  Center,
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  BodyLarge,
  BodyMedium,
  capture,
  H1,
  H2,
  H3,
  IconByName,
  Layout,
  Loading,
  telemetryFactory,
  useWindowSize,
  overrideColorTheme,
  notificationRegistryService,
  attendanceRegistryService,
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";
import FormNotification from "../component/FormNotification";
import RecipientList from "../component/RecipientList";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
import { useSearchParams } from "react-router-dom";
const colors = overrideColorTheme(colorTheme);

const CreateNotification = ({ footerLinks, appName }) => {
  const { t } = useTranslation();
  const [pageName, setPageName] = useState();
  const [students, setStudents] = useState([]);
  const [width, height] = useWindowSize();
  const [dateTime, setDateTime] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const NotificationObject = {
    Absent_Today: "Absentfortoday",
    Absent_For_LastWeek: "Absentforlastweek",
    absent_for_last_3_days: "Absentfor3days",
    absent_yesterday: "Absentyesterday",
    "100percent_present": "Present100percent",
    Attendance: "attendance",
    Lessonplans: "lessonplans",
    Worksheet: "worksheet",
  };

  if (searchParams.get("module")) {
    dateTime.Module = "Attendance";
  }

  useEffect(() => {
    capture("PAGE");
  }, []);

  const handleBackButton = () => {
    if (pageName === "Success") {
      setPageName("");
    } else if (pageName === "StudentList") {
      setPageName("RecipientList");
    } else if (pageName === "RecipientList") {
      setPageName("");
    } else {
      navigate(-1);
    }
  };

  const notificationSendRequest = () => {
    const respp = notificationRegistryService.sendNotificationPost(
      {
        module: NotificationObject[dateTime.Module],
        eventTrigger: NotificationObject[dateTime.Event],
        templateId: "57",
        groupId: dateTime.GroupId,
        channel: dateTime.Channel,
        senderId: localStorage.getItem("id"),
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };

  const handleOnPressForSendMsg = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Notification-End",
      tag: "send now",
      studentCount: students.length,
      date: new Date().toISOString().slice(0, 10),
    });
    capture("END", telemetryData);
    notificationSendRequest();
    setPageName("Success");
  };

  if (pageName === "Success") {
    return (
      <Layout
        _appBar={{
          languages: manifest.languages,
          onPressBackButton: handleBackButton,
        }}
      >
        <Loading
          width={width}
          height={height - 60}
          icon={<IconByName name="MailSendLineIcon" _icon={{ size: 100 }} />}
          message={
            <Center>
              <H1 color={colors.coolGraylight}>{t("NOTIFICATION_SENT")}</H1>
              <BodyMedium color={colors.coolGraylight}>
                {`Attendance Notification has been sent to ${students.length} parents`}
              </BodyMedium>
              {/* <Button
                colorScheme="button"
                variant="outline"
                onPress={(e) => setPageName()}
              >
                {"Done"}
              </Button> */}
            </Center>
          }
        />
      </Layout>
    );
  }

  return (
    <Layout
      _header={{
        title: t("MY_NOTIFICATIONS"),
        subHeading: moment().format("hh:mm A"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{
        languages: manifest.languages,
        onPressBackButton: handleBackButton,
      }}
      subHeader={t("ADD_NEW_NOTIFICATION")}
      _subHeader={{
        bg: colors.cardBg,
        _text: {
          fontSize: "16px",
          fontWeight: "500",
          textTransform: "inherit",
          py: "7px",
        },
      }}
      _footer={footerLinks}
    >
      {pageName === "StudentList" ? (
        <StudentList {...{ setPageName, students, setStudents, dateTime }} />
      ) : pageName === "RecipientList" ? (
        <RecipientList
          {...{ setPageName, students, setStudents, appName, dateTime }}
        />
      ) : (
        <FormNotification
          {...{ setPageName, students, setStudents, dateTime, setDateTime }}
        />
      )}
      <Actionsheet isOpen={pageName === "Popup"} onClose={() => setPageName()}>
        <Actionsheet.Content
          alignItems={"left"}
          bg={colors.createNotificationCardBg}
        >
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="15px">
              <H2>{t("VIEW_NOTIFICATION")}</H2>
            </Stack>
            {/* <IconByName
              name="CloseCircleLineIcon"
              color="classCard.900"
              onPress={(e) => setPageName()}
            /> */}
          </HStack>
        </Actionsheet.Content>
        <Box bg={colors.white} width={"100%"}>
          <Box px="5">
            <HStack
              py="5"
              borderBottomWidth="1"
              borderColor={colors.lightGray}
              alignItems="center"
              space="1"
            >
              <IconByName
                _icon={{ size: "16" }}
                name="CheckDoubleLineIcon"
                color={colors.cardCloseIcon}
                isDisabled
              />
              <BodyLarge>
                {t(`Sending to ${students.length} parents`)}
              </BodyLarge>
            </HStack>
          </Box>
          <VStack p="5" space={6}>
            <H3>{t("NOTICE")}</H3>
            <BodyMedium textTransform={"inherit"}>
              Kindly Note Your OTP @__123__@. Submission Of The OTP Will Be
              Taken As Authentication That You Have Personally Verified And
              Overseen The Distribution Of Smartphone To The Mentioned Student
              ID Of Your School. Thank You! - Samagra Shiksha, Himachal Pradesh
              View Recipient List
            </BodyMedium>
          </VStack>
          <Box p="5">
            <Button.Group>
              <Button
                flex="1"
                colorScheme="button"
                variant="outline"
                px="5"
                mr="5px"
                onPress={(e) => setPageName()}
              >
                {t("CANCEL")}
              </Button>
              <Button
                flex="1"
                colorScheme="button"
                _text={{ color: "white" }}
                px="5"
                ml="5px"
                onPress={(e) => handleOnPressForSendMsg()}
              >
                {t("SEND_MESSAGE")}
              </Button>
            </Button.Group>
          </Box>
        </Box>
      </Actionsheet>
    </Layout>
  );
};

export default CreateNotification;
