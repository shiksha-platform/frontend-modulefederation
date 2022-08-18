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
import colorTheme from "../colorTheme";
import nipun_badge from "../stories/assets/nipun_badge.svg";
const colors = overrideColorTheme(colorTheme);
const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const TileBasedOnStatus = ({
  status,
  children,
  setSelectedStudent,
  student,
}) => {
  const navigate = useNavigate();
  if (status === "ongoing") {
    return (
      <Pressable onPress={() => setSelectedStudent(student)}>
        <Box
          bg={"#ffc3694d"}
          p={4}
          borderColor={"#FFC369"}
          borderWidth={1}
          rounded={10}
        >
          {children}
        </Box>
      </Pressable>
    );
  }
  if (status === "complete" || status === "completeWithNipun") {
    return (
      <Pressable onPress={() => setSelectedStudent(student)}>
        <Box
          bg={"#ECF7EB"}
          p={4}
          borderColor={"#C5DCC3"}
          borderWidth={1}
          rounded={10}
        >
          {children}
        </Box>
      </Pressable>
    );
  }
  return (
    <Pressable onPress={() => setSelectedStudent(student)}>
      <Box
        bg={"#ffffff"}
        p={4}
        borderColor={"#eee"}
        borderWidth={1}
        rounded={10}
      >
        {children}
      </Box>
    </Pressable>
  );
};

const StudentListCard = ({
  classId,
  setPageName,
  student,
  setHeaderDetails,
  chooseAssessmentTypeModal,
  handleSelectedStudent,
  handleStudentPageNext,
  studentList,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [width, height] = useWindowSize();

  const [selectedStudent, setSelectedStudent] = useState();
  /*const [studentList, setStudentlist] = useState([
    {
      id: 1,
      firstName: 'Manoj',
      lastName: '',
      fathersName: 'abc'
    },
    {
      id: 2,
      firstName: 'Rahul',
      lastName: '',
      fathersName: 'xyz'
    },
    {
      id: 3,
      firstName: 'Manoj',
      lastName: '',
      fathersName: 'abc'
    },
    {
      id: 4,
      firstName: 'Rahul',
      lastName: '',
      fathersName: 'xyz'
    },
    {
      id: 5,
      firstName: 'Manoj',
      lastName: '',
      fathersName: 'abc'
    },
    {
      id: 6,
      firstName: 'Rahul',
      lastName: '',
      fathersName: 'xyz'
    },
    {
      id: 7,
      firstName: 'Manoj',
      lastName: '',
      fathersName: 'abc'
    },
    {
      id: 8,
      firstName: 'Rahul',
      lastName: '',
      fathersName: 'xyz'
    }
  ]);*/

  const [loading, setLoading] = React.useState(false);

  const [attendanceData, setAttendanceData] = useState({});

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <TileBasedOnStatus
      setSelectedStudent={setSelectedStudent}
      student={student}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <Box>
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              borderRadius="md"
              source={{
                uri: "https://via.placeholder.com/50x50.png",
              }}
            />
            <VStack>
              <BodyLarge>{student.firstName}</BodyLarge>
              {/*<Checkbox
                            colorScheme="button"
                            borderColor={colors.primary}
                            borderRadius="0"
                          >
                            {""}
                            <BodyLarge>{t("Absent")}</BodyLarge>
                          </Checkbox>*/}
            </VStack>
          </HStack>
        </Box>
        {/*{
          index === 2 &&
          <Box>
            <img src={nipun_badge} alt="nipun" style={{maxWidth: '35px'}} />
          </Box>
        }*/}
      </HStack>
    </TileBasedOnStatus>
  );
};

export default StudentListCard;
