import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  HStack,
  VStack,
  Stack,
  Pressable,
  StatusBar,
  Button,
  ScrollView,
  useTheme,
  useToken,
} from "native-base";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import Layout from "../../components/layout/Layout";
import { useTranslation } from "react-i18next";
import DayWiesBar from "../../components/CalendarBar";
import { generatePath, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { TabView, SceneMap } from "react-native-tab-view";
import { Animated, Dimensions } from "react-native-web";
import Widget from "../../components/Widget";
import IconByName from "../../components/IconByName";
import { weekDates } from "../../components/attendance/AttendanceComponent";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./../../assets/css/fullCalendar.css";

const timeTables = [
  {
    id: "1",
    start: moment().format("Y-MM-DD") + " 08:30",
    end: moment().format("Y-MM-DD") + " 09:25",
    title: "MATHS",
    subTitle: "Class V, Sec B",
  },
  {
    id: "2",
    start: moment().format("Y-MM-DD") + " 09:30",
    end: moment().format("Y-MM-DD") + " 10:25",
    title: "MATHS",
    subTitle: "Class V, Sec C",
  },
  {
    id: "3",
    start: moment().format("Y-MM-DD") + " 10:30",
    end: moment().format("Y-MM-DD") + " 11:25",
    title: "SPECIAL_DANCE_MID_DROUP",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "4",
    start: moment().format("Y-MM-DD") + " 11:30",
    end: moment().format("Y-MM-DD") + " 12:25",
    title: "FREE_PERIOD",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "5",
    start: moment().format("Y-MM-DD") + " 12:30",
    end: moment().format("Y-MM-DD") + " 13:25",
    title: "SCIENCE",
    subTitle: "Class VI, Sec A",
    activeMenu: true,
    _text: { color: "white" },
  },
  {
    id: "6",
    start: moment().format("Y-MM-DD") + " 13:30",
    end: moment().format("Y-MM-DD") + " 14:25",
    title: "SUBSTITUTION",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "7",
    start: moment().format("Y-MM-DD") + " 14:30",
    end: moment().format("Y-MM-DD") + " 15:25",
    title: "FREE_PERIOD",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "8",
    start: moment().format("Y-MM-DD") + " 15:30",
    end: moment().format("Y-MM-DD") + " 16:25",
    title: "MATHS",
    subTitle: "Class VI, Sec A",
  },
  {
    id: "1",
    start: moment().add(1, "days").format("Y-MM-DD") + " 08:30",
    end: moment().add(1, "days").format("Y-MM-DD") + " 09:25",
    title: "MATHS",
    subTitle: "Class V, Sec B",
  },
  {
    id: "2",
    start: moment().add(1, "days").format("Y-MM-DD") + " 09:30",
    end: moment().add(1, "days").format("Y-MM-DD") + " 10:25",
    title: "MATHS",
    subTitle: "Class V, Sec C",
  },
  {
    id: "3",
    start: moment().add(1, "days").format("Y-MM-DD") + " 10:30",
    end: moment().add(1, "days").format("Y-MM-DD") + " 11:25",
    title: "SPECIAL_DANCE_MID_DROUP",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "4",
    start: moment().add(1, "days").format("Y-MM-DD") + " 11:30",
    end: moment().add(1, "days").format("Y-MM-DD") + " 12:25",
    title: "FREE_PERIOD",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "5",
    start: moment().add(1, "days").format("Y-MM-DD") + " 12:30",
    end: moment().add(1, "days").format("Y-MM-DD") + " 13:25",
    title: "SCIENCE",
    subTitle: "Class VI, Sec A",
  },
  {
    id: "6",
    start: moment().add(1, "days").format("Y-MM-DD") + " 13:30",
    end: moment().add(1, "days").format("Y-MM-DD") + " 14:25",
    title: "SUBSTITUTION",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "7",
    start: moment().add(1, "days").format("Y-MM-DD") + " 14:30",
    end: moment().add(1, "days").format("Y-MM-DD") + " 15:25",
    title: "FREE_PERIOD",
    subTitle: "N/A",
    rightIcon: "More2LineIcon",
  },
  {
    id: "8",
    start: moment().add(1, "days").format("Y-MM-DD") + " 15:30",
    end: moment().add(1, "days").format("Y-MM-DD") + " 16:25",
    title: "MATHS",
    subTitle: "Class VI, Sec A",
  },
];

// Start editing here, save and see your changes.
// export default function App() {
//   const { t } = useTranslation();

//   const renderScene = SceneMap({
//     first: MyClassRoute,
//     second: TimeTableRoute1,
//   });

//   const initialLayout = { width: Dimensions.get("window").width };
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: "first", title: t("MY_CLASSES") },
//     { key: "second", title: t("TIME_TABLE") },
//   ]);

