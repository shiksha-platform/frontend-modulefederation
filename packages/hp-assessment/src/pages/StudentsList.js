import {
  assessmentRegistryService,
  BodyLarge,
  Caption,
  classRegistryService,
  H2,
  H3,
  Layout,
  Loading,
  overrideColorTheme,
  studentRegistryService,
  useWindowSize,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Stack,
  Box,
  Button,
  HStack,
  Pressable,
  VStack,
  Spacer,
  Divider,
} from "native-base";
import StudentListCard from "../components/StudentListCard";
import colorTheme from "../colorTheme";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import manifest from "assessment/src/manifest.json";

const colors = overrideColorTheme(colorTheme);

export default function StudentsListPage({
  classId,
  setPageName,
  handleBackButton,
  chooseAssessmentTypeModal,
  handleSelectedStudent,
  selectedStudent,
  handleStudentPageNext,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [width, height] = useWindowSize();
  // let { classId } = useParams();
  if (!classId) classId = "ce045222-52a8-4a0a-8266-9220f63baba7";

  const [studentList, setStudentlist] = useState([]);

  const [loading, setLoading] = React.useState(true);

  const [attendanceData, setAttendanceData] = useState({});

  const checkAttendance = async () => {
    // const date = moment().format("YYYY-MM-DD");
    const date = moment("2022-07-21").format("YYYY-MM-DD");
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
    <Layout
      _header={{
        title: "Grade I",
      }}
      _appBar={{
        languages: ["en"],
      }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            route: "/",
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            route: "/classes",
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            route: "/",
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            route: "/",
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            route: "/",
          },
        ],
      }}
    >
      <Box p={4}>
        <VStack space={4}>
          <Box>
            <VStack>
              <H2>{t("Students List")}</H2>
              {attendanceData.msg ? (
                <>
                  <Caption textTransform="none">{attendanceData.msg}</Caption>
                </>
              ) : (
                <>
                  <HStack alignItems={"center"}>
                    <Caption>{t("Total Students for Evaluation ")}</Caption>{" "}
                    <Caption> ●</Caption>{" "}
                    <Caption> {t("Present ") + 0}</Caption>
                  </HStack>
                </>
              )}
            </VStack>
          </Box>
          <Box>
            <VStack space={4}>
              {studentList && studentList.length > 0 ? (
                studentList.map((student, index) => {
                  return (
                    <StudentListCard
                      student={student}
                      key={student.id}
                      classId={classId}
                      setPageName={setPageName}
                      chooseAssessmentTypeModal={chooseAssessmentTypeModal}
                      handleSelectedStudent={handleSelectedStudent}
                      handleStudentPageNext={handleStudentPageNext}
                    />
                  );
                })
              ) : (
                <>No students found</>
              )}
            </VStack>
          </Box>
        </VStack>
      </Box>
      <Box bg={colors.white} p="5" position="sticky" bottom="85" shadow={2}>
        <HStack justifyContent={"space-between"}>
          <Button
            colorScheme="button"
            variant="outline"
            w="45%"
            mr="2"
            // onPress={()=> setSelectedStudent()}
          >
            {t("Mark Absent")}
          </Button>

          <Button
            colorScheme="button"
            w="50%"
            ml="2"
            _text={{
              color: colors.white,
            }}
            onPress={() => navigate("/hpAssessment/oral-assessment-success")}
          >
            {t("Continue Assessment")}
          </Button>
        </HStack>
      </Box>
    </Layout>
  );
}
