import React, { useState, useEffect } from "react";
import {
  Collapsible,
  H2,
  Caption,
  BodyLarge,
  studentRegistryService,
  Loading,
  assessmentRegistryService,
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
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import manifest from "../../manifest.json";

const StudentListCard = ({
  classId,
  handleSelectedStudent,
  selectedStudent,
  handleStudentPageNext,
}) => {
  const { t } = useTranslation();
  const [width, height] = useWindowSize();
  const [studentlist, setStudentlist] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [attendanceData, setAttendanceData] = useState({});

  const checkAttendance = async () => {
    const date = moment().format("YYYY-MM-DD");
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
  }, []);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Box>
      <Collapsible
        defaultCollapse={true}
        header={
          <VStack>
            <H2>{t("Students List")}</H2>
            {attendanceData.msg ? (
              <Caption color={"assessment.lightGray"} textTransform="none">
                {attendanceData.msg}
              </Caption>
            ) : (
              <HStack alignItems={"center"}>
                <Caption color={"assessment.gray"}>
                  {t("Total ") + studentlist.length}
                </Caption>{" "}
                <Caption color={"assessment.lightGray"}> ●</Caption>{" "}
                <Caption color={"assessment.gray"}>
                  {t("Present ") + attendanceData.present}
                </Caption>
              </HStack>
            )}
          </VStack>
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
                    isDisabled={student.attendance === "Absent"}
                    _disabled={{ cursor: "not-allowed" }}
                  >
                    <HStack alignItems="center" space={3}>
                      {student.image ? (
                        <Avatar
                          size="48px"
                          borderRadius="md"
                          source={{
                            uri: `${
                              manifest.api_url
                            }/files/${encodeURIComponent(student.image)}`,
                          }}
                        />
                      ) : (
                        <Avatar
                          size="48px"
                          borderRadius="md"
                          bg={"primary"}
                          _text={{ color: "white" }}
                        >
                          {`${student.firstName}`
                            ?.toUpperCase()
                            ?.substring(0, 2)}
                        </Avatar>
                      )}
                      <VStack>
                        <BodyLarge
                          alignItems="center"
                          display="flex"
                          color={
                            selectedStudent?.id === student.id
                              ? "black"
                              : "assessment.gray"
                          }
                        >
                          {index + 1}{" "}
                          <Caption color={"assessment.lightGray"}>●</Caption>{" "}
                          {student.firstName} {student.lastName}
                        </BodyLarge>
                        <Caption color={"assessment.lightGray"}>
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
                  <Divider bg={"assessment.dividerColor"} />
                )}
              </React.Fragment>
            );
          })
        ) : (
          <>No students found</>
        )}
      </Collapsible>
      <Box
        bg={"assessment.white"}
        p="5"
        position="sticky"
        bottom="85"
        shadow={2}
      >
        <Button.Group>
          <Button
            isDisabled={!selectedStudent}
            flex="1"
            colorScheme="button"
            _text={{ color: "assessment.white" }}
            px="5"
            // onPress={()=> {handleStartAssessment()}}
            onPress={handleStudentPageNext}
          >
            {/*{t("START ASSESSMENT")}*/}
            {t("Next")}
          </Button>
        </Button.Group>
      </Box>
    </Box>
  );
};

export default StudentListCard;
