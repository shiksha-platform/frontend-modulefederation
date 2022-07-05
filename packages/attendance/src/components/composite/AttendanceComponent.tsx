import React, { useEffect, Suspense } from "react";
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

export const GetIcon = ({ status, _box, color, _icon }) => {
  let icon = <></>;
  let iconProps = { fontSize: "xl", isDisabled: true, ..._icon };
  switch (status) {
    case "Present":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendancePresent}>
          <IconByName name="CheckboxCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Absent":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendanceAbsent}>
          <IconByName name="CloseCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Late":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.checkBlankcircle}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Holiday":
      icon = (
        <Box
          {..._box}
          color={color ? color : colorTheme.attendanceUnmarkedLight}
        >
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Unmarked":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendanceUnmarked}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Today":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendanceUnmarked}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    default:
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendancedefault}>
          <IconByName name={status} {...iconProps} />
        </Box>
      );
      break;
  }
  return icon;
};
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
  const [attendanceObject, setAttendanceObject] = React.useState([]);
  const [days, setDays] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [smsShowModal, setSmsShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState({});
  const status = Array.isArray(
    manifest?.["attendance.default_attendance_states"]
  )
    ? manifest?.["attendance.default_attendance_states"]
    : manifest?.["attendance.default_attendance_states"]
    ? JSON.parse(manifest?.["attendance.default_attendance_states"])
    : [];
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
          <Box borderWidth={1} borderColor={colors.coolGray} rounded="xl">
            {days.map((day, index) => (
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
        <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
          <Actionsheet.Content alignItems={"left"} bg={colors.bgMarkAttendance}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <H2 color={colors.white}>{t("MARK_ATTENDANCE")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.white}
                onPress={(e) => setShowModal(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box w="100%" p={4} justifyContent="center" bg={colors.white}>
            {status.map((item) => {
              return (
                <Pressable
                  key={item}
                  p={3}
                  onPress={(e) => {
                    if (attendanceObject.attendance !== item) {
                      markAttendance({
                        ...attendanceObject,
                        attendance: item,
                      });
                    } else {
                      setShowModal(false);
                    }
                  }}
                >
                  <HStack alignItems="center" space={2}>
                    <GetIcon status={item} _box={{ p: 2 }} />
                    <Text color={colorTheme.darkGray} bold fontSize="lg">
                      {t(item)}
                    </Text>
                  </HStack>
                </Pressable>
              );
            })}
          </Box>
        </Actionsheet>
        <Actionsheet
          isOpen={smsShowModal}
          onClose={() => setSmsShowModal(false)}
        >
          <Actionsheet.Content alignItems={"left"}>
            {/* <HStack justifyContent={"end"}>
              <IconByName
                name="CloseCircleLineIcon"
                onPress={(e) => setSmsShowModal(false)}
              />
            </HStack> */}
            <VStack space={5} alignItems="center" p="5">
              <Subtitle color={colorTheme.messageSent}>
                Message Sent to Parent
              </Subtitle>
              <Subtitle color={colorTheme.messageAlert}>Absent alert</Subtitle>
              <BodyMedium color={colorTheme.messageInfo} textAlign="center">
                Hello Mr. B.K. Chaudhary, this is to inform you that your ward
                Sheetal is absent in school on Wednesday, 12th of January 2022.
              </BodyMedium>
              <Button
                variant="outline"
                colorScheme="button"
                onPress={(e) => setSmsShowModal(false)}
              >
                {t("CLOSE")}
              </Button>
            </VStack>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
      <></>
    </Stack>
  );
}
