import {
  Collapsible,
  IconByName,
  Layout,
  Menu,
  Tab,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Button,
  Stack,
  Box,
  FlatList,
  Progress,
  Avatar,
  Icon,
  Actionsheet,
  Center,
} from "native-base";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import * as classServiceRegistry from "../services/classServiceRegistry";
import * as studentServiceRegistry from "../services/studentServiceRegistry";
import manifest from "../manifest.json";

export default function ClassDetails() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  const { classId } = useParams();

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      setStudents(await studentServiceRegistry.getAll({ classId }));

      let classObj = await classServiceRegistry.getOne({ id: classId });
      if (!ignore) setClassObject(classObj);
    };
    getData();
  }, [classId]);

  return (
    <Layout
      imageUrl={window.location.origin + "/class.png"}
      _header={{
        title: t("MY_CLASSES"),
        fullRightComponent: (
          <Box minH={"150px"}>
            <Box
              position={"absolute"}
              style={{ backgroundColor: "rgba(24, 24, 27, 0.4)" }}
              bottom={0}
              p={5}
              width={"100%"}
            >
              <VStack>
                <Text color="gray.100" fontWeight="700" fontSize="md">
                  {classObject.name}
                </Text>

                <Text color="gray.100" fontWeight="700" fontSize="2xl">
                  {t("CLASS_DETAILS")}
                </Text>
              </VStack>
            </Box>
          </Box>
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <Menu
          routeDynamics={true}
          items={[
            {
              id: classId,
              keyId: 1,
              title: t("TAKE_ATTENDANCE"),
              icon: "CalendarCheckLineIcon",
              route: "/attendance/:id",
              boxMinW: "200px",
            },
          ]}
          type={"veritical"}
        />
      }
      _subHeader={{
        bottom: "15px",
        bg: "classCard.500",
      }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            module: "Registry",
            route: "/classes",
            routeparameters: {},
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <Stack space={1} mb="2" shadow={2}>
        <ClassAttendanceCard classId={classObject.id}></ClassAttendanceCard>
        <ClassStudentsPanel
          classObject={classObject}
          students={students}
        ></ClassStudentsPanel>
        <ClassSubjectsPanel />
        <ClassDetailsPanel students={students} />
      </Stack>
    </Layout>
  );
}

/**
 * Class Attendance Summary Card
 */
function ClassAttendanceCard({ classId }) {
  const { t } = useTranslation();

  return (
    <Collapsible defaultCollapse={true} header={t("CLASS_ATTENDANCE")}>
      <VStack p="2" space={4}>
        <Box bg={"gray.100"} rounded={"md"} p="4">
          <VStack space={2}>
            <HStack justifyContent={"space-between"} alignItems="center">
              <Text bold>{t("STATUS")}</Text>
              <IconByName name="More2LineIcon" />
            </HStack>
            <Progress
              value={17}
              max={24}
              my="4"
              size={"2xl"}
              colorScheme="green"
              bg="button.400"
            >
              <Text color="white">17 {t("PRESENT")}</Text>
            </Progress>
            <HStack justifyContent={"space-between"} alignItems="center">
              {/* <Text>{t("GRADE") + ": " + t("GOOD")}</Text> */}
              <Text>{t("TOTAL") + ": 24 " + t("STUDENTS")}</Text>
            </HStack>
          </VStack>
        </Box>
        <Link
          style={{
            color: "rgb(63, 63, 70)",
            textDecoration: "none",
          }}
          to={"/attendance/" + classId}
        >
          <Box
            rounded="xs"
            borderWidth="1"
            px={6}
            py={2}
            mt="2"
            textAlign={"center"}
            borderColor={"button.500"}
            _text={{ color: "button.500" }}
          >
            {t("ATTENDANCE_REGISTER")}
          </Box>
        </Link>

        <Box
          bg="white"
          borderBottomWidth="1"
          borderBottomColor={"coolGray.200"}
        >
          <Stack space={2}>
            <Collapsible header={t("REPORTS")} />
          </Stack>
        </Box>

        <Box
          bg="white"
          borderBottomWidth="1"
          borderBottomColor={"coolGray.200"}
        >
          <Stack space={2}>
            <Collapsible header={t("SMS_REPORTS")} />
          </Stack>
        </Box>
      </VStack>
    </Collapsible>
  );
}

/**
 * Class Students Panel
 */
function ClassStudentsPanel({ classObject, students }) {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));

  return (
    <Collapsible defaultCollapse={true} header={t("STUDENTS")}>
      <VStack space={2} pt="2">
        <Box>
          <FlatList
            data={students}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pr="1"
                py="4"
              >
                <Suspense fallback="loding">
                  <Card item={item} href={"/students/" + item.id} />
                </Suspense>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
        <Link
          style={{
            textDecoration: "none",
          }}
          to={"/class/students/" + classObject?.id?.replace("1-", "")}
        >
          <Button mt="2" variant="outline" colorScheme="button">
            {t("SHOW_ALL_STUDENTS")}
          </Button>
        </Link>
      </VStack>
    </Collapsible>
  );
}