//   const renderTabBar = ({ navigationState }) => {
//     return (
//       <Box flexDirection="row">
//         {navigationState.routes.map((route, i) => {
//           return (
//             <Pressable key={i} flex={1} onPress={() => setIndex(i)}>
//               <Box
//                 borderBottomWidth="3"
//                 borderColor={index === i ? "button.500" : "coolGray.200"}
//                 alignItems="center"
//                 p="3"
//                 cursor="pointer"
//               >
//                 <Animated.Text>
//                   <Text {...{ color: index === i ? "button.500" : "#a1a1aa" }}>
//                     {route.title}
//                   </Text>
//                 </Animated.Text>
//               </Box>
//             </Pressable>
//           );
//         })}
//       </Box>
//     );
//   };

//   return (
//     <Layout
//       _header={{
//         title: t("MY_CLASSES"),
//         icon: "Group",
//         subHeading: moment().format("hh:mm a"),
//         _subHeading: { fontWeight: 500, textTransform: "uppercase" },
//         avatar: true,
//       }}
//       subHeader={t("THE_CLASSES_YOU_TAKE")}
//       _subHeader={{
//         bg: "classCard.500",
//         _text: {
//           fontSize: "16px",
//           fontWeight: "600",
//           textTransform: "inherit",
//         },
//       }}
//     >
//       <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
//         <TabView
//           navigationState={{ index, routes }}
//           renderScene={renderScene}
//           renderTabBar={renderTabBar}
//           onIndexChange={setIndex}
//           initialLayout={initialLayout}
//           style={{ marginTop: StatusBar.currentHeight }}
//         />
//       </Box>
//     </Layout>
//   );
// }


// const MyClassRoute = () => {
//   const { t } = useTranslation();
//   const [classes, setClasses] = useState([]);
//   const teacherId = localStorage.getItem("id");

//   useEffect(() => {
//     let ignore = false;
//     const getData = async () => {
//       if (!ignore) {
//         setClasses(
//           await classServiceRegistry.getAll({
//             teacherId: teacherId,
//             type: "class",
//             role: "teacher",
//           })
//         );
//       }
//     };
//     getData();
//   }, [teacherId]);

//   return (
//     <Box pb={4} pt="30">
//       <VStack space={10}>
//         <Widget
//           data={classes.map((item, index) => {
//             return {
//               title: item.name,
//               subTitle: t("CLASS_TEACHER"),
//               link: generatePath(item.route, { ...{ id: item.id } }),
//               _box: {
//                 style: {
//                   background:
//                     index % 2 === 0
//                       ? "linear-gradient(281.03deg, #FC5858 -21.15%, #F8AF5A 100.04%)"
//                       : "linear-gradient(102.88deg, #D7BEE6 -5.88%, #B143F3 116.6%)",
//                 },
//               },
//             };
//           })}
//         />
//         <HStack space={2} justifyContent={"center"}>
//           <Link
//             to={"/classes/attendance/group"}
//             style={{
//               textDecoration: "none",
//               flex: "1",
//               textAlign: "center",
//             }}
//           >
//             <Box
//               rounded="lg"
//               borderColor="button.500"
//               borderWidth="1"
//               _text={{ color: "button.500" }}
//               px={4}
//               py={2}
//               style={{ textTransform: "uppercase" }}
//             >
//               {t("CHOOSE_ANOTHER_CLASS")}
//             </Box>
//           </Link>
//         </HStack>
//       </VStack>
//     </Box>
//   );
// };

