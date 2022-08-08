import {
  H2,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
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

import ClassCollapsibleCard from "../../components/Reports/AttendanceReports/ClassCollapsibleCard";
import CalendarBar from "../../components/CalendarBar";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function AttendanceReportDashboard() {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState([{}, {}, {}, {}]);
  const [teacherDetailModal, setTeacherDetailModal] = useState(false);
  const [calendarView, setCalendarView] = useState();
  const [weekPage, setWeekPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [weekDays, setWeekDays] = useState([]);

  return (
    <Layout
      _header={{
        title: "Attendance Reports",
        _heading: { color: colors.white },
      }}
      _appBar={{
        languages: ["en"],
        isEnableSearchBtn: true,
      }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "VISITS",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/my-visits",
            routeparameters: {},
          },
          {
            title: "LEARNING",
            icon: "LightbulbFlashLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "PROFILE",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
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
                  _backdrop={{ opacity: "0.9", bg: colors.lightGray }}
                >
                  <Actionsheet.Content
                    p="0"
                    alignItems={"left"}
                    bg={colors.lightGray}
                  >
                    <HStack justifyContent={"space-between"}>
                      <Stack p={5} pt={2} pb="15px">
                        <H2>{t("SELECT_VIEW")}</H2>
                      </Stack>
                      <IconByName
                        name="CloseCircleLineIcon"
                        onPress={(e) => setShowModal(false)}
                        color={colors.cheveron}
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
                          borderBottomColor={"coolGray.500"}
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
            <ClassCollapsibleCard />
            <ClassCollapsibleCard />
            <ClassCollapsibleCard />
          </VStack>
        </VStack>
      </Box>
    </Layout>
  );
}
