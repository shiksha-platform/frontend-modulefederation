import React from "react";
import { Box, HStack, VStack, useToken } from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// import IconByName from "../../components/IconByName";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./../../assets/css/fullCalendar.css";
import { H2, H4 , IconByName} from "@shiksha/common-lib";


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
          <H2
            fontWeight="600"
            // {...{
            //   ...item._text,
            //   color: item._text?.color,
            // }}
            color={item._text?.color}
          >
            {item.title}
          </H2>
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
        <H4
          fontWeight="500"
          // {...{
          //   ...item._text,
          //   color: item._text?.color,
          // }}
          color={item._text?.color}
        >
          {item?.subTitle}
        </H4>
      </VStack>
    </Box>
  );
};

export default TimeTableRoute;
