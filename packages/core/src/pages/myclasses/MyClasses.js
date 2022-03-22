import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  HStack,
  VStack,
  Stack,
  Pressable,
  StatusBar,
  useDisclose,
  Actionsheet,
  Button,
  Link,
} from "native-base";
import { useTranslation, withTranslation } from "react-i18next";
import { generatePath } from "react-router-dom";
import { TabView, SceneMap } from "react-native-tab-view";
import { Animated, Dimensions } from "react-native-web";
import { Layout, Widget } from "@shiksha/common-lib";
import * as classServiceRegistry from "../../services/classServiceRegistry";

import moment from "moment";
import { weekDates } from "services/utils";
import { DayWiesBar } from "components/DayWiesBar";

const timeTables = [
  {
    id: "1",
    from: "08:30 AM",
    to: "09:25 AM",
    title: "MATHS",
    subTitle: "Class V, Sec B",
    _boxMenu: {
      bg: "timeTableCardOrange.500",
      borderWidth: 1,
      borderColor: "timeTableCardOrange.500",
    },
  },
  {
    id: "2",
    from: "09:30 AM",
    to: "10:25 AM",
    title: "MATHS",
    subTitle: "Class V, Sec C",
    _boxMenu: {
      bg: "timeTableCardOrange.500",
      borderWidth: 1,
      borderColor: "timeTableCardOrange.500",
    },
  },
  {
    id: "3",
    from: "10:30 AM",
    to: "11:25 AM",
    title: "SPECIAL_DANCE_MID_DROUP",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
    _boxMenu: {
      bg: "timeTableCardOrange.500",
      borderWidth: 1,
      borderColor: "timeTableCardOrange.500",
    },
  },
  {
    id: "4",
    from: "11:30 AM",
    to: "12:25 PM",
    title: "FREE_PERIOD",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
    _boxMenu: {
      bg: "timeTableCardOrange.500",
      borderWidth: 1,
      borderColor: "timeTableCardOrange.500",
    },
  },
  {
    id: "5",
    from: "12:30 PM",
    to: "01:25 PM",
    title: "SCIENCE",
    subTitle: "Class VI, Sec A",
    activeMenu: true,
    _boxMenu: {
      bg: "emerald.400",
      borderWidth: 1,
      borderColor: "green.100",
    },
    _text: { color: "white" },
  },
  {
    id: "6",
    from: "01:30 PM",
    to: "02:25 PM",
    title: "SUBSTITUTION",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "7",
    from: "02:30 PM",
    to: "03:25 PM",
    title: "FREE_PERIOD",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "8",
    from: "03:30 PM",
    to: "04:25 PM",
    title: "MATHS",
    subTitle: "Class VI, Sec A",
  },
];
const sampleClassData = [
  { id: "1", className: "Class I", route: "1" },
  { id: "2", className: "Class II", route: "2" },
  { id: "3", className: "Class III", route: "3" },
];

export default function MyClasses() {
  const { t } = useTranslation('core');

  const renderScene = SceneMap({
    first: MyClassRoute,
    second: TimeTableRoute,
  });

  const initialLayout = { width: Dimensions.get("window").width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("MY_CLASSES") },
    { key: "second", title: t("TIME_TABLE") },
  ]);
  const RenderTabBar = ({ navigationState }) => {
    return (
      <Box flexDirection="row">
        {navigationState.routes.map((route, i) => {
          return (
            <Pressable key={i} flex={1} onPress={() => setIndex(i)}>
              <Box
                borderBottomWidth="3"
                borderColor={index === i ? "button.500" : "coolGray.200"}
                alignItems="center"
                p="3"
                cursor="pointer"
              >
                <Animated.Text>
                  <Text {...{ color: index === i ? "button.500" : "#a1a1aa" }}>
                    {route.title}
                  </Text>
                </Animated.Text>
              </Box>
            </Pressable>
          );
        })}
      </Box>
    );
  };
  return (
    <Layout
      _header={{
        title: t("MY_CLASSES"),
        icon: "Group",
        subHeading: moment().format("hh:mm a"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
        avatar: true,
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={t("THE_CLASSES_YOU_TAKE")}
      _subHeader={{
        bg: "classCard.500",
        _text: {
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "inherit",
        },
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
            title: "CLASSES",
            icon: "TeamLineIcon",
            module: "Registry",
            route: "/classes",
            routeparameters: {},
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
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
            title: "CAREER",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
        {/* 
            //TODO: This is not working in standalone app. some issues with css
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              style={{ marginTop: StatusBar.currentHeight }}
            />
            */}

        <RenderTabBar navigationState={{ routes: routes }} />
        {index === 0 ? <MyClassRoute /> : <TimeTableRoute />}
      </Box>
    </Layout>
  );
}

const TimeTableRoute = () => {
  const { t } = useTranslation('core');
  const [dayView, setDayView] = useState(false);
  const [datePage, setDatePage] = useState(0);
  const [weekdays, setWeekdays] = useState([]);

  useEffect(() => {
    if (dayView) {
      setWeekdays([moment()]);
    } else {
      setWeekdays(weekDates());
    }
  }, [dayView]);

  return (
    <Stack space={1}>
      <Box bg="white" pt="30" pb={"25"}>
        Timetable here...
      </Box>
    </Stack>
  );
};

const MyClassRoute = () => {
  const { t } = useTranslation('core');
  const [classes, setClasses] = useState([]);
  const authId = sessionStorage.getItem("id");

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (!ignore) {
        setClasses(
          await classServiceRegistry.getAll({
            filters: {
              teacherId: {
                eq: authId,
              },
            },
          })
        );
      }
    };
    //getData();
    setClasses(sampleClassData);
  }, [authId]);

  return (
    <Box pb={4} pt="30">
      <VStack space={10}>
        <Widget
          data={classes.map((item, index) => {
            return {
              title: item.className,
              subTitle: t("CLASS_TEACHER"),
              link: generatePath(item.route, { ...{ id: item.id } }),
              _box: {
                style: {
                  background:
                    index % 2 === 0
                      ? "linear-gradient(281.03deg, #FC5858 -21.15%, #F8AF5A 100.04%)"
                      : "linear-gradient(102.88deg, #D7BEE6 -5.88%, #B143F3 116.6%)",
                },
              },
            };
          })}
        />
        <HStack space={2} justifyContent={"center"}>
          <ChooseClassActionSheet />
          {/*
            <Link
              to={"/classes/attendance/group"}
              style={{
                textDecoration: "none",
                flex: "1",
                textAlign: "center",
              }}
            >
              <Box
                rounded="lg"
                borderColor="button.500"
                borderWidth="1"
                _text={{ color: "button.500" }}
                px={4}
                py={2}
                style={{ textTransform: "uppercase" }}
              >
                {t("CHOOSE_ANOTHER_CLASS")}
              </Box>
            </Link>
            */}
        </HStack>
      </VStack>
    </Box>
  );
};

const ChooseClassActionSheet = () => {
  const { t } = useTranslation('core');

  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <Link onPress={onOpen}>
        <Box
          rounded="lg"
          borderColor="button.500"
          borderWidth="1"
          _text={{ color: "button.500" }}
          px={4}
          py={2}
          style={{ textTransform: "uppercase" }}
        >
          {t("CHOOSE_ANOTHER_CLASS")}
        </Box>
      </Link>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>Option 1</Actionsheet.Item>
          <Actionsheet.Item>Option 2</Actionsheet.Item>
          <Actionsheet.Item>Option 3</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
