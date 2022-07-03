// Lib
import React, { useState, useEffect, Suspense } from "react";
import {
  VStack,
  Text,
  HStack,
  Box,
  Actionsheet,
  Stack,
  Button,
  ScrollView,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  IconByName,
  capture,
  telemetryFactory,
  attendanceRegistryService,
  H2,
  BodySmall,
  Subtitle,
  H1,
  BodyLarge,
  Caption,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";

// Components
import {ReportSummary} from "components/simple/ReportSummary";

// Lazy Loading
// @ts-ignore
const Card = React.lazy(() => import("students/Card"));

// Custom Hooks
import { usePresentStudents } from "../../utils/customhooks/usePresentStudents";

// Utils
import { PRESENT, ABSENT, UNMARKED } from "utils/functions/Constants";
import { colors, colorTheme } from "utils/functions/ColorTheme";

export const MultipleAttendance = ({
  students,
  attendance,
  getAttendance,
  setLoading,
  setAllAttendanceStatus,
  allAttendanceStatus,
  classObject,
  isEditDisabled,
  setIsEditDisabled,
  isWithEditButton,
  appName,
  manifest,
}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const teacherId = localStorage.getItem("id");
  const [presentStudents] = usePresentStudents({ students, attendance });
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState<moment.Moment>();
  const fullName = localStorage.getItem("fullName");
  useEffect(() => {
    if (showModal) setStartTime(moment());
  }, [showModal]);

  const getLastAttedance = () => {
    let dates = attendance.map((d) => moment(d.updatedAt));
    let date = moment.max(dates);
    return dates.length ? date.format("hh:mmA") : "N/A";
  };
  const groupExists = (classObject) => classObject?.id;
  const markAllAttendance = async () => {
    setLoading(true);
    if (typeof students === "object" && students.length > 0) {
      let student = students.find((e, index) => !index);

      const attendanceData = students.map((item, index) => {
        return {
          attendance: PRESENT,
          userId: item.id,
        };
      });
      let allData = {
        schoolId: student?.schoolId,
        userType: "Student",
        groupId: student?.currentClassID,
        attendanceDate: moment().format("YYYY-MM-DD"),
        attendanceData,
      };

      const result = await attendanceRegistryService.Multiple(allData);
      if (getAttendance) {
        getAttendance();
      }

      if (groupExists(classObject)) {
        const telemetryData = telemetryFactory.interact({
          appName,
          type: "Attendance-Mark-All-Present",
          groupID: classObject.id,
        });
        capture("INTERACT", telemetryData);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const modalClose = () => {
    setShowModal(false);
    setIsEditDisabled(true);
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Attendance-Summary-End",
      groupID: classObject.id,
      duration: moment().diff(startTime, "seconds"),
    });
    capture("END", telemetryData);
    setStartTime(moment());
  };

  const saveViewReportHandler = () => {
    setShowModal(true);
    const telemetryData = telemetryFactory.start({
      appName,
      type: "Attendance-Summary-Start",
      groupID: classObject.id,
    });
    capture("START", telemetryData);
  };

  return (
    <>
      {isWithEditButton || !isEditDisabled ? (
        <Stack
          position={"sticky"}
          bottom={75}
          width={"100%"}
          shadow={2}
        >
          <Box p="5" bg="white">
            <VStack space={"15px"}>
              <VStack>
                <Subtitle textTransform={"inherit"}>
                  {t("LAST_UPDATED_AT") + " " + getLastAttedance()}
                </Subtitle>
                <BodySmall textTransform={"inherit"}>
                  {t("ATTENDANCE_WILL_AUTOMATICALLY_SUBMIT")}
                </BodySmall>
              </VStack>
              {!isEditDisabled ? (
                <Button.Group>
                  {manifest?.[
                    "class_attendance.mark_all_attendance_at_once"
                  ] === "true" ? (
                    <Button
                      flex={1}
                      variant="outline"
                      colorScheme="button"
                      onPress={markAllAttendance}
                      _text={{ fontSize: "12px", fontWeight: "600" }}
                    >
                      {t("MARK_ALL_PRESENT")}
                    </Button>
                  ) : (
                    <React.Fragment />
                  )}
                  <Button
                    flex={1}
                    colorScheme="button"
                    onPress={saveViewReportHandler}
                    _text={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {t("SUBMIT")}
                  </Button>
                </Button.Group>
              ) : (
                <HStack alignItems={"center"} space={4}>
                  <Button
                    variant="outline"
                    colorScheme="button"
                    onPress={(e) => setIsEditDisabled(false)}
                  >
                    {t("EDIT")}
                  </Button>
                </HStack>
              )}
            </VStack>
          </Box>
          <Actionsheet isOpen={showModal} onClose={() => modalClose()}>
            <Stack width={"100%"} maxH={"100%"}>
              <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
                <HStack justifyContent={"space-between"}>
                  <Stack p={5} pt={2} pb="25px">
                    <H2 color={colors.white}>
                      {t("ATTENDANCE_SUMMARY_REPORT")}
                    </H2>
                    <BodySmall color={colors.white}>
                      {classObject?.title ?? ""}
                    </BodySmall>
                  </Stack>
                  <IconByName
                    name="CloseCircleLineIcon"
                    color={colors.white}
                    onPress={(e) => modalClose()}
                  />
                </HStack>
              </Actionsheet.Content>
              <ScrollView width={"100%"} margin="1" bg={colorTheme.coolGray}>
                <Box bg={colorTheme.bgSuccessAlert} px={5} py={10}>
                  <VStack alignItems="center" space="2">
                    <IconByName
                      color={colorTheme.successAlertText}
                      name="CheckboxCircleFillIcon"
                      _icon={{
                        size: "70",
                      }}
                      isDisabled
                    />
                    <H1 color={colorTheme.successAlertText}>
                      {t("ATTENDANCE_SUBMITTED")}
                    </H1>
                  </VStack>
                </Box>
                <Box bg={colors.white} p={5}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    pb={5}
                  >
                    <H2>{t("ATTENDANCE_SUMMARY")}</H2>
                    <BodyLarge>{moment().format("DD MMM, Y")}</BodyLarge>
                  </HStack>
                  <ReportSummary
                    {...{
                      students,
                      attendance: [
                        attendance.filter(
                          (e) => e.date === moment().format("YYYY-MM-DD")
                        ),
                      ],
                      footer: (
                        <HStack justifyContent={"space-between"}>
                          <Subtitle>{t("ATTENDANCE_TAKEN_BY")}</Subtitle>
                          <Subtitle color={colorTheme.successAlertText}>
                            {fullName ? fullName : ""}
                            {" at "}
                            {getLastAttedance()}
                          </Subtitle>
                        </HStack>
                      ),
                    }}
                  />
                </Box>
                <Box bg={colors.white} p="5" textAlign={"center"}>
                  <VStack space={2}>
                    <BodyLarge>
                      {t("VIEW_SEND_ATTENDANCE_RELATED_MESSAGES_TO_STUDENTS")}
                    </BodyLarge>
                    <Caption>{t("STUDENTS_ABSENT")}</Caption>

                    <Button.Group>
                      <Button
                        variant="outline"
                        flex="1"
                        onPress={(e) => {
                          const telemetryData = telemetryFactory.interact({
                            appName,
                            type: "Attendance-Notification-View-Message",
                          });
                          capture("INTERACT", telemetryData);
                          navigate(
                            "/attendance/sendSms/" +
                              (classObject?.id?.startsWith("1-")
                                ? classObject?.id?.replace("1-", "")
                                : classObject?.id)
                          );
                        }}
                      >
                        {t("VIEW_MESSAGE")}
                      </Button>
                      <Button
                        _text={{ color: colors.white }}
                        flex="1"
                        onPress={(e) => {
                          const telemetryData = telemetryFactory.interact({
                            appName,
                            type: "Attendance-Notification-View-Message",
                          });
                          capture("INTERACT", telemetryData);
                          navigate("/notification/create");
                        }}
                      >
                        {t("SEND_ANOTHER_MESSAGE")}
                      </Button>
                    </Button.Group>
                  </VStack>
                </Box>
                <Box bg={colors.white} p={5}>
                  <Box bg={colorTheme.bgReportCard} rounded={"md"} p="4">
                    <VStack space={5}>
                      <HStack
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Text bold>
                          100% {t("ATTENDANCE") + " " + t("THIS_WEEK")}
                        </Text>
                        <IconByName name="More2LineIcon" isDisabled />
                      </HStack>
                      <HStack
                        alignItems="center"
                        justifyContent={"space-around"}
                      >
                        {presentStudents.map((student, index) =>
                          index < 3 ? (
                            <Stack key={index}>
                              <Suspense fallback="loading">
                                <Card
                                  attendanceProp={attendance ? attendance : []}
                                  item={student}
                                  hidePopUpButton={true}
                                  type="vertical"
                                  appName={appName}
                                />
                              </Suspense>
                            </Stack>
                          ) : (
                            <div key={index}></div>
                          )
                        )}
                      </HStack>
                      {presentStudents?.length <= 0 ? (
                        <Caption>
                          No Student Has Achieved 100% Attendance This Week
                        </Caption>
                      ) : (
                        ""
                      )}
                      {presentStudents?.length > 3 ? (
                        <Button colorScheme="button" variant="outline">
                          {t("MORE")}
                        </Button>
                      ) : (
                        ""
                      )}
                    </VStack>
                  </Box>
                </Box>
                <Box p="2" py="5" bg={colors.white}>
                  <VStack space={"15px"} alignItems={"center"}>
                    <Caption textAlign={"center"}>
                      {t("ATTENDANCE_WILL_AUTOMATICALLY_SUBMIT")}
                    </Caption>
                    <Button.Group width="100%">
                      <Button
                        flex={1}
                        variant="outline"
                        colorScheme="button"
                        onPress={(e) => modalClose()}
                      >
                        {t("CLOSE")}
                      </Button>
                      <Button
                        flex={1}
                        colorScheme="button"
                        _text={{ color: colors.white }}
                        onPress={(e) =>
                          navigate(
                            "/attendance/report/" +
                              (classObject?.id?.startsWith("1-")
                                ? classObject?.id?.replace("1-", "")
                                : classObject?.id) +
                              "/days"
                          )
                        }
                      >
                        {t("SEE_FULL_REPORT")}
                      </Button>
                    </Button.Group>
                  </VStack>
                </Box>
              </ScrollView>
            </Stack>
          </Actionsheet>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};
