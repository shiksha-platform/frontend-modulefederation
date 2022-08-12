import {
  BodyLarge,
  H2,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  HStack,
  Text,
  VStack,
  Button,
  Actionsheet,
  Stack,
  Divider,
  Avatar,
  Pressable,
} from "native-base";

import ClassSectionCollapsibleCard from "../../components/Reports/AttendanceReports/ClassSectionCollapsibleCard";
import CalendarBar from "../../components/CalendarBar";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function AttendanceReportDashboard({ footerLinks }) {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState([{}, {}, {}, {}]);
  const [teacherDetailModal, setTeacherDetailModal] = useState(false);
  const [calendarView, setCalendarView] = useState();
  const [weekPage, setWeekPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [weekDays, setWeekDays] = useState([]);

  const [teacherlist, setTeacherList] = useState([]);

  React.useEffect(() => {
    setTeacherList([
      {
        id: 1,
        name: "Rahul",
        class: "VI A",
      },
      {
        id: 2,
        name: "Rahul",
        class: "VI A",
      },
      {
        id: 3,
        name: "Rahul",
        class: "VI A",
      },
    ]);
  }, []);

  return (
    <Layout
      _header={{
        title: "Class I Attendance Reports",
        _heading: { color: "white" },
      }}
      _appBar={{
        languages: ["en"],
        isEnableSearchBtn: true,
      }}
      _footer={footerLinks}
    >
      <Box p={6}>
        <VStack space={6}>
          <Box>
            <HStack
              space="4"
              justifyContent="space-between"
              alignItems="center"
            >
              <CalendarBar
                view={calendarView}
                setPage={setWeekPage}
                page={weekPage}
                _box={{ p: 0, bg: "transparent" }}
              />
              <Stack>
                <Button
                  rightIcon={
                    <IconByName name="ArrowDownSLineIcon" isDisabled />
                  }
                  onPress={(e) => setShowModal(true)}
                >
                  <>
                    {calendarView === "month"
                      ? t("MONTH VIEW")
                      : calendarView === "week"
                      ? t("WEEK VIEW")
                      : t("TODAY VIEW")}
                  </>
                </Button>
                <Actionsheet
                  isOpen={showModal}
                  _backdrop={{ opacity: "0.9", bg: "#ccc" }}
                >
                  <Actionsheet.Content p="0" alignItems={"left"} bg={"#ccc"}>
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

                  <Box w="100%" bg={"white"}>
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
                          borderBottomColor={"schools.gray"}
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
          </Box>
          <VStack space={6}>
            <ClassSectionCollapsibleCard />
            <ClassSectionCollapsibleCard />
            <ClassSectionCollapsibleCard />
          </VStack>
        </VStack>
      </Box>

      <Actionsheet
        isOpen={teacherDetailModal}
        onClose={() => setTeacherDetailModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={"schools.lightGray"}>
          <HStack justifyContent={"space-between"} alignItems="center">
            <Stack p={5} pt={2} pb="15px">
              <Box>
                <HStack alignItems="center" space={3}>
                  <Avatar
                    size="48px"
                    borderRadius="md"
                    source={{
                      uri: "https://via.placeholder.com/50x50.png",
                    }}
                  />
                  <VStack>
                    <H3
                      color={"schools.bodyText"}
                      _dark={{
                        color: "warmGray.50",
                      }}
                    >
                      Rahul
                    </H3>
                    <BodyLarge color={"schools.gray"}>
                      Class Teacher: VI A
                    </BodyLarge>
                  </VStack>
                </HStack>
              </Box>
            </Stack>
            <Stack pb="15px">
              <IconByName
                name="CloseCircleLineIcon"
                color={"schools.primary"}
                onPress={() => setTeacherDetailModal(false)}
              />
            </Stack>
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={"schools.white"}>
          <VStack space={6}>
            <Box>
              <H3 color={"schools.gray"}>Designation</H3>
              <BodyLarge>Assistant Officer</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Qualifications</H3>
              <BodyLarge>B.Com. Hons</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Phone</H3>
              <BodyLarge>+91 1234 567 890</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Date of Joining</H3>
              <BodyLarge>10 Aug, 2013</BodyLarge>
            </Box>
          </VStack>
        </Box>
      </Actionsheet>
    </Layout>
  );
}
