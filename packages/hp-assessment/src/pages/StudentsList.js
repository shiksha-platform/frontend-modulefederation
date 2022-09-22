import {
  assessmentRegistryService,
  BodyLarge,
  Caption,
  classRegistryService,
  H2,
  H3,
  hpAssessmentRegistryService,
  IconByName,
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

const STATUS_NIPUN = "NIPUN";
const STATUS_NIPUN_READY = "NIPUN_READY";
const STATUS_ABSENT = "ABSENT";

export default function StudentsListPage({
  setPageName,
  handleBackButton,
  chooseAssessmentTypeModal,
  handleSelectedStudent,
  handleStudentPageNext,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [width, height] = useWindowSize();
  // let { classId } = useParams();
  const currentDate = moment().format("YYYY-MM-DD");
  const absentPercentThreshold = 80;
  const classId =
    localStorage.getItem("hp-assessment-groupId") ||
    "2bd698db-49a4-4811-943d-9954f8c1f377";
  // const classId = "ce045222-52a8-4a0a-8266-9220f63baba7";
  const [classObject, setClassObject] = useState({});

  const [studentList, setStudentlist] = useState([]);

  const [loading, setLoading] = React.useState(true);

  const [attendanceData, setAttendanceData] = useState({});
  const [totalStudentCount, setTotalStudentCount] = useState(0);
  const [presentStudentCount, setPresentStudentCount] = useState(0);
  const [absentStudentCount, setAbsentStudentCount] = useState(0);
  const [absentStudentPercent, setAbsentStudentPercent] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState();

  const _handleStudentAbsentMarking = () => {
    setLoading(true);
    /*const type = ["Written Assessment", "Oral Assessment"];
    type.forEach((item, i, arr) => {
      const data = {
        type: item,
        source: "diksha",
        studentId: selectedStudent?.id,
        teacherId:
          localStorage.getItem("id") || "1bae8f4e-506b-40ca-aa18-07f7c0e64488",
        status: STATUS_ABSENT,
      };
      assessmentRegistryService.createUpdateAssessment(data).then((res) => {
        if (i === arr.length - 1) {
          setLoading(false);
        }
      });
    });*/

    hpAssessmentRegistryService
      .updateGroupMembersById(selectedStudent.groupMembershipId, {
        status: STATUS_ABSENT,
      })
      .then(() => {
        setSelectedStudent();
      })
      .then(getStudentsList);
  };

  const getStudentsList = async () => {
    let list = [];
    const param = {
      limit: "20",
      page: 1,
      filters: { groupId: { _eq: classId } },
    };
    const {
      data: { data },
    } = await hpAssessmentRegistryService.getGroupMembershipSearch(param);
    setAbsentStudentCount(
      data.filter((item) => {
        return (
          item.status === STATUS_ABSENT &&
          currentDate === moment(item.updated_at).format("YYYY-MM-DD")
        );
      }).length
    );
    for (const key in data) {
      const res = await studentRegistryService.getOne({ id: data[key].userId });
      res.membershipStatus =
        data[key].status !== STATUS_ABSENT
          ? data[key].status
          : currentDate === moment(data[key].updated_at).format("YYYY-MM-DD")
          ? data[key].status
          : "";
      res.groupMembershipId = data[key].groupMembershipId;
      list.push(res);
      if (key == data.length - 1) {
        setStudentlist(list);
        setTotalStudentCount(list.length);
      }
    }
    setLoading(false);
  };

  const getClassDetails = async () => {
    let classObj = await classRegistryService.getOne({ id: classId });
    setClassObject(classObj);
  };

  useEffect(() => {
    getStudentsList();
    getClassDetails();
  }, []);

  useEffect(() => {
    setAbsentStudentPercent(
      Math.round((absentStudentCount / totalStudentCount) * 100)
    );
  }, [totalStudentCount, absentStudentCount]);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        title: `${classObject?.name || "-"}`,
      }}
      _appBar={{
        languages: ["en"],
      }}
      subHeader={
        <HStack space="4" justifyContent="space-between">
          <VStack>
            <H2 textTransform="none" color="hpAssessment.white">
              {t("Students List")}
            </H2>
            <>
              <HStack alignItems={"center"}>
                <Caption color="hpAssessment.white">{`Total Students for Evaluation ${totalStudentCount}`}</Caption>{" "}
                <Caption color="hpAssessment.white" fontSize={2}>
                  {" "}
                  •
                </Caption>{" "}
                <Caption color="hpAssessment.white">
                  {" "}
                  {t("Absent ") + absentStudentCount}
                </Caption>
              </HStack>
            </>
          </VStack>
        </HStack>
      }
      _subHeader={{
        bg: "hpAssessment.cardBg1",
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
          {studentList && studentList.length > 0 ? (
            studentList.map((student, index) => {
              return (
                <StudentListCard
                  student={student}
                  key={student.id}
                  classId={classId}
                  handleSelectedStudent={handleSelectedStudent}
                  selectedStudent={selectedStudent}
                  setSelectedStudent={setSelectedStudent}
                />
              );
            })
          ) : (
            <>No students found</>
          )}
        </VStack>
      </Box>
      <Box bg={colors.white} p="5" position="sticky" bottom="85" shadow={2}>
        <VStack space={4}>
          {absentStudentPercent > absentPercentThreshold ? (
            <>
              <HStack alignItems="center">
                <Caption color={"hpAssessment.error"} textTransform="none">
                  Too many students are absent, can't proceed futher. Please
                  visit grade tomorrow.
                </Caption>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Button
                  colorScheme="hpButton"
                  variant="outline"
                  w="45%"
                  mr="2"
                  isDisabled={true}
                  _disabled={{ cursor: "not-allowed" }}
                >
                  {t("Mark Absent")}
                </Button>
                <Button
                  colorScheme="hpButton"
                  w="50%"
                  ml="2"
                  _text={{
                    color: colors.white,
                  }}
                  isDisabled={true}
                  _disabled={{ cursor: "not-allowed" }}
                >
                  {t("Continue Assessment")}
                </Button>
              </HStack>
            </>
          ) : (
            <HStack justifyContent={"space-between"}>
              <Button
                colorScheme="hpButton"
                variant="outline"
                w="45%"
                mr="2"
                isDisabled={!(selectedStudent && selectedStudent.id)}
                _disabled={{ cursor: "not-allowed" }}
                onPress={() => _handleStudentAbsentMarking()}
              >
                {t("Mark Absent")}
              </Button>
              <Button
                colorScheme="hpButton"
                w="50%"
                ml="2"
                _text={{
                  color: colors.white,
                }}
                isDisabled={!(selectedStudent && selectedStudent.id)}
                _disabled={{ cursor: "not-allowed" }}
                onPress={() => {
                  localStorage.setItem(
                    "hp-assessment-selectedStudentId",
                    selectedStudent.id
                  );
                  navigate("/hpAssessment/read-along-instruction");
                }}
              >
                {t("Continue Assessment")}
              </Button>
            </HStack>
          )}
        </VStack>
      </Box>
    </Layout>
  );
}