/**
 * Class Subjects
 */
function ClassSubjectsPanel() {
  const { t } = useTranslation();
  return (
    <Collapsible defaultCollapse={true} header={t("SUBJECTS")}>
      <VStack>
        <Box>
          <Tab
            routes={[
              {
                title: t("SCIENCE"),
                component: (
                  <Box>
                    <Box
                      borderBottomWidth="1"
                      _dark={{
                        borderColor: "gray.600",
                      }}
                      borderColor="coolGray.200"
                      pr="1"
                      py="4"
                    >
                      <Stack space={2}>
                        <Collapsible header={t("ASSIGNMENTS")} />
                      </Stack>
                    </Box>
                    <Box
                      borderBottomWidth="1"
                      _dark={{
                        borderColor: "gray.600",
                      }}
                      borderColor="coolGray.200"
                      pr="1"
                      py="4"
                    >
                      <Stack space={2}>
                        <Collapsible header={t("LESSON_PLANS")} />
                      </Stack>
                    </Box>
                    <Box pr="1" py="4">
                      <Stack space={2}>
                        <Collapsible header={t("ASSESSMENTS")} />
                      </Stack>
                    </Box>
                  </Box>
                ),
              },
              {
                title: t("MATHS"),
                component: (
                  <Center flex={1} p={4}>
                    This is Tab {t("MATHS")}
                  </Center>
                ),
              },
              {
                title: t("ENGLISH"),
                component: (
                  <Center flex={1} p={4}>
                    This is Tab {t("ENGLISH")}
                  </Center>
                ),
              },
              {
                title: t("HISTORY"),
                component: (
                  <Center flex={1} p={4}>
                    This is Tab {t("HISTORY")}
                  </Center>
                ),
              },
              {
                title: t("GEOGRAPHY"),
                component: (
                  <Center flex={1} p={4}>
                    This is Tab {t("GEOGRAPHY")}
                  </Center>
                ),
              },
            ]}
          />
        </Box>
      </VStack>
    </Collapsible>
  );
}

/**
 * Class Subjects
 */
function ClassDetailsPanel({ students }) {
  const { t } = useTranslation();
  const fullName = localStorage.getItem("fullName");
  console.log("ClassDetailsPanel", students);
  return (
    <Collapsible defaultCollapse={true} header={t("CLASS_DETAILS")}>
      <Collapsible defaultCollapse={true} header={t("SUMMARY")}>
        <VStack p="2" space={4}>
          <Box bg={"gray.100"} rounded={"md"} p="4">
            <VStack space={2}>
              <HStack justifyContent={"space-between"} alignItems="center">
                <Text bold>{t("CLASS_TEACHER")}</Text>
                <IconByName name="More2LineIcon" />
              </HStack>
              <Text>{fullName}</Text>
            </VStack>
            students
          </Box>
          <Box bg={"gray.100"} rounded={"md"} p="4">
            <VStack space={2}>
              <HStack justifyContent={"space-between"} alignItems="center">
                <Text bold>{t("CLASS_STRENGTH")}</Text>
                <IconByName name="More2LineIcon" />
              </HStack>
              <HStack space={6} alignItems="center">
                <VStack>
                  <HStack alignItems={"center"} space={1}>
                    <Box bg={"info.500"} p="2" rounded={"full"} />
                    <Text bold>{t("GIRLS")}:</Text>
                    <Text>
                      {students.filter((e) => e.gender === "Female").length}
                    </Text>
                  </HStack>
                  <HStack alignItems={"center"} space={1}>
                    <Box bg={"purple.500"} p="2" rounded={"full"} />
                    <Text bold>{t("BOYS")}:</Text>
                    <Text>
                      {students.filter((e) => e.gender === "Male").length}
                    </Text>
                  </HStack>
                  <Text>
                    <Text bold>{t("TOTAL")}: </Text>
                    {students.length} {t("STUDENTS")}
                  </Text>
                </VStack>
                <Progress
                  value={students.filter((e) => e.gender === "Male").length}
                  max={students.length}
                  size={"20"}
                  colorScheme="purple"
                  bg="info.400"
                />
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Collapsible>
      <Collapsible defaultCollapse={true} header={t("CONTACTS_TEACHERS")}>
        <VStack p="2" space={4}>
          <Box bg={"gray.100"} rounded={"md"} p="4">
            <VStack space={2}>
              <HStack justifyContent={"space-between"} alignItems="center">
                <Text bold>{t("DETAILS")}</Text>
                <IconByName name="More2LineIcon" />
              </HStack>
              <Text>
                <Text bold>{t("MATHS")}: </Text>
                {fullName}
              </Text>
              <Text>
                <Text bold>{t("ENGLISH")}: </Text>
                {fullName}
              </Text>
              <Text>
                <Text bold>{t("SCIENCE")}: </Text>
                {fullName}
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Collapsible>
      <Collapsible header={t("AWARDS_AND_RECOGNITION")} />
      <Collapsible header={t("STUDENT_COMPETENCIES")} />
    </Collapsible>
  );
}
