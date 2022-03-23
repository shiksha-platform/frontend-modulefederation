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
import { useTranslation } from "react-i18next";
import { generatePath } from "react-router-dom";
import { TabView, SceneMap } from "react-native-tab-view";
import { Animated, Dimensions } from "react-native-web";
import {Layout, Widget} from "@shiksha/common-lib";
import * as classServiceRegistry from '../services/classServiceRegistry';
import {footerMenus, sampleClassData} from './parts/assets'
import moment from "moment";
import { weekDates } from "services/utils";
import TimeTableRoute from "./parts/TimeTableRoute";


export default function MyClasses() {
    const { t } = useTranslation();

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
          _appBar={{languages:['en']}}
          subHeader={t("THE_CLASSES_YOU_TAKE")}
          _subHeader={{
            bg: "classCard.500",
            _text: {
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "inherit",
            },
          }}
        _footer={footerMenus}
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
            
            <RenderTabBar navigationState={{routes:routes}}/>
            {
            (index===0) 
            ?  <MyClassRoute/>
            : <TimeTableRoute/>
            }
          </Box>
        </Layout>
      );


} 

// const TimeTableRoute = () => {
//     const { t } = useTranslation();
//     const [dayView, setDayView] = useState(false);
//     const [datePage, setDatePage] = useState(0);
//     const [weekdays, setWeekdays] = useState([]);
  
//     useEffect(() => {
//       if (dayView) {
//         setWeekdays([moment()]);
//       } else {
//         setWeekdays(weekDates());
//       }
//     }, [dayView]);
  
//     return (
//       <Stack space={1}>
//         <Box bg="white" pt="30" pb={"25"}>
//           Timetable here...
//         </Box>
//       </Stack>
//     );
//   };
  
  const MyClassRoute = () => {
    const { t } = useTranslation();
    const [classes, setClasses] = useState([]);
    const authId = sessionStorage.getItem("id");
  
    // useEffect(() => {
    //   let ignore = false;
    //   const getData = async () => {
    //     if (!ignore) {
    //       setClasses(
    //         await classServiceRegistry.getAll({
    //           filters: {
    //             teacherId: {
    //               eq: authId,
    //             },
    //           },
    //         })
    //       );
    //     }
    //   };
    //   //getData();
    //   setClasses(sampleClassData);
    // }, [authId]);
  
    useEffect(async() => {
      // GET ALL CLASSES
      const getData = async () => {
         return await classServiceRegistry.getAllClasses("ebecc2ee-4f56-43bf-8cc8-d4847a12762e")
      };
      let sampleClassData = await getData();
      setClasses(sampleClassData);
    }, [authId]);
  
    return (
      <Box pb={4} pt="30">
        <VStack space={10}>
          <Widget
            data={classes.map((item, index) => {
              return {
                title: item.name,
                subTitle: t("CLASS_TEACHER"),
                link: generatePath(item.id, { ...{ id: item.id } }),
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
            <ChooseClassActionSheet/>
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
  const { t } = useTranslation();

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  return (
    <>
    
    <Link
     onPress={onOpen}>
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
} 

  

