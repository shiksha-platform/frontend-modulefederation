import React, { useState, useEffect, Suspense } from "react";
import { VStack, Box, Stack } from "native-base";
import { useTranslation } from "react-i18next";
import { calendar } from "@shiksha/common-lib";

import { colorTheme } from "utils/functions/ColorTheme";

// Components
// @ts-ignore
const Card = React.lazy(() => import("students/Card"));
import { CalendarComponent } from "components/simple/CalendarComponent";
import { SmsModal } from "components/simple/SmsModal";
import { MarkAttendanceModal } from "components/simple/MarkAttendanceModal";
import {
  CreateAttendance,
  UpdateAttendance,
} from "services/calls/registryCalls";

export default function AttendanceComponent({
  type,
  page,
  student,
  attendanceProp,
  hidePopUpButton,
  sms,
  _card,
  isEditDisabled,
  _weekBox,
  appName,
  manifest,
}) {
  const { t } = useTranslation();
  const teacherId = localStorage.getItem("id");
  const [attendance, setAttendance] = React.useState([]);
  const [attendanceObject, setAttendanceObject] = React.useState<any>({});
  const [days, setDays] = useState([]);

  const [showModal, setShowModal] = React.useState(false);
  const [smsShowModal, setSmsShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState({});
  useEffect(() => {
    if (typeof page === "object") {
      setDays(
        page.map((e) =>
          calendar(
            e,
            type,
            manifest?.[
              "class_attendance.no_of_day_display_on_attendance_screen"
            ]
          )
        )
      );
    } else {
      setDays([
        calendar(
          page,
          type,
          manifest?.["class_attendance.no_of_day_display_on_attendance_screen"]
        ),
      ]);
    }
    async function getData() {
      if (attendanceProp) {
        setAttendance(attendanceProp);
      }
      setLoading({});
    }
    getData();
  }, [page, attendanceProp, type]);
  const markAttendance = async (dataObject) => {
    setLoading({
      [dataObject.date + dataObject.id]: true,
    });
    if (dataObject.attendanceId) {
      await UpdateAttendance(dataObject);
      const newData = attendance.filter(
        (e) =>
          !(e.date === dataObject.date && e.studentId === dataObject.studentId)
      );
      setAttendance([
        ...newData,
        { ...dataObject, id: dataObject.attendanceId },
      ]);
      setLoading({});
      setShowModal(false);
    } else {
      await CreateAttendance({ dataObject, student, teacherId });
      setAttendance([...attendance, dataObject]);
      setLoading({});
      setShowModal(false);
    }
  };
  return (
    <Stack space={type !== "day" ? "15px" : ""}>
      <VStack space={type !== "day" ? "15px" : "2"}>
        {!_card?.isHideStudentCard ? (
          <Suspense fallback="loading">
            <Card
              attendanceProp={attendance ? attendance : []}
              appName={appName}
              href={"/students/" + student.id}
              item={student}
              _arrow={{ _icon: { fontSize: "large" } }}
              type="attendance"
              hidePopUpButton={hidePopUpButton}
              {...(type === "day" ? { _textTitle: { fontSize: "xl" } } : {})}
              {..._card}
              rightComponent={
                type === "day"
                  ? days.map((day, index) => (
                      // @ts-ignore
                      <CalendarComponent
                        manifest={manifest}
                        key={index}
                        monthDays={[[day]]}
                        isIconSizeSmall={true}
                        isEditDisabled={isEditDisabled}
                        {...{
                          attendance,
                          student,
                          markAttendance,
                          setAttendanceObject,
                          setShowModal,
                          setSmsShowModal,
                          loading,
                          type,
                          _weekBox: _weekBox?.[index] ? _weekBox[index] : {},
                        }}
                      />
                    ))
                  : false
              }
            />
          </Suspense>
        ) : (
          ""
        )}
        {type !== "day" ? (
          <Box borderWidth={1} borderColor={colorTheme.coolGray} rounded="xl">
            {days.map((day, index) => (
              // @ts-ignore
              <CalendarComponent
                manifest={manifest}
                key={index}
                monthDays={day}
                isEditDisabled={isEditDisabled}
                {...{
                  sms,
                  attendance,
                  student,
                  markAttendance,
                  setAttendanceObject,
                  setShowModal,
                  setSmsShowModal,
                  loading,
                  type,
                  _weekBox: _weekBox?.[index] ? _weekBox[index] : {},
                }}
              />
            ))}
          </Box>
        ) : (
          <></>
        )}
        <MarkAttendanceModal
          manifest={manifest}
          showModal={showModal}
          setShowModal={setShowModal}
          attendanceObject={attendanceObject}
          markAttendance={markAttendance}
        />
        <SmsModal
          smsShowModal={smsShowModal}
          setSmsShowModal={setSmsShowModal}
          t={t}
        />
      </VStack>
      <></>
    </Stack>
  );
}
