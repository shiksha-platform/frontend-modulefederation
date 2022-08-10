import { Collapsible, H2, Layout, BodyLarge, H3 } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import {
  Box,
  HStack,
  Text,
  VStack,
  Divider,
  Avatar,
  Spacer,
  Pressable,
} from "native-base";
import TeacherTile from "../components/TeacherTile";
import DayWiseBar from "../components/DayWiseBar";
import moment from "moment";

const weekDates = (currentDate = moment()) => {
  let weekStart = currentDate.clone().startOf("isoWeek");
  let days = [];
  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days"));
  }
  return days;
};

export default function TeacherVisitReport({ footerLinks }) {
  const { t } = useTranslation();
  const [teacherlist, setTeacherList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [activeDate, setActiveDate] = React.useState();

  const weekDateArray = weekDates();

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

  React.useEffect(() => {
    let date = moment().add(page, "days");
    changeView(date);
    // setTimeTables(timeTable);
    // setCompare();
  }, [page]);

  const changeView = (date) => {
    // let calendarApi = calendarRef.current.getApi();
    setActiveDate(date);
    // calendarApi.changeView(
    //   "timeGridDay",
    //   date.format(momentDateFormats.mm_mm_yyy)
    // );
  };

  return (
    <Layout
      _header={{
        title: (
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
                <Text color={"schools.white"} fontSize={"xs"}>
                  Past Visit Records
                </Text>
                <Text color={"schools.white"} bold>
                  Mr. Dhananjay Tripathi
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Box>
        ),
        _heading: { color: "white" },
      }}
      _appBar={{ languages: ["en"] }}
      _footer={footerLinks}
    >
      <Collapsible
        defaultCollapse={true}
        header={
          <Box py={4}>
            <H2>Past Visit Details</H2>
          </Box>
        }
      >
        <Divider />
        <Box>
          <DayWiseBar
            _box={{ p: 0, bg: "transparent" }}
            {...{ page, setPage }}
          />
        </Box>
        <Box p="5">
          <HStack justifyContent="space-around" alignItems="center">
            {weekDateArray.map((date, key) => {
              let isToday = activeDate?.format("DD") === date?.format("DD");
              return (
                <Pressable
                  onPress={(e) =>
                    setPage(date.format("DD") - moment().format("DD"))
                  }
                  key={key}
                >
                  <Box
                    bg={isToday ? "schools.primary" : ""}
                    px="3"
                    py="10px"
                    rounded="8px"
                  >
                    <VStack alignItems="center" space="2">
                      <BodyLarge color={isToday ? "schools.white" : "#999999"}>
                        {date.format("ddd")}
                      </BodyLarge>
                      <BodyLarge
                        color={isToday ? "schools.white" : "schools.bodyText"}
                      >
                        {date.format("DD")}
                      </BodyLarge>
                    </VStack>
                  </Box>
                </Pressable>
              );
            })}
          </HStack>
        </Box>

        <Box py={4}>
          <VStack space={8}>
            <Box>
              <H3 color={"schools.bodyText"}>
                Q1. Is the teacher aware of nipun lakshyas for their respective
                subejct & grades?
              </H3>
              <BodyLarge>Whiteboard</BodyLarge>
            </Box>

            <Box>
              <H3 color={"schools.bodyText"}>
                Q2. Does the classroom have NIPUN Lakshya charts pasted on
                walls?
              </H3>
              <BodyLarge>Answer as in ODK</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.bodyText"}>
                Q1. Is the teacher aware of nipun lakshyas for their respective
                subejct & grades?
              </H3>
              <BodyLarge>Whiteboard</BodyLarge>
            </Box>

            <Box>
              <H3 color={"schools.bodyText"}>
                Q2. Does the classroom have NIPUN Lakshya charts pasted on
                walls?
              </H3>
              <BodyLarge>Answer as in ODK</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.bodyText"}>
                Q1. Is the teacher aware of nipun lakshyas for their respective
                subejct & grades?
              </H3>
              <BodyLarge>Whiteboard</BodyLarge>
            </Box>

            <Box>
              <H3 bold color={"schools.bodyText"}>
                Q2. Does the classroom have NIPUN Lakshya charts pasted on
                walls?
              </H3>
              <BodyLarge>Answer as in ODK</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.bodyText"}>
                Q1. Is the teacher aware of nipun lakshyas for their respective
                subejct & grades?
              </H3>
              <BodyLarge>Whiteboard</BodyLarge>
            </Box>

            <Box>
              <H3 color={"schools.bodyText"}>
                Q2. Does the classroom have NIPUN Lakshya charts pasted on
                walls?
              </H3>
              <BodyLarge>Answer as in ODK</BodyLarge>
            </Box>
          </VStack>
        </Box>
      </Collapsible>
    </Layout>
  );
}
