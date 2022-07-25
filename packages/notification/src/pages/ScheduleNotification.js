import {
  capture,
  IconByName,
  Layout,
  Loading,
  H1,
  telemetryFactory,
  useWindowSize,
  H2,
  BodyLarge,
  BodyMedium,
  H3,
  overrideColorTheme,
  notificationRegistryService,
  configRegistryService,
} from "@shiksha/common-lib";
import moment from "moment";
import {
  HStack,
  Stack,
  Button,
  Text,
  Actionsheet,
  Box,
  Pressable,
  Checkbox,
  VStack,
  ScrollView,
  Center,
} from "native-base";
import React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
import { useLocation } from "react-router-dom";

export default function ScheduleNotification({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [dateTime, setDateTime] = useState({});
  const [dateTimeData, setDateTimeData] = useState({});
  const [recurring, setRecurring] = useState(false);
  const [recurringData, setRecurringData] = useState([]);
  const [showSummaryModal, setShowSummaryModal] = useState();
  const [success, setSuccess] = useState(false);
  const [width, height] = useWindowSize();
  const location = useLocation();

  const scheduleNotificationValidation = () => {
    if (dateTime.Date && dateTime.Time && dateTime.Month) {
      setShowSummaryModal({ ...dateTime, name: "View Summary" });
    } else {
      alert("Please select all the fields before proceeding");
    }
  };

  const to24HrsFormat = (time) => {
    if (time) {
      let hour = time.split(" ")[0].split(":")[0];
      let mins = time.split(" ")[0].split(":")[1];
      let code = time.split(" ")[1];

      let newTime = "";
      if (code == "PM") {
        let newHour = Number(hour) + 12;
        newTime = newHour + ":" + mins;
      } else {
        newTime = time.split(" ")[0];
      }
      return newTime;
    }
  };

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

  const NotificationSendRequest = async () => {
    let ist = new Date(
      new Date().getFullYear(),
      dateTime.Month.substring(0, 2),
      dateTime.Date,
      to24HrsFormat(dateTime.Time).substring(0, 2),
      dateTime.Time.substring(3, 5)
    );
    let utc = moment.utc(ist).format("YYYY-MM-DD HH:mm:ss ");
    let utcMin = utc.slice(14, 16);
    let utcHrs = utc.slice(11, 13);
    let utcDay = utc.slice(8, 10);
    let utcMon = utc.slice(5, 7);
    const respp =
      await notificationRegistryService.sendScheduledNotificationPost({
        module: NotificationObject[location.state.Module],
        eventTrigger: NotificationObject[location.state.Event],
        templateId: "57",
        groupId: location.state.GroupId,
        channel: location.state.Channel,
        senderId: localStorage.getItem("id"),
        month: parseInt(utcMon) - 1,
        date: `${new Date().getFullYear()}/${parseInt(utcMon) - 1}/${utcDay}`,
        hours: utcHrs,
        minutes: utcMin,
        taskName: Math.random().toString(27).substring(2, 8),
      });
    return respp;
  };

  const handleTelemetry = () => {
    NotificationSendRequest();
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Notification-End",
      tag: "Send Later",
      studentCount: students.length,
      date: new Date().toISOString().slice(0, 10),
    });
    capture("END", telemetryData);
  };

  // useEffect(() => {
  //   setRecurringData([
  //     { name: "REPEAT", data: ["Daily", "Weekly", "Monthly"] },
  //   ]);
  // }, [recurring]);

  useEffect(() => {
    let data = {};
    setDateTime({ ...dateTime, FREQUENCY: "", Time: "" });
    if (dateTime?.REPEAT === "Weekly") {
      data = { name: "Frequency", data: ["1", "2", "3"] };
    } else if (dateTime?.REPEAT === "Monthly") {
      data = {
        name: "Frequency",
        data: [
          "Monthly on day 28",
          "Monthly on the fourth thursday",
          "Monthly on last thursday",
        ],
      };
    } else {
      data = { name: "Time", data: ["3:00PM", "4:00PM", "5:00PM"] };
    }
    setRecurringData([
      { name: "Recurring", data: ["Daily", "Weekly", "Monthly"] },
      data,
    ]);
  }, [dateTime?.REPEAT]);

  if (success) {
    return (
      <Layout _appBar={{ languages: manifest.languages }}>
        <Loading
          width={width - 60}
          height={height - 100}
          icon={<IconByName name="MailLockLineIcon" _icon={{ size: 100 }} />}
          message={
            <Center mx="5">
              <H1 color="gray.500">{t("NOTIFICATION_SCHEDULED")}</H1>
              <BodyMedium textAlign="center" color="gray.500">
                {`Attendance Notification has been scheduled for ${new Date().getFullYear()}/${
                  dateTime.Month ? dateTime?.Month.substring(0, 2) : ""
                }/${dateTime.Date ? dateTime?.Date : ""} at ${
                  dateTime.Time ? dateTime?.Time : " "
                }`}
                {/* /${dateTime?.Month.substring(0, 2)}/${dateTime?.Date} at ${dateTime?.Time} */}
              </BodyMedium>
              {/* <Button
                colorScheme="button"
                variant="outline"
                onPress={(e) => {
                  setRecurringData([]);
                  setRecurring(false);
                  setSuccess(false);
                }}
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
        title: t("SCHEDULE_NOTIFICATION"),
        subHeading: moment().format("hh:mm A"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("PICK_DATE_AND_TIME")}
      _subHeader={{
        bg: colors.cardBg,
        _text: {
          fontSize: "16px",
          fontWeight: "500",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
      <Stack space={1} mb="2">
        <FormInput
          {...{ dateTime, setDateTime, dateTimeData, setDateTimeData }}
          data={[
            {
              name: "Date",
              data: [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "29",
                "30",
                "31",
              ],
            },
            {
              name: "Month",
              data: [
                "01. January",
                "02. February",
                "03. March",
                "04. April",
                "05. May",
                "06. June",
                "07. July",
                "08. August",
                "09. September",
                "10. October",
                "11. November",
                "12. December",
              ],
            },
            {
              name: "Time",
              buttonVariant: "outline",
              data: [
                "09.00 AM",
                "09.30 AM",
                "10.00 AM",
                "10.30 AM",
                "11.00 AM",
                "11.30 AM",
                "12.00 PM",
                "12.30 PM",
                "01.00 PM",
                "01.30 PM",
                "02.00 PM",
                "02.30 PM",
                "03.00 PM",
                "03.30 PM",
                "04.00 PM",
                "04.30 PM",
                "05.00 PM",
                "05.30 PM",
                "06.00 PM",
              ],
            },
          ]}
        />
        {/*<Box bg={colors.white} p="5">
          <Checkbox
            isChecked={recurring}
            colorScheme="button"
            borderColor={colors.primary}
            borderRadius="0"
            onChange={(e) => setRecurring(!recurring)}
          >
            {t("THIS_IS_A_RECURRING_NOTIFICATION")}
          </Checkbox>
        </Box> */}
        {recurring ? (
          <FormInput
            {...{ dateTime, setDateTime, dateTimeData, setDateTimeData }}
            data={recurringData}
          />
        ) : (
          ""
        )}
        <Box bg={colors.white} p="5" position="sticky" bottom="0" shadow={2}>
          <Button.Group>
            <Button
              colorScheme="button"
              px="5"
              mr="5px"
              flex="1"
              variant="outline"
            >
              {t("CANCEL")}
            </Button>
            <Button
              colorScheme="button"
              _text={{ color: "white" }}
              px="5"
              ml="5px"
              flex="1"
              onPress={() => scheduleNotificationValidation()}
            >
              {t("VIEW_SUMMARY")}
            </Button>
          </Button.Group>
        </Box>
        <Actionsheet
          isOpen={dateTimeData?.name}
          onClose={() => setDateTimeData({})}
        >
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2>{t(`Select ${dateTimeData?.name}`)}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={(e) => setDateTimeData({})}
              />
            </HStack>
          </Actionsheet.Content>
          <ScrollView maxH="80%" bg={colors.white} width={"100%"}>
            {dateTimeData?.data &&
              dateTimeData.data.map((value, index) => {
                return (
                  <Pressable
                    key={index}
                    p="5"
                    onPress={(e) => {
                      setDateTime({ ...dateTime, [dateTimeData.name]: value });
                    }}
                    bg={
                      dateTime[dateTimeData.name] === value
                        ? colors.coolGray
                        : ""
                    }
                  >
                    <Text colorScheme="button">{value}</Text>
                  </Pressable>
                );
              })}
            <Box p="5" position="sticky" bottom="00">
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => {
                  setDateTimeData({});
                }}
              >
                {t("CONTINUE")}
              </Button>
            </Box>
          </ScrollView>
        </Actionsheet>
        <Actionsheet
          isOpen={showSummaryModal?.name}
          onClose={() => setShowSummaryModal({})}
        >
          <Actionsheet.Content
            alignItems={"left"}
            bg={colors.scheduleNotificationBg}
          >
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={1} pb="15px">
                <H2>{showSummaryModal?.name}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={(e) => setShowSummaryModal({})}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={colors.white} width={"100%"}>
            <Box px="5" pt="5">
              <HStack alignItems="center" space="1">
                <IconByName
                  _icon={{ size: "16" }}
                  name="CheckDoubleLineIcon"
                  color={colors.cardCloseIcon}
                  isDisabled
                />
                <BodyLarge>
                  {t(`Sending to ${location.state.studentCount} parents`)}
                </BodyLarge>
              </HStack>
            </Box>
            <Box
              px="5"
              pt="5"
              pb="5"
              borderBottomWidth="1"
              borderColor={colors.lightGray}
            >
              <HStack alignItems="center" space="1">
                <IconByName
                  _icon={{ size: "16" }}
                  name="TimeLineIcon"
                  color={colors.cardCloseIcon}
                  isDisabled
                />
                <BodyLarge>
                  {t(
                    `Scheduled for ${new Date().getFullYear()}/${
                      dateTime.Month ? dateTime?.Month.substring(0, 2) : ""
                    }/${dateTime.Date ? dateTime?.Date : ""} at ${
                      dateTime.Time ? dateTime?.Time : " "
                    }`
                  )}
                  {/* / ${dateTime?.Month.substring(0, 2)}/${dateTime?.Date} at ${dateTime?.Time} */}
                </BodyLarge>
              </HStack>
            </Box>
            <VStack p="5" space={6}>
              <H3>{t("NOTICE")}</H3>
              <BodyMedium textTransform={"inherit"}>
                Kindly Note Your OTP @__123__@. Submission Of The OTP Will Be
                Taken As Authentication That You Have Personally Verified And
                Overseen The Distribution Of Smartphone To The Mentioned Student
                ID Of Your School. Thank You! - Samagra Shiksha, Himachal
                Pradesh View Recipient List
              </BodyMedium>
            </VStack>
            <Box p="5">
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => {
                  NotificationSendRequest();
                  setSuccess(true);
                  setShowSummaryModal({});
                  handleTelemetry();
                }}
              >
                {t("SCHEDULE_MESSAGE")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
      </Stack>
    </Layout>
  );
}

const FormInput = ({
  data,
  dateTime,
  setDateTime,
  dateTimeData,
  setDateTimeData,
}) => {
  const { t } = useTranslation();
  return (
    data &&
    data.map((item, index) => (
      <HStack
        key={index}
        bg={colors.white}
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <BodyMedium>{t(item.name)}</BodyMedium>
        <Button
          {...(item?.buttonVariant
            ? { variant: item.buttonVariant }
            : { _text: { color: "black" } })}
          rounded="full"
          colorScheme="button"
          px="5"
          bg={colors.notificationCardBg}
          _text={{ textTransform: "capitelize" }}
          rightIcon={
            <IconByName
              color={item?.buttonVariant ? colors.primary : colors.primary}
              name="ArrowDownSLineIcon"
              isDisabled
            />
          }
          onPress={(e) => {
            setDateTimeData(item);
          }}
        >
          {dateTime[item.name] ? dateTime[item.name] : `Select ${t(item.name)}`}
        </Button>
      </HStack>
    ))
  );
};
