import {
  capture,
  IconByName,
  Layout,
  Loading,
  H1,
  H2,
  classRegistryService,
  getApiConfig,
  telemetryFactory,
  useWindowSize,
  overrideColorTheme,
  BodyLarge,
  BodySmall,
} from "@shiksha/common-lib";
import moment from "moment";
import {
  HStack,
  Stack,
  Button,
  Text,
  Actionsheet,
  FormControl,
  Input,
  Divider,
  Box,
  Pressable,
  Checkbox,
  VStack,
  Center,
} from "native-base";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function FormNotification({
  footerLinks,
  appName,
  setPageName,
  dateTime,
  setDateTime,
  students,
}) {
  const { t } = useTranslation();
  const [dateTimeData, setDateTimeData] = useState({});
  const [configData, setConfigData] = useState({});
  const [showModalTemplate, setShowModalTemplate] = useState(false);
  const [classData, setClassData] = useState([]);
  const [eTriggers, setETriggers] = useState([]);
  const navigate = useNavigate();

  const getConfigData = async () => {
    const Response = await getApiConfig();
    //setConfigData(Response);
    const triggers = Array.isArray(
      Response["attendance.event_triggers_to_send_attendance_notification"]
    )
      ? Response["attendance.event_triggers_to_send_attendance_notification"]
      : JSON.parse(
          Response["attendance.event_triggers_to_send_attendance_notification"]
        );
    setETriggers([...triggers, "Absent_Today"]);
  };

  const getClassData = async () => {
    const Response = await classRegistryService.getAllData({
      //limit: "",
      filters: {},
    });
    let GroupWithId = [];
    Response.forEach((e) => {
      GroupWithId = [...GroupWithId, { ["title"]: e.title, ["id"]: e.id }];
    });
    setClassData(GroupWithId);
  };

  const notificationFormValidation = (buttontype) => {
    if (
      dateTime.Channel &&
      dateTime.Event &&
      dateTime.Group &&
      dateTime.GroupId &&
      dateTime.Module &&
      buttontype === "sendnow"
    ) {
      setPageName("Popup");
    } else if (
      dateTime.Channel &&
      dateTime.Event &&
      dateTime.Group &&
      dateTime.GroupId &&
      dateTime.Module &&
      buttontype === "sendlater"
    ) {
      navigate("/notification/schedule", {
        state: { ...dateTime, studentCount: students.length },
      });
    } else {
      alert("Please select all the fields before proceeding");
    }
  };

  const handleTelemetry = (fieldName, value) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Notification-Intaract",
      fieldName: value,
    });
    capture("INTERACT", telemetryData);
  };

  useEffect(() => {
    getConfigData();
    getClassData();
  }, []);

  return (
    <Stack space={1} mb="2">
      <FormInput
        {...{ dateTime, setDateTime, dateTimeData, setDateTimeData }}
        data={[
          { name: "Group", data: classData },
          { name: "Channel", data: ["SMS", "WhatsApp"] },
          { name: "Module", data: ["Attendance", "Lessonplans", "Worksheet"] },
          //{ name: "Channel", data: channels },
          //Channels are coming as string from backend instead of an array, hence using hardcode instead of 100
          { name: "Event", data: eTriggers },
        ]}
      />
      <Box bg="white" p="5">
        <VStack space="2">
          <HStack justifyContent="space-between">
            <Text fontSize="16" fontWeight="600">
              {t("MESSAGE")}
            </Text>
            <Button variant="ghost" onPress={(e) => console.log(e)}>
              <BodyLarge fontSize="14" fontWeight="500" color="button.500">
                {t("USE_ANOTHER_TEMPLATE")}
              </BodyLarge>
            </Button>
          </HStack>
          <BodySmall>
            Kindly note your OTP @__123__@. Submission of the OTP will be taken
            as authentication that you have personally verified and overseen the
            distribution of smartphone to the mentioned student ID of your
            school. Thank you! - Samagra Shiksha, Himachal Pradesh
          </BodySmall>
        </VStack>
      </Box>
      <Box bg={colors.white} p="5">
        <Pressable onPress={(e) => setPageName("RecipientList")}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text>{t("VIEW_RECIPIENTS_LIST")}</Text>
            <IconByName name="ArrowRightSLineIcon" isDisabled />
          </HStack>
        </Pressable>
      </Box>
      <Box bg={colors.white} p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          <Button
            flex="1"
            colorScheme="button"
            variant="outline"
            px="5"
            onPress={(e) => {
              notificationFormValidation("sendlater");
            }}
          >
            {t("SEND_LATER")}
          </Button>
          <Button
            flex="1"
            colorScheme="button"
            _text={{ color: colors.white }}
            px="5"
            onPress={(e) => {
              notificationFormValidation("sendnow");
            }}
          >
            {t("REVIEW_AND_SEND_NOW")}
          </Button>
        </Button.Group>
      </Box>
      <Actionsheet
        isOpen={showModalTemplate}
        onClose={() => setShowModalTemplate(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="2px">
              <H2 fontWeight="500">{t("SELECT_TEMPLATE")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setShowModalTemplate(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg={colors.white} width={"100%"}>
          {[
            "Worksheets help the kids in exploring multiple concepts They develop fine motor skills, logical thinking.",
            "Hello Mr. Rajesh Sharma, this is to inform you that your ward Sheetal has been present all days this week in sch...",
            "Learners should be able to use strategies that will support their understanding during their own reading",
            "Worksheets help the kids in exploring multiple concepts They develop fine motor skills, logical thinking..",
          ].map((value, index) => {
            return (
              <Box p="5" key={index}>
                <Checkbox
                  colorScheme="button"
                  borderColor={colors.primary}
                  borderRadius="0"
                >
                  {value}
                </Checkbox>
              </Box>
            );
          })}
          <Box p="5">
            <Button
              colorScheme="button"
              _text={{ color: "white" }}
              onPress={(e) => setShowModalTemplate(false)}
            >
              {t("CONTINUE")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
      <Actionsheet
        isOpen={dateTimeData?.name}
        onClose={() => setDateTimeData({})}
      >
        <Actionsheet.Content alignItems={"left"} bg="classCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="2px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t(`Select ${dateTimeData?.name}`)}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="classCard.900"
              onPress={(e) => setDateTimeData({})}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"}>
          {dateTimeData?.data &&
            dateTimeData.data.map((value, index) => {
              return (
                <Pressable
                  key={index}
                  p="5"
                  onPress={(e) => {
                    // { dateTimeData.name == "Group" ? setDateTime({ ...dateTime, [dateTimeData.name]: { ["id"]: value.id, ["title"]: value.title } }) : setDateTime({ ...dateTime, [dateTimeData.name]: value }) }
                    {
                      dateTimeData.name == "Group"
                        ? setDateTime({
                            ...dateTime,
                            [dateTimeData.name]: value.title,
                            ["GroupId"]: value.id,
                          })
                        : setDateTime({
                            ...dateTime,
                            [dateTimeData.name]: value,
                          });
                    }
                    handleTelemetry(dateTimeData.name, value);
                  }}
                  bg={
                    dateTime[dateTimeData.name] === value
                      ? "gray.100"
                      : dateTimeData.name === "Group" &&
                        dateTime[dateTimeData.name] === value.title
                      ? "gray.100"
                      : ""
                  }
                >
                  <Text colorScheme="button">
                    {dateTimeData.name == "Group" ? t(value.title) : t(value)}
                  </Text>
                </Pressable>
              );
            })}
          <Box p="5">
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
        </Box>
      </Actionsheet>
    </Stack>
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
        bg="white"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={"14px"} fontWeight="500">
          {t(`Choose ${item.name}`)}
        </Text>
        <Button
          {...(item?.buttonVariant
            ? { variant: item.buttonVariant }
            : { _text: { color: "black" } })}
          rounded="full"
          colorScheme="button"
          px="5"
          py="1"
          bg="viewNotification.500"
          _text={{ textTransform: "capitelize" }}
          rightIcon={
            <IconByName
              color={item?.buttonVariant ? "button.500" : "button.500"}
              name="ArrowDownSLineIcon"
              isDisabled
            />
          }
          onPress={(e) => {
            setDateTimeData(item);
          }}
        >
          {dateTime[item.name]
            ? t(dateTime[item.name])
            : `Select ${t(item.name)}`}
        </Button>
      </HStack>
    ))
  );
};
