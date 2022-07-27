import React, { useState, useEffect } from "react";
import {
  Collapsible,
  overrideColorTheme,
  H2,
  Caption,
  BodyLarge,
  studentRegistryService,
  Loading,
  questionRegistryService,
  IconByName,
  telemetryFactory,
  capture,
  assessmentRegistryService,
  H3,
  useWindowSize,
} from "@shiksha/common-lib";
import {
  HStack,
  VStack,
  Box,
  Divider,
  Avatar,
  Spacer,
  Pressable,
  Button,
  Actionsheet,
  Stack,
  Checkbox,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import colorTheme from "../../colorTheme";
import moment from "moment";
import manifest from "../../manifest.json";
const colors = overrideColorTheme(colorTheme);
const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const StudentListCard = ({
  classId,
  setPageName,
  students,
  setHeaderDetails,
  chooseAssessmentTypeModal,
  handleSelectedStudent,
  selectedStudent,
  handleStudentPageNext,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [width, height] = useWindowSize();
  // let { classId } = useParams();
  // if (!classId) classId = "9eae88b7-1f2d-4561-a64f-871cf7a6b3f2";

  const [studentlist, setStudentlist] = useState([]);

  const [loading, setLoading] = React.useState(true);

  const [attendanceData, setAttendanceData] = useState({});

  const checkAttendance = async () => {
    const date = moment().format("YYYY-MM-DD");
    // const date = moment("2022-07-21").format("YYYY-MM-DD");
    const attendanceDetails =
      await assessmentRegistryService.getAttendanceDetailsByClass(classId, {
        date,
      });

    if (attendanceDetails && attendanceDetails.length) {
      const presentStudents = attendanceDetails.filter((item) => {
        return item.attendance === "Present";
      }).length;
      setAttendanceData({
        present: presentStudents,
        msg: null,
      });
      setStudentlist(attendanceDetails);
      setLoading(false);
    } else {
      setAttendanceData({
        present: null,
        msg: "Attendance not marked yet, here is list of all students.",
      });
      getStudentsList();
    }
  };
  const getStudentsList = async () => {
    const list = await studentRegistryService.getAll({ classId });
    setStudentlist(list);
    setLoading(false);
  };

  useEffect(() => {
    checkAttendance();
    // getStudentsList();
  }, []);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <>
      <Collapsible
        defaultCollapse={true}
        header={
          <>
            <VStack>
              <H2>{t("Students List")}</H2>
              {attendanceData.msg ? (
                <>
                  <Caption color={colors.lightGray} textTransform="none">
                    {attendanceData.msg}
                  </Caption>
                </>
              ) : (
                <>
                  <HStack alignItems={"center"}>
                    <Caption color={colors.gray}>
                      {t("Total ") + studentlist.length}
                    </Caption>{" "}
                    <Caption color={colors.lightGray}> ●</Caption>{" "}
                    <Caption color={colors.gray}>
                      {" "}
                      {t("Present ") + attendanceData.present}
                    </Caption>
                  </HStack>
                </>
              )}
            </VStack>
          </>
        }
        fontSize="2px"
      >
        {studentlist && studentlist.length ? (
          studentlist.map((student, index) => {
            return (
              <React.Fragment key={student.id}>
                <Box py="3">
                  <Pressable
                    onPress={() => {
                      handleSelectedStudent(student);
                    }}
                    // isDisabled={student.attendance !== "Present"}
                    isDisabled={student.attendance === "Absent"}
                    _disabled={{ cursor: "not-allowed" }}
                  >
                    <HStack alignItems="center" space={3}>
                      <Avatar
                        size="48px"
                        borderRadius="md"
                        source={{
                          uri:
                            student.image && student.image !== ""
                              ? `${manifest.api_url}/files/${encodeURIComponent(
                                  student.image
                                )}`
                              : `https://via.placeholder.com/80x80.png`,
                        }}
                      />
                      <VStack>
                        <BodyLarge
                          alignItems="center"
                          display="flex"
                          color={
                            selectedStudent?.id === student.id
                              ? "black"
                              : colors.gray
                          }
                        >
                          {index + 1}{" "}
                          <Caption color={colors.lightGray}>●</Caption>{" "}
                          {student.firstName} {student.lastName}
                        </BodyLarge>
                        <Caption color={colors.lightGray}>
                          {student.fathersName
                            ? `Mr. ${student.fathersName}`
                            : ""}
                        </Caption>
                      </VStack>
                      <Spacer />
                    </HStack>
                  </Pressable>
                </Box>

                {studentlist.length - 1 != index && (
                  <Divider bg={colors.dividerColor} />
                )}
              </React.Fragment>
            );
          })
        ) : (
          <>No students found</>
        )}
      </Collapsible>
      <Box bg={colors.white} p="5" position="sticky" bottom="85" shadow={2}>
        <Button.Group>
          <Button
            isDisabled={!selectedStudent}
            flex="1"
            colorScheme="button"
            _text={{ color: colors.white }}
            px="5"
            // onPress={()=> {handleStartAssessment()}}
            onPress={handleStudentPageNext}
          >
            {/*{t("START ASSESSMENT")}*/}
            {t("Next")}
          </Button>
        </Button.Group>
      </Box>
    </>
  );
};

export default StudentListCard;
