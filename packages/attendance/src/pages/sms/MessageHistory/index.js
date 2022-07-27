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
import { useParams } from "react-router-dom";
import {
  IconByName,
  capture,
  Layout,
  H3,
  H2,
  H4,
  calendar,
  studentRegistryService,
  overrideColorTheme,
} from "@shiksha/common-lib";
import CalendarBar from "../../../components/CalendarBar/CalendarBar";
import manifest from "../../../manifest.json";
import { sms } from "./assets";
import CalendarComponent from "./Molecule/CalendarComponent";
import Message from "./Molecule/Message";
import colorTheme from "../../../colorTheme";

const colors = overrideColorTheme(colorTheme);

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
      let student = await studentRegistryService.getOne({ id: studentId });
      if (!ignore) {
        setStudentObject(student);
        setSearchSms(sms(student));
      }
    };
    getData();
  }, [studentId]);

  useEffect(() => {
    capture("PAGE");
  }, []);

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
                  color={colors.primary}
                  name="ArrowDownSLineIcon"
                  isDisabled
                />
              }
              onPress={(e) => setShowModal(true)}
            >
              <H3 color={colors.primary}>
                {calendarView === "month"
                  ? t("MONTH_VIEW")
                  : calendarView === "week"
                  ? t("WEEK_VIEW")
                  : t("TODAY_VIEW")}
              </H3>
            </Button>
            <Actionsheet
              isOpen={showModal}
              _backdrop={{ opacity: "0.9", bg: colors.gray }}
            >
              <Actionsheet.Content
                p="0"
                alignItems={"left"}
                bg={colors.studentCardBg}
              >
                <HStack justifyContent={"space-between"}>
                  <Stack p={5} pt={2} pb="25px">
                    <H2>{t("SELECT_VIEW")}</H2>
                  </Stack>
                  <IconByName
                    name="CloseCircleLineIcon"
                    onPress={(e) => setShowModal(false)}
                  />
                </HStack>
              </Actionsheet.Content>

              <Box w="100%" bg={colors.white}>
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
                      borderBottomColor={colors.coolGray}
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
      _subHeader={{ bg: colors.studentCardBg }}
      _footer={footerLinks}
    >
      <VStack space="1">
        <Box bg={colors.white} p="5" py="30">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <H2>{studentObject.fullName}</H2>
          </HStack>
        </Box>
        <Box bg={colors.white}>
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <Box p="5">
              <H2>{t("SEND_MESSAGE")}</H2>
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
            _backdrop={{ opacity: "0.9", bg: colors.gray }}
          >
            <Actionsheet.Content
              p="0"
              alignItems={"left"}
              bg={colors.studentCardBg}
            >
              <HStack justifyContent={"space-between"}>
                <Stack p={5} pt={2} pb="25px">
                  <H2>
                    {smsObject?.status === "Send"
                      ? t("MESSAGE_SENT")
                      : t("MESSAGE_FAILED")}
                  </H2>
                  <H4 color={colors.studentCardText}>{smsObject?.date}</H4>
                </Stack>
                <IconByName
                  name="CloseCircleLineIcon"
                  color={colors.studentCardText}
                  onPress={(e) => setSmsObject({})}
                />
              </HStack>
            </Actionsheet.Content>
            <Box bg={colors.white} w="100%">
              <Message item={smsObject} isDisableRetry />
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
                  _text={{ color: colors.white }}
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
