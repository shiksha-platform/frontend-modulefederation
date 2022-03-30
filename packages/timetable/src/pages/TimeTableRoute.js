import React from "react";
import {
  Text,
  Box,
  HStack,
  VStack,
  useToken,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IconByName from "../components/IconByName";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./../assets/css/fullCalendar.css";
import { timeTables } from './parts/assets'


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