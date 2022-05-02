import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FlatList,
  HStack,
  Stack,
  Text,
  VStack,
} from "native-base";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";
import { GetAttendance } from "../../components/AttendanceComponent";
import DayWiesBar from "../../components/CalendarBar";
import { IconByName, Layout, Collapsible, capture } from "@shiksha/common-lib";
import ButtonHOC from "atoms/ButtonHOC";

export default function SendSMS({ footerLinks }) {
  const { t } = useTranslation();
  const [datePage, setDatePage] = useState(0);
  const { classId } = useParams();
  const [classObject, setClassObject] = useState({});
  const teacherId = localStorage.getItem("id");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  const Card = React.lazy(() => import("students/Card"));

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      let classObj = await classServiceRegistry.getOne({ id: classId });
      if (!ignore) setClassObject(classObj);
      const studentData = await studentServiceRegistry.getAll({ classId });
      setStudents(studentData);
      await getAttendance();
    };
    getData();
    return () => {
      ignore = true;
    };
  }, [classId]);

  useEffect(() => {
    capture("PAGE");
  }, []);

  const getAttendance = async (e) => {
    const attendanceData = await GetAttendance({
      classId: {
        eq: classId,
      },
      teacherId: {
        eq: teacherId,
      },
    });

    setAttendance(attendanceData);
  };

  return (
    <Layout
      _header={{
        title: t("SEND_MESSAGE"),
        subHeading: classObject.name,
        _subHeading: { fontWeight: 500 },
      }}
      subHeader={
        <HStack space="4" justifyContent="space-between" alignItems="center">
          <DayWiesBar
            activeColor="gray.900"
            _box={{ p: 0, bg: "transparent" }}
            {...{ page: datePage, setPage: setDatePage }}
          />
          <IconByName name={"ListUnorderedIcon"} isDisabled />
        </HStack>
      }
      _subHeader={{ bg: "attendanceCard.500", mb: 1 }}
      _footer={footerLinks}
    >
      <VStack space="1">
        <Box bg="white" p="5">
          <Text fontSize="16" fontWeight="600">
            {classObject.name}
          </Text>
          <Text fontSize="10" fontWeight="300">
            {t("TOTAL")}: {students.length} {t("PRESENT")}:
            {attendance.filter((e) => e.attendance === "Present").length}
          </Text>
        </Box>
        <Box bg="white" p={4}>
          <Stack space={2}>
            <Collapsible
              defaultCollapse={true}
              isHeaderBold={false}
              header={
                <>
                  <VStack>
                    <Text bold fontSize={"md"}>
                      100% {t("THIS_WEEK")}
                    </Text>
                    <Text fontSize={"xs"}>
                      {students?.length + " " + t("STUDENTS")}
                    </Text>
                  </VStack>
                </>
              }
            >
              <VStack space={2} pt="2">
                <Box>
                  <FlatList
                    data={students}
                    renderItem={({ item }) => (
                      <Box
                        borderWidth="1"
                        borderColor="presentCardBg.600"
                        bg="presentCardBg.500"
                        p="10px"
                        rounded="lg"
                        my="10px"
                      >
                        <Card
                          item={item}
                          type="rollFather"
                          hidePopUpButton
                          textTitle={
                            <VStack alignItems="center">
                              <Text fontSize="14" fontWeight="500">
                                <Text>{item.fullName}</Text>
                                <Text color="gray.300"> • </Text>
                                <Text color="presentCardText.500">100%</Text>
                              </Text>
                            </VStack>
                          }
                        />
                      </Box>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </Box>
              </VStack>
            </Collapsible>
          </Stack>
        </Box>

        <Box bg="white" p={4} mb="4" roundedBottom={"2xl"}>
          <Stack space={2}>
            <Collapsible
              defaultCollapse={true}
              isHeaderBold={false}
              header={
                <>
                  <VStack>
                    <Text bold fontSize={"md"}>
                      {t("ABSENT_CONSECUTIVE_3_DAYS")}
                    </Text>
                    <Text fontSize={"xs"}>
                      {students?.length + " " + t("STUDENTS")}
                    </Text>
                  </VStack>
                </>
              }
            >
              <VStack space={2} pt="2">
                <Box>
                  <FlatList
                    data={students}
                    renderItem={({ item }) => (
                      <Box
                        borderWidth="1"
                        borderColor="absentCardBg.600"
                        bg="absentCardBg.500"
                        p="10px"
                        rounded="lg"
                        my="10px"
                      >
                        <Card
                          item={item}
                          type="rollFather"
                          hidePopUpButton
                          textTitle={
                            <VStack alignItems="center">
                              <Text fontSize="14" fontWeight="500">
                                <Text>{item.fullName}</Text>
                                <Text color="gray.300"> • </Text>
                                <Text color="absentCardText.500">
                                  3 {t("DAYS")}
                                </Text>
                              </Text>
                            </VStack>
                          }
                        />
                      </Box>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </Box>
              </VStack>
            </Collapsible>
          </Stack>
        </Box>
        <Box p="2" py="5" bg="white" mb="1">
          <VStack space={"15px"}>
            <Text
              textAlign={"center"}
              fontSize="10px"
              textTransform={"inherit"}
            >
              <Text bold color={"gray.700"}>
                {t("NOTES") + ": "}
              </Text>
              {t("SMS_WILL_AUTOMATICALLY_SENT")}
            </Text>
            <Button.Group>
              <ButtonHOC variant="outline" colorScheme="button" flex="1">
                {t("CLOSE")}
              </ButtonHOC>
              <ButtonHOC
                flex="1"
                colorScheme="button"
                _text={{ color: "white" }}
                onPress={(e) => navigate("/notification")}
              >
                {t("SEND_ANOTHER_MESSAGE")}
              </ButtonHOC>
            </Button.Group>
          </VStack>
        </Box>
      </VStack>
    </Layout>
  );
}