const TimeTableRoute = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  let calendarRef = React.createRef();
  const [buttonName, setButtonName] = React.useState();
  let datesMin = timeTables.map((e) =>
    moment(e?.start, "Y-MM-DD HH:mm:ss").toDate()
  );
  let datesMax = timeTables.map((e) =>
    moment(e?.end, "Y-MM-DD HH:mm:ss").toDate()
  );
  const minMaxTime = {
    slotMinTime: datesMin.length
      ? moment(Math.min(...datesMin)).format("HH:mm:ss")
      : "00:00:00",
    slotMaxTime: datesMax.length
      ? moment(Math.max(...datesMax)).format("HH:mm:ss")
      : "23:59:59",
  };
  const [timeTableCardOrange, emerald, gray] = useToken("colors", [
    "timeTableCardOrange.500",
    "emerald.400",
    "gray.200",
  ]);
  let events = timeTables.map((e, index) => {
    return {
      ...e,
      title: t(e.title),
      backgroundColor: e.activeMenu
        ? emerald
        : index < 4
          ? timeTableCardOrange
          : gray,
      borderColor: e.activeMenu ? emerald : timeTableCardOrange,
    };
  });

  const changeView = () => {
    let calendarApi = calendarRef.current.getApi();
    setButtonName(
      calendarApi.view.type === "timeGridDay" ? t("WEEK_VIEW") : t("TODAY")
    );
    calendarApi.changeView(
      calendarApi.view.type === "timeGridDay"
        ? "timeGridTowDay"
        : "timeGridDay",
      moment().format("Y-MM-DD")
    );
  };

  return (
    <Box py="5">
      <FullCalendar
        locale={localStorage.getItem("lang")}
        {...minMaxTime}
        height="auto"
        stickyHeaderDates
        allDaySlot={false}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev title next",
          right: "changeViewButton",
        }}
        customButtons={{
          changeViewButton: {
            text: buttonName ? buttonName : t("WEEK_VIEW"),
            click: () => {
              changeView();
            },
          },
        }}
        initialView="timeGridTowDay"
        events={events}
        views={{
          timeGridTowDay: {
            type: "timeGrid",
            duration: {
              day: 2,
            },
            slotDuration: "00:15",
          },
          timeGridDay: {
            type: "timeGrid",
            duration: {
              day: 1,
            },
            slotDuration: "00:15",
          },
        }}
        viewDidMount={(view) => {
          view.el.querySelector(".fc-timegrid-axis-frame").innerHTML =
            t("TIME");
        }}
        eventContent={renderEventContent}
        dayHeaderFormat={{ weekday: "long" }}
        ref={calendarRef}
        eventClick={(e) => navigate("/subject/" + e.event._def.publicId)}
      />
    </Box>
  );
};

const renderEventContent = (eventInfo) => {
  let item = {
    ...eventInfo?.event?._def,
    ...eventInfo?.event?._def?.extendedProps,
  };
  return (
    <Box p="4">
      <VStack space={"8px"}>
        <HStack
          justifyContent={"space-between"}
          space="2"
          alignItems={"center"}
        >
          <Text
            fontSize="16px"
            fontWeight="600"
            {...{
              ...item._text,
              color: item._text?.color,
            }}
          >
            {item.title}
          </Text>
          {item?.rightIcon ? (
            <IconByName
              name={item?.rightIcon}
              isDisabled
              {...{
                ...item._text,
                color: item._text?.color ? item._text?.color : "gray.600",
              }}
            />
          ) : (
              <></>
            )}
        </HStack>
        <Text
          fontSize="12px"
          fontWeight="500"
          {...{
            ...item._text,
            color: item._text?.color,
          }}
        >
          {item?.subTitle}
        </Text>
      </VStack>
    </Box>
  );
};


export default TimeTableRoute