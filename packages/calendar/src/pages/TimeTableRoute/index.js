import React from "react";
import { Box, useToken } from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./../../assets/css/fullCalendar.css";
import { timeTables } from "../parts/assets";
import renderEventContent from "./molecule/renderEventContent";
import { localLanguage, momentDateFormats } from "assets/constants";

const TimeTableRoute = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  let calendarRef = React.createRef();
  const [buttonName, setButtonName] = React.useState();
  let datesMin = timeTables.map((e) =>
    moment(e?.start, momentDateFormats.y_mm_dd_HH_mm_ss).toDate()
  );
  let datesMax = timeTables.map((e) =>
    moment(e?.end, momentDateFormats.y_mm_dd_HH_mm_ss).toDate()
  );
  const minMaxTime = {
    slotMinTime: datesMin.length
      ? moment(Math.min(...datesMin)).format(momentDateFormats.hh_mm_ss)
      : "00:00:00",
    slotMaxTime: datesMax.length
      ? moment(Math.max(...datesMax)).format(momentDateFormats.hh_mm_ss)
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
      moment().format(momentDateFormats.mm_mm_yyy)
    );
  };

  return (
    <Box py="5">
      <FullCalendar
        locale={localLanguage()}
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

export default TimeTableRoute;
