import React, { useState } from "react";
import {
  Collapsible,
  IconByName,
  attendanceRegistryService,
  ProgressBar,
  getUniqAttendance,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button,
  Divider,
  Actionsheet,
  Checkbox,
  Avatar,
  Spacer,
  Pressable,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { H2 } from "@shiksha/common-lib";
import StudentDetailCard from "./StudentDetail";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const StudentListCard = ({ classId, students, setHeaderDetails }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [studentlist, setStudentlist] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();

  React.useEffect(() => {
    setStudentlist([
      {
        id: 1,
        name: "Rahul",
        fathersName: "Father's Name",
      },
      {
        id: 2,
        name: "Rahul",
        fathersName: "Father's Name",
      },
      {
        id: 3,
        name: "Rahul",
        fathersName: "Father's Name",
      },
    ]);
  }, []);

  return (
    <>
      <Collapsible
        defaultCollapse={true}
        header={
          <>
            <VStack>
              <H2 fontWeight="600" color="gray.800">
                {t("Students List")}
              </H2>
              <Text color="gray.400" fontSize={"xs"}>
                {t("Total ") + 24} . {t("Present ") + 19}
              </Text>
            </VStack>
          </>
        }
        fontSize="2px"
      >
        {studentlist &&
        studentlist.length &&
        studentlist.map((student, index) => {
          return (
            <React.Fragment key={`student${index}`}>
              <Box py="2">
                {/*<Pressable onPress={() => navigate("/assessment-result")}>*/}
                {/*<Pressable onPress={() => navigate("/quml-test")}>*/}
                <Pressable onPress={() => setSelectedStudent(student)}>
                  <HStack alignItems="center" space={3}>
                    <Avatar
                      size="48px"
                      borderRadius="md"
                      source={{
                        uri: "https://via.placeholder.com/50x50.png",
                      }}
                    />
                    <VStack>
                      <Text
                        color="coolGray.800"
                        _dark={{
                          color: "warmGray.50",
                        }}
                        bold
                      >
                        {index + 1} . {student.name}
                      </Text>
                      <Text color="gray.400" fontSize={"xs"}>
                        Mr. {student.fathersName}
                      </Text>
                    </VStack>
                    <Spacer />
                  </HStack>
                </Pressable>
              </Box>

              {studentlist.length - 1 != index && <Divider></Divider>}
            </React.Fragment>
          );
        })}
      </Collapsible>
      {
        selectedStudent && <Box bg="white" p="5" position="fixed" w={'100%'} bottom="84" shadow={2}>
          <Button
            colorScheme="button"
            _text={{
              color: "white",
            }}
            onPress={() => navigate("/quml-test")}
          >
            {t("Start assessment")}
          </Button>
        </Box>
      }

  </>
  );
};

export default StudentListCard;
