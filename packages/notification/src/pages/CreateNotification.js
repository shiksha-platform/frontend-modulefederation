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
  const [template, setTemplate] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const NotificationObject = {
    Absent_Today: "Absent_Today",
    Absent_Lastweek: "Absent_Lastweek",
    Present_Everyday: "Present_Everyday",
    Absent_ForLast3Days: "Absent_ForLast3Days",
    Absent_Yesterday: "Absent_Yesterday",
    Present_Lastweek: "Present_Lastweek",
    Attendance: "attendance",
    Lessonplans: "lessonplans",
    Worksheet: "worksheet",
  };

  if (searchParams.get("module")) {
    dateTime.Module = searchParams.get("module");
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
        //templateId: "57",
        templateId: dateTime.TemplateId,
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
              <H1 color={"notification.darkGray2"}>{t("NOTIFICATION_SENT")}</H1>
              <BodyMedium color={"notification.darkGray2"}>
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
        bg: "notification.cardBg",
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
          {...{
            setPageName,
            students,
            setStudents,
            dateTime,
            setDateTime,
            template,
            setTemplate,
          }}
        />
      )}
      <Actionsheet isOpen={pageName === "Popup"} onClose={() => setPageName()}>
        <Actionsheet.Content
          alignItems={"left"}
          bg={"notification.successAlert"}
        >
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="15px">
              <H2>{t("VIEW_NOTIFICATION")}</H2>
            </Stack>
          </HStack>
        </Actionsheet.Content>
        <Box bg={"notification.white"} width={"100%"}>
          <Box px="5">
            <HStack
              py="5"
              borderBottomWidth="1"
              borderColor={"notification.lightGray2"}
              alignItems="center"
              space="1"
            >
              <IconByName
                _icon={{ size: "16" }}
                name="CheckDoubleLineIcon"
                color={"notification.cardCloseIcon"}
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
              {dateTime?.Template}
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
                _text={{ color: "notification.white" }}
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
