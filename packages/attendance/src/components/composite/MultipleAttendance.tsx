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
  H2,
  BodySmall,
  Subtitle,
  H1,
  BodyLarge,
  Caption,
  Loading,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";

// Components
import { ReportSummary } from "components/simple/ReportSummary";

// Lazy Loading
// @ts-ignore
const Card = React.lazy(() => import("students/Card"));

// Custom Hooks
import { usePAStudents } from "../../utils/customhooks/usePAStudents";

// Utils
import { GetLastAttendance } from "utils/functions/GetLastAttendance";
import { colors, colorTheme } from "utils/functions/ColorTheme";
import { MarkAllAttendance } from "utils/functions/MarkAllAttendance";
import * as TelemetryFactoryMapper from "utils/functions/TelemetryFactoryMapper";
import { AttendanceMessageComponent } from "components/simple/AttendanceMessageComponent";
import { MultipleAttendanceFooter } from "components/simple/MultipleAttendanceFooter";

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
  const [presentStudents] = usePAStudents({
    students,
    attendance,
    type: "present",
  });
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState<moment.Moment>();
  const fullName = localStorage.getItem("fullName");
  useEffect(() => {
    if (showModal) setStartTime(moment());
  }, [showModal]);

  const markAllAttendance = async () => {
    setLoading(true);
    if (typeof students === "object" && students.length > 0) {
      await MarkAllAttendance({
        appName,
        students,
        getAttendance,
        classObject,
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const modalClose = () => {
    setShowModal(false);
    setIsEditDisabled(true);
    const telemetryData = TelemetryFactoryMapper.end({
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
    const telemetryData = TelemetryFactoryMapper.begin({
      appName,
      type: "Attendance-Summary-Start",
      groupID: classObject.id,
    });
    capture("START", telemetryData);
  };

  return (
    <>
      {isWithEditButton || !isEditDisabled ? (
        <Stack position={"sticky"} bottom={75} width={"100%"} shadow={2}>
          <Box p="5" bg="white">
            <VStack space={"15px"}>
              <VStack>
                <Subtitle textTransform={"inherit"}>
                  {t("LAST_UPDATED_AT") + " " + GetLastAttendance(attendance)}
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
                      //@ts-ignore
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
                    //@ts-ignore
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
                    //@ts-ignore
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
                  {
                    // @ts-ignore
                    <IconByName
                      name="CloseCircleLineIcon"
                      color={colors.white}
                      onPress={(e) => modalClose()}
                    />
                  }
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
                            {GetLastAttendance(attendance)}
                          </Subtitle>
                        </HStack>
                      ),
                    }}
                  />
                </Box>
                <Box bg={colors.white} p="5" textAlign={"center"}>
                  <AttendanceMessageComponent
                    navigate={navigate}
                    appName={appName}
                    classObject={classObject}
                  />
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
                        {
                          // @ts-ignore
                          <IconByName name="More2LineIcon" isDisabled />
                        }
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
                  <MultipleAttendanceFooter
                    modalClose={modalClose}
                    navigate={navigate}
                    classObject={classObject}
                  />
                </Box>
              </ScrollView>
            </Stack>
          </Actionsheet>
        </Stack>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};
