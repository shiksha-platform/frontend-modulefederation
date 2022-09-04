import {
  assessmentRegistryService,
  BodyLarge,
  Caption,
  classRegistryService,
  H2,
  H3, hpAssessmentRegistryService,
  Layout,
  Loading,
  overrideColorTheme,
  studentRegistryService,
  useWindowSize
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
  /*const classId =
    localStorage.getItem("hp-assessment-groupId") ||
    "2bd698db-49a4-4811-943d-9954f8c1f377";*/
  const classId = "ce045222-52a8-4a0a-8266-9220f63baba7";
  const [classObject, setClassObject] = useState({});

  const [studentList, setStudentlist] = useState([]);

  const [loading, setLoading] = React.useState(true);

  const [attendanceData, setAttendanceData] = useState({});
  const [totalStudentCount, setTotalStudentCount] = useState(20);
  const [presentStudentCount, setPresentStudentCount] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState();

  const _handleStudentAbsentMarking = async () => {
    setLoading(true);
    const type = ['Written Assessment', 'Oral Assessment'];
    type.forEach((item, i, arr) => {
      const data = {
        type: item,
        source: "diksha",
        studentId: selectedStudent?.id,
        teacherId:
          localStorage.getItem("id") || "1bae8f4e-506b-40ca-aa18-07f7c0e64488",
        status: 'Absent'
      };
      assessmentRegistryService.createUpdateAssessment(data).then((res)=> {
        if(i === arr.length -1){
          setLoading(false);
        }
      });
    })
  };

  const getStudentsList = async () => {
    let list = [];
    const param = {
      "limit": "20",
      "page": 1,
      "filters": {"groupId":{"_eq": classId}}
    }
    const { data: {data} } = await hpAssessmentRegistryService.getGroupMembershipSearch(param);
    for (const key in data) {
      const res = await studentRegistryService.getOne({id: data[key].userId});
      list.push(res);
      if(key == data.length-1){
        setStudentlist(list);
      }
    }
    setLoading(false);

    // track assessment api (studentId, groupId)should be called too to get status and match them with this list and show status
    //this needs to be called for each entry and show student detail
  };

  const getClassDetails = async () => {
    let classObj = await classRegistryService.getOne({ id: classId });
    setClassObject(classObj);
  };

  useEffect(() => {
    getStudentsList();
    getClassDetails();
  }, []);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        title: `Grade ${classObject?.name || "-"}`,
      }}
      _appBar={{
        languages: ["en"],
      }}
      subHeader={
        <HStack space="4" justifyContent="space-between">
          <VStack>
            <H2 textTransform="none" color="hpAssessment.white">{t("Students List")}</H2>
            <>
              <HStack alignItems={"center"}>
                <Caption color="hpAssessment.white">{`Total Students for Evaluation ${totalStudentCount}`}</Caption>{" "}
                <Caption color="hpAssessment.white" fontSize={2}> •</Caption>{" "}
                <Caption color="hpAssessment.white"> {t("Present ") + presentStudentCount}</Caption>
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
        <HStack justifyContent={"space-between"}>
          <Button
            colorScheme="hpButton"
            variant="outline"
            w="45%"
            mr="2"
            isDisabled={!(selectedStudent && selectedStudent.id)}
            _disabled={{ cursor: "not-allowed" }}
            onPress={()=> _handleStudentAbsentMarking()}
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
            onPress={() => {localStorage.setItem('hp-assessment-selectedStudentId', selectedStudent.id); navigate("/hpAssessment/read-along-instruction");}}
          >
            {t("Continue Assessment")}
          </Button>
        </HStack>
      </Box>
    </Layout>
  );
}
