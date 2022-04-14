import moment from "moment";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TouchableHighlight } from "react-native-web";
import { useParams } from "react-router-dom";
import { IconByName, Layout } from "@shiksha/common-lib";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";
import { calendar } from "../../components/AttendanceComponent";
import CalendarBar from "../../components/CalendarBar";
import manifest from "../../manifest.json";

export default function MessageHistory({ footerLinks }) {
  const { t } = useTranslation();
  const [weekPage, setWeekPage] = useState(0);
  const [calendarView, setCalendarView] = useState();
  const { studentId } = useParams();
  const [studentObject, setStudentObject] = useState({});
  const [search, setSearch] = useState();
  const [searchSms, setSearchSms] = useState([]);
  const [smsObject, setSmsObject] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (!ignore) {
        setWeekDays(calendar(weekPage, calendarView));
      }
    };
    getData();
  }, [weekPage, calendarView]);

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      let student = await studentServiceRegistry.getOne({ id: studentId });
      if (!ignore) {
        setStudentObject(student);
        setSearchSms([
          {
            status: "Send",
            type: "Present",
            date: moment().add(-1, "days").format("Y-MM-DD"),
            message:
              "Hello Mr. " +
              student.fathersName +
              ", this is to inform you that your ward " +
              student.firstName +
              " is present in school on Wednesday, 12th of January 2022.",
          },
          {
            status: "Failed",
            type: "Present",
            date: moment().add(-2, "days").format("Y-MM-DD"),
            message:
              "Hello Mr. " +
              student.fathersName +
              ", this is to inform you that your ward " +
              student.firstName +
              " is absent in school on Wednesday, 12th of January 2022.",
          },
          {
            status: "Failed",
            type: "Absent",
            date: moment().add(-3, "days").format("Y-MM-DD"),
            message:
              "Hello Mr. " +
              student.fathersName +
              ", this is to inform you that your ward " +
              student.firstName +
              " is absent in school on Wednesday, 12th of January 2022.",
          },
          {
            status: "Send",
            type: "Absent",
            date: moment().add(-6, "days").format("Y-MM-DD"),
            message:
              "Hello Mr. " +
              student.fathersName +
              ", this is to inform you that your ward " +
              student.firstName +
              " is present in school on Wednesday, 12th of January 2022.",
          },
        ]);
      }
    };
    getData();
  }, [studentId]);

  return (
    <Layout
      _appBar={{
        isEnableSearchBtn: true,
        setSearch: setSearch,
        search: search,
        languages: manifest.languages,
      }}
      _header={{
        title: t("MESSAGE_HISTORY"),
      }}
      subHeader={
        <HStack space="4" justifyContent="space-between" alignItems="center">
          <CalendarBar
            view={calendarView}
            setPage={setWeekPage}
            page={weekPage}
            _box={{ p: 0, bg: "transparent" }}
          />
          <Stack>
            <Button
              rounded={"full"}
              colorScheme="button"
              variant="outline"
              bg="button.100"
              rightIcon={
                <IconByName
                  color="button.500"
                  name="ArrowDownSLineIcon"
                  isDisabled
                />
              }
              onPress={(e) => setShowModal(true)}
            >
              <Text color="button.500" fontSize="14" fontWeight="500">
                {calendarView === "month"
                  ? t("MONTH_VIEW")
                  : calendarView === "week"
                  ? t("WEEK_VIEW")
                  : t("TODAY_VIEW")}
              </Text>
            </Button>
            <Actionsheet
              isOpen={showModal}
              _backdrop={{ opacity: "0.9", bg: "gray.500" }}
            >
              <Actionsheet.Content
                p="0"
                alignItems={"left"}
                bg="studentCard.500"
              >
                <HStack justifyContent={"space-between"}>
                  <Stack p={5} pt={2} pb="25px">
                    <Text fontSize="16px" fontWeight={"600"}>
                      {t("SELECT_VIEW")}
                    </Text>
                  </Stack>
                  <IconByName
                    name="CloseCircleLineIcon"
                    onPress={(e) => setShowModal(false)}
                  />
                </HStack>
              </Actionsheet.Content>

              <Box w="100%" bg="white">
                {[
                  { name: t("TODAY_VIEW"), value: "day" },
                  { name: t("WEEK_VIEW"), value: "week" },
                  { name: t("MONTH_VIEW"), value: "monthInDays" },
                  { name: t("CHOOSE_DATE"), value: "date" },
                ].map((item, index) => {
                  return (
                    <Pressable
                      key={index}
                      p="5"
                      borderBottomWidth={1}
                      borderBottomColor="coolGray.100"
                      onPress={(e) => {
                        setCalendarView(item.value);
                        setShowModal(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </Pressable>
                  );
                })}
              </Box>
            </Actionsheet>
          </Stack>
        </HStack>
      }
      _subHeader={{ bg: "studentCard.500" }}
      _footer={footerLinks}
    >
      <VStack space="1">
        <Box bg="white" p="5" py="30">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <Text fontSize="16" fontWeight="600">
              {studentObject.fullName}
            </Text>
          </HStack>
        </Box>
        <Box bg="white">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <Box p="5">
              <Text fontSize="16" fontWeight="600">
                {t("SEND_MESSAGE")}
              </Text>
            </Box>
          </HStack>
          <VStack>
            <CalendarComponent
              monthDays={weekDays}
              student={studentObject}
              type={calendarView}
              sms={searchSms}
              setSmsObject={setSmsObject}
            />
          </VStack>
          <Actionsheet
            isOpen={smsObject?.status}
            _backdrop={{ opacity: "0.9", bg: "gray.500" }}
          >
            <Actionsheet.Content p="0" alignItems={"left"} bg="studentCard.500">
              <HStack justifyContent={"space-between"}>
                <Stack p={5} pt={2} pb="25px">
                  <Text fontSize="16px" fontWeight={"600"}>
                    {smsObject?.status === "Send"
                      ? t("MESSAGE_SENT")
                      : t("MESSAGE_FAILED")}
                  </Text>
                  <Text fontSize="12px" fontWeight="500" color="#5B7E5F">
                    {smsObject?.date}
                  </Text>
                </Stack>
                <IconByName
                  name="CloseCircleLineIcon"
                  onPress={(e) => setSmsObject({})}
                />
              </HStack>
            </Actionsheet.Content>
            <Box bg="white" w="100%">
              <Massage item={smsObject} isDisableRetry />
              <Button.Group p="5">
                <Button
                  flex={1}
                  variant="outline"
                  colorScheme="button"
                  onPress={(e) => setShowModal(true)}
                >
                  {smsObject?.status === "Send" ? t("RESEND") : t("RETRY")}
                </Button>
                <Button
                  flex={1}
                  colorScheme="button"
                  onPress={(e) => {
                    console.log(e);
                  }}
                  _text={{ color: "white" }}
                >
                  {t("DONE")}
                </Button>
              </Button.Group>
            </Box>
          </Actionsheet>
        </Box>
      </VStack>
    </Layout>
  );
}

const Massage = ({ item, isDisableRetry }) => {
  const { t } = useTranslation();
  return (
    <Box p="5" borderBottomWidth="1" borderBottomColor="gray.100">
      <VStack space="2">
        <HStack space="1" justifyContent="space-between">
          <HStack space="1" alignItems="center">
            <IconByName
              isDisabled
              name={
                item.status === "Send" ? "CheckDoubleLineIcon" : "SpamLineIcon"
              }
              color={item.status === "Send" ? "present.500" : "absent.500"}
            />
            <Text fontSize="14px" fontWeight="500">
              {item.status === "Send" ? t("SENT") : t("FAILED")}
            </Text>
          </HStack>
          {item.status !== "Send" && !isDisableRetry ? (
            <Button variant="ghost" colorScheme="button" py="0">
              {t("RETRY")}
            </Button>
          ) : (
            ""
          )}
        </HStack>
        <Text fontSize="12px" fontWeight="500" color="#B5B5C8">
          {moment(item.date).format("Do MMM, hh:ssa")}
        </Text>
        <Text fontSize="14px" fontWeight="400">
          {item.message}
        </Text>
      </VStack>
    </Box>
  );
};

const CalendarComponent = ({
  monthDays,
  type,
  isIconSizeSmall,
  sms,
  setSmsObject,
  student,
  loding,
  _weekBox,
}) => {
  if (type === "month") {
    return monthDays.map((week, index) => (
      <HStack
        key={index}
        justifyContent="space-around"
        alignItems="center"
        borderBottomWidth={
          monthDays.length > 1 && monthDays.length - 1 !== index ? "1" : "0"
        }
        borderBottomColor={"coolGray.300"}
        p={"2"}
        {...(_weekBox?.[index] ? _weekBox[index] : {})}
      >
        {week.map((day, subIndex) => {
          let isToday = moment().format("Y-MM-DD") === day.format("Y-MM-DD");
          let dateValue = day.format("Y-MM-DD");
          let smsItem = sms
            .slice()
            .reverse()
            .find((e) => e.date === dateValue);
          let smsIconProp = !isIconSizeSmall
            ? {
                _box: { py: 2, minW: "46px", alignItems: "center" },
                status: "CheckboxBlankCircleLineIcon",
              }
            : {};
          if (smsItem?.type && smsItem?.type === "Present") {
            smsIconProp = {
              ...smsIconProp,
              status: smsItem?.type,
              type: smsItem?.status,
            };
          } else if (smsItem?.type && smsItem?.type === "Absent") {
            smsIconProp = {
              ...smsIconProp,
              status: smsItem?.type,
              type: smsItem?.status,
            };
          } else if (day.day() === 0) {
            smsIconProp = { ...smsIconProp, status: "Holiday" };
          } else if (isToday) {
            smsIconProp = { ...smsIconProp, status: "Today" };
          } else if (moment().diff(day, "days") > 0) {
            smsIconProp = { ...smsIconProp, status: "Unmarked" };
          }

          return (
            <VStack
              key={subIndex}
              alignItems="center"
              borderWidth={isToday ? "1" : ""}
              borderColor={isToday ? "button.500" : ""}
              rounded="lg"
              opacity={
                type !== "month" && day.day() !== 0
                  ? 1
                  : day.day() === 0
                  ? 0.3
                  : day.format("M") !== moment().format("M")
                  ? 0.3
                  : 1
              }
            >
              <Text
                key={subIndex}
                pt={
                  monthDays.length > 1 && index ? 0 : !isIconSizeSmall ? 2 : 0
                }
                textAlign="center"
              >
                {!isIconSizeSmall ? (
                  <VStack alignItems={"center"}>
                    {index === 0 ? (
                      <Text pb="1" color={"attendanceCardText.400"}>
                        {day.format("ddd")}
                      </Text>
                    ) : (
                      ""
                    )}
                    <Text color={"attendanceCardText.500"}>
                      {day.format("DD")}
                    </Text>
                  </VStack>
                ) : (
                  <HStack alignItems={"center"} space={1}>
                    <Text>{day.format("dd")}</Text>
                    <Text>{day.format("D")}</Text>
                  </HStack>
                )}
              </Text>
              <TouchableHighlight
                onPress={(e) => setSmsObject(smsItem)}
                // onLongPress={(e) => {
                //   console.log({ e });
                // }}
              >
                <Box alignItems="center">
                  {loding && loding[dateValue + student.id] ? (
                    <GetIcon
                      {...smsIconProp}
                      status="Loader4LineIcon"
                      color={"button.500"}
                      isDisabled
                      _icon={{ _fontawesome: { spin: true } }}
                    />
                  ) : (
                    <GetIcon {...smsIconProp} />
                  )}
                </Box>
              </TouchableHighlight>
            </VStack>
          );
        })}
      </HStack>
    ));
  } else {
    return sms.map((item, index) => (
      <Pressable key={index} onPress={(e) => setSmsObject(item)}>
        <Massage key={index} item={item} />
      </Pressable>
    ));
  }
};

export const GetIcon = ({ status, _box, color, _icon, type }) => {
  let icon = <></>;
  let iconProps = { fontSize: "xl", isDisabled: true, ..._icon };
  switch (status) {
    case "Present":
      icon = (
        <Box {..._box} color={color ? color : "present.500"}>
          <IconByName
            name={type === "Send" ? "MailFillIcon" : "MailForbidFillIcon"}
            p="5px"
            rounded="full"
            _icon={{ size: "14" }}
            bg={status.toLowerCase() + ".100"}
            {...iconProps}
          />
        </Box>
      );
      break;
    case "Absent":
      icon = (
        <Box {..._box} color={color ? color : "absent.500"}>
          <IconByName
            name={type === "Send" ? "MailFillIcon" : "MailForbidFillIcon"}
            p="5px"
            rounded="full"
            _icon={{ size: "14" }}
            bg={status.toLowerCase() + ".100"}
            {...iconProps}
          />
        </Box>
      );
      break;
    case "Holiday":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.100"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Unmarked":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.500"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Today":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.500"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    default:
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.400"}>
          <IconByName name={status} {...iconProps} />
        </Box>
      );
      break;
  }
  return icon;
};
