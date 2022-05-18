import { capture, telemetryFactory } from "@shiksha/common-lib";
import { Box, Button, Stack, Text, VStack } from "native-base";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function RecipientList({
  setPageName,
  students,
  setStudents,
  appName,
}) {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));
  const [checkStudents, setCheckStudents] = React.useState([]);

  React.useEffect((e) => {
    setCheckStudents(students.map((e) => e.admissionNo));
  }, []);

  return (
    <Stack>
      <VStack bg="white" p="5" space="2">
        <Box pb="2">
          <Text fontSize="14px" fontWeight="500">
            {"Recipient List"}
          </Text>
        </Box>
        {students.map((item, index) => (
          <Box
            key={index}
            borderWidth="1"
            borderColor="absentCardBg.600"
            bg="absentCardBg.500"
            p="10px"
            rounded="lg"
          >
            <Suspense fallback="logding">
              <Card
                item={item}
                type="rollFather"
                textTitle={
                  <VStack alignItems="center">
                    <Text fontSize="14" fontWeight="500">
                      <Text>{item.fullName}</Text>
                      <Text color="gray.300"> • </Text>
                      <Text color="absentCardText.500">
                        {item.days} {t("DAYS")}
                      </Text>
                    </Text>
                  </VStack>
                }
                rightComponent={
                  <input
                    type={"checkbox"}
                    value={item.admissionNo}
                    checked={
                      students.filter((e) => e.admissionNo === item.admissionNo)
                        .length > 0
                    }
                    onChange={(event) => {
                      if (!event.currentTarget.checked) {
                        const newData = students.filter(
                          (subE) => subE.admissionNo !== item.admissionNo
                        );
                        setStudents(newData);
                      } else {
                        setStudents([...students, item]);
                      }
                    }}
                  />
                }
                hidePopUpButton
              />
            </Suspense>
          </Box>
        ))}
      </VStack>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          <Button
            flex="1"
            colorScheme="button"
            variant="outline"
            px="5"
            onPress={(e) => {
              const telemetryData = telemetryFactory.interact({
                appName,
                type: "Attendance-Notification-Add-Another-Student",
              });
              capture("INTERACT", telemetryData);
              setStudents(
                students.filter((e) => checkStudents.includes(e.admissionNo))
              );
              setPageName("StudentList");
            }}
          >
            {t("ADD_STUDENTS")}
          </Button>
          <Button
            flex="1"
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            onPress={(e) => setPageName("Popup")}
          >
            {t("SAVE_CHANGES")}
          </Button>
        </Button.Group>
      </Box>
    </Stack>
  );
}

export const StudentList = ({ setPageName, students, setStudents }) => {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));

  const newStudents = [
    {
      fullName: "Shah Rukh Khan",
      admissionNo: "1",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Rahul Patil",
      admissionNo: "2",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Sandhya Shankar",
      admissionNo: "3",
      fathersName: "Mr. Fathers Name",
      days: "3",
    },
    {
      fullName: "Jatin Agarwal",
      admissionNo: "4",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Rehan Orpe",
      admissionNo: "5",
      fathersName: "Mr. Fathers Name",
      days: "11",
    },
    {
      fullName: "Siddharth Kabra",
      admissionNo: "6",
      fathersName: "Mr. Fathers Name",
      days: "3",
    },
  ];

  return (
    <Stack>
      <VStack bg="white" p="5" space="2">
        <Box pb="2">
          <Text fontSize="14px" fontWeight="500">
            {"Recipient List"}
          </Text>
        </Box>
        {newStudents.map((item, index) => (
          <Box
            key={index}
            borderBottomWidth="1"
            borderColor="gray.100"
            p="10px"
          >
            <Suspense fallback="logding">
              <Card
                item={item}
                type="rollFather"
                textTitle={
                  <VStack alignItems="center">
                    <Text fontSize="14" fontWeight="500">
                      <Text>{item.admissionNo}</Text>
                      <Text color="gray.300"> • </Text>
                      <Text>{item.fullName}</Text>
                    </Text>
                  </VStack>
                }
                textSubTitle={
                  <VStack alignItems="center">
                    <Text fontSize="10" fontWeight="400" color="gray.400">
                      <Text>{item.fathersName}</Text>
                    </Text>
                  </VStack>
                }
                rightComponent={
                  <input
                    type={"checkbox"}
                    value={item.admissionNo}
                    checked={
                      students.filter((e) => e.admissionNo === item.admissionNo)
                        .length > 0
                    }
                    onChange={(event) => {
                      if (!event.currentTarget.checked) {
                        const newData = students.filter(
                          (subE) => subE.admissionNo !== item.admissionNo
                        );
                        setStudents(newData);
                      } else {
                        setStudents([...students, item]);
                      }
                    }}
                  />
                }
                hidePopUpButton
              />
            </Suspense>
          </Box>
        ))}
      </VStack>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          <Button
            flex="1"
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            onPress={(e) => setPageName("Popup")}
          >
            {t("ADD_STUDENTS")}
          </Button>
        </Button.Group>
      </Box>
    </Stack>
  );
};
