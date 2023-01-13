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
  templateRegistryService,
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
  ScrollView,
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
  template,
  setTemplate,
}) {
  const { t } = useTranslation();
  const [dateTimeData, setDateTimeData] = useState({});
  const [configData, setConfigData] = useState({});
  const [showModalTemplate, setShowModalTemplate] = useState(false);
  const [classData, setClassData] = useState([]);
  const [eTriggers, setETriggers] = useState([]);
  const [templates, setTemplates] = useState([]);
  //const [template, setTemplate] = useState("")
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  const getConfigData = async () => {
    const Response = await getApiConfig();
    setConfigData(Response);
    const communicationChannels = Array.isArray(
      Response["attendance.channels_of_communication"]
    )
      ? Response["attendance.channels_of_communication"]
      : JSON.parse(Response["attendance.channels_of_communication"]);

    // setETriggers([...triggers, "Absent_Today"]);
    setChannels(communicationChannels);
  };

  const getTemplates = async () => {
    const resp = await templateRegistryService.getAll({ tag: dateTime.Event });
    setTemplates(resp);
  };

  const getClassData = async () => {
    const Response = await classRegistryService.getAllData({});
    let GroupWithId = [];
    Response.forEach((e) => {
      GroupWithId = [
        ...GroupWithId,
        { ["title"]: `${e?.name} Sec ${e?.section}`, ["id"]: e.id },
      ];
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

  const checkJSON = (value) => {
    const result = Array.isArray(value) ? value : JSON.parse(value);
    return result;
  };

  const handleTelemetry = (fieldName, value) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Notification-Intaract",
      fieldName: value,
    });
    capture("INTERACT", telemetryData);
  };

  const getTriggerEvents = (moduleName) => {
    const moduleSmall = moduleName.toLowerCase();
    const eventConfig =
      configData[
        `${moduleSmall}.event_triggers_to_send_attendance_notification`
      ];
    const triggers = eventConfig !== undefined ? checkJSON(eventConfig) : [];
    setETriggers(triggers);
  };

  useEffect(() => {
    getConfigData();
    getClassData();
  }, []);

  useEffect(() => {
    getTemplates();
  }, [dateTime.Event]);

  useEffect(() => {
    if (templates.length > 0) {
      setDateTime({
        ...dateTime,
        Template: templates[0].body,
        TemplateId: templates[0].id,
      });
    }
  }, [templates]);

  useEffect(() => {
    if (dateTime.Module) {
      getTriggerEvents(dateTime.Module);
    }
  }, [dateTime.Module]);

  return (
    <Stack space={1} mb="2">
      <FormInput
        {...{ dateTime, setDateTime, dateTimeData, setDateTimeData }}
        data={[
          { name: "Group", data: classData },
          { name: "Channel", data: channels },
          { name: "Module", data: ["Attendance", "Lessonplans", "Worksheet"] },
          { name: "Event", data: eTriggers },
        ]}
      />
      <Box bg="white" p="5">
        <VStack space="2">
          <HStack justifyContent="space-between">
            <Text fontSize="16" fontWeight="600">
              {t("MESSAGE")}
            </Text>
            <Button variant="ghost" onPress={(e) => setShowModalTemplate(true)}>
              <BodyLarge fontSize="14" fontWeight="500" color="button.500">
                {t("USE_ANOTHER_TEMPLATE")}
              </BodyLarge>
            </Button>
          </HStack>
          <BodySmall>{dateTime?.Template}</BodySmall>
        </VStack>
      </Box>
      <Box bg={"notification.white"} p="5">
        <Pressable onPress={(e) => setPageName("RecipientList")}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text>{t("VIEW_RECIPIENTS_LIST")}</Text>
            <IconByName name="ArrowRightSLineIcon" isDisabled />
          </HStack>
        </Pressable>
      </Box>
      <Box
        bg={"notification.white"}
        p="5"
        position="sticky"
        bottom="0"
        shadow={2}
      >
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
            _text={{ color: "notification.white" }}
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
        <Box bg={"notification.white"} width={"100%"}>
          {templates?.map((value, index) => {
            return (
              <Box p="5" key={index}>
                <Pressable
                  key={index}
                  p="5"
                  onPress={(e) => {
                    //setTemplate(value.body)
                    setDateTime({
                      ...dateTime,
                      ["TemplateId"]: value.id,
                      ["Template"]: value.body,
                    });
                  }}
                  bg={value.body === dateTime["Template"] ? "gray.100" : ""}
                >
                  <Text colorScheme="button">{t(value.body)}</Text>
                </Pressable>
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
        <Actionsheet.Content alignItems={"left"} bg="#D9F0FC">
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
        <Box bg="notification.white" width="100%" maxH="80%">
          <ScrollView>
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
                        ? "notification.lightGray2"
                        : dateTimeData.name === "Group" &&
                          dateTime[dateTimeData.name] === value.title
                        ? "notification.lightGray2"
                        : ""
                    }
                  >
                    <Text colorScheme="button">
                      {dateTimeData.name == "Group" ? t(value.title) : t(value)}
                    </Text>
                  </Pressable>
                );
              })}
          </ScrollView>
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
        bg="notification.white"
        p="5"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={"14px"} fontWeight="500">
          {t(`Choose ${item.name}`)}
        </Text>
        <Button
          variant={dateTime[item.name] ? "solid" : "outline"}
          rounded="full"
          px="4"
          py="1"
          _text={{
            textTransform: "capitelize",
            color: dateTime[item.name]
              ? "notification.white"
              : "notification.primary",
          }}
          rightIcon={
            <IconByName
              color={
                dateTime[item.name]
                  ? "notification.white"
                  : "notification.primary"
              }
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
