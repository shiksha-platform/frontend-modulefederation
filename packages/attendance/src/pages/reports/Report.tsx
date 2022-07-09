// Libs
import { Box, Menu, Button, Text, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  IconByName,
  Layout,
  Collapsible,
  capture,
  calendar,
  classRegistryService,
  studentRegistryService,
  H1,
  H2,
  Caption,
  Subtitle,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import manifest from "../../manifest.json";

// Components
import { CalendarBar } from "../../components/composite/CalendarBar";
import { ReportSummary } from "../../components/simple/ReportSummary";

// Utils
import {
  GetAllStudents,
  GetAttendance,
} from "../../services/calls/registryCalls";
import { colorTheme } from "utils/functions/ColorTheme";
import { ReportNavigation } from "components/simple/ReportNavigation";
import { isMoment, isMoment2DArray } from "utils/types/typeGuards";
import { GetAttendanceReport } from "utils/functions/GetAttendanceReport";
import { ReportFooter } from "components/composite/ReportFooter";

export default function Report({ footerLinks }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [classes, setClasses] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [calendarView, setCalendarView] = useState("days");
  const [makeDefaultCollapse, setMakeDefaultCollapse] = useState(false);
  const titleName = t("ATTENDANCE_REPORTS");
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      let responseClass = await classRegistryService.getAll({
        teacherId: teacherId,
        type: "class",
        role: "teacher",
      });
      if (!ignore) {
        if (responseClass[0].id) getAttendance(responseClass[0].id);
        setClasses(responseClass);
      }
    };
    getData();
    return () => {
      ignore = true;
    };
  }, [teacherId]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (classes[0]?.id) getAttendance(classes[0].id);
      setMakeDefaultCollapse(makeDefaultCollapse);
    }
    return () => {
      ignore = true;
    };
  }, [page, calendarView]);

  useEffect(() => {
    // @ts-ignore
    capture("PAGE");
  }, []);

  const getAttendance = async (classId) => {
    const attendanceData = await GetAttendanceReport(
      page,
      calendar,
      calendarView
    );
    setAttendance({ ...attendance, [classId]: attendanceData });
    const studentData = await GetAllStudents(classId);
    setStudents({ ...students, [classId]: studentData });
  };

  return (
    // @ts-ignore
    <Layout
      _header={{
        title: (
          <VStack>
            {titleName.split(" ").map((item, subIndex) => (
              <H1 key={subIndex}>{item}</H1>
            ))}
          </VStack>
        ),
        iconComponent: (
          <ReportNavigation
            calendarView={calendarView}
            setCalendarView={setCalendarView}
          />
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <CalendarBar
          view={calendarView}
          activeColor={colorTheme.grayIndark}
          _box={{ p: 0, bg: "transparent" }}
          {...{ page, setPage }}
        />
      }
      _subHeader={{ bg: colorTheme.reportCardBackg }}
      _footer={footerLinks}
    >
      <ReportFooter
        classes={classes}
        page={page}
        calendarView={calendarView}
        students={students}
        attendance={attendance}
        navigate={navigate}
        getAttendance={getAttendance}
        makeDefaultCollapse={makeDefaultCollapse}
      />
    </Layout>
  );
}
