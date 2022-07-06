import React, { useState, useEffect, Suspense } from "react";
import {
  VStack,
  Text,
  HStack,
  Box,
  Pressable,
  Actionsheet,
  Stack,
  Button,
} from "native-base";
import { useTranslation } from "react-i18next";
import {
  IconByName,
  calendar,
  attendanceRegistryService,
  H2,
  Subtitle,
  BodyMedium,
} from "@shiksha/common-lib";

import { colors, colorTheme } from "utils/functions/ColorTheme";

// Components
// @ts-ignore
const Card = React.lazy(() => import("students/Card"));
import { CalendarComponent } from "components/simple/CalendarComponent";
import { GetIcon } from "components/simple/GetIcon";
import { SmsModal } from "components/simple/SmsModal";
import { GetStatusFromManifest } from "utils/functions/GetStatusFromManifest";
import { MarkAttendanceModal } from "components/simple/MarkAttendanceModal";

export default function AttendanceComponent({
  type,
  page,
  student,
  attendanceProp,
  hidePopUpButton,
  getAttendance,
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
      attendanceRegistryService
        .update(
          {
            id: dataObject.attendanceId,
            attendance: dataObject.attendance,
          },
          {
            onlyParameter: ["attendance", "id", "date", "classId"],
          }
        )
        .then((e) => {
          const newData = attendance.filter(
            (e) =>
              !(
                e.date === dataObject.date &&
                e.studentId === dataObject.studentId
              )
          );

          setAttendance([
            ...newData,
            { ...dataObject, id: dataObject.attendanceId },
          ]);
          setLoading({});
          setShowModal(false);
        });
    } else {
      attendanceRegistryService
        .create({
          studentId: student.id,
          date: dataObject.date,
          attendance: dataObject.attendance,
          attendanceNote: "Test",
          classId: student.currentClassID,
          subjectId: "History",
          teacherId: teacherId,
        })
        .then((e) => {
          setAttendance([...attendance, dataObject]);
          setLoading({});
          setShowModal(false);
        });
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
