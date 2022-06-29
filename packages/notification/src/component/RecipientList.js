import {
  capture,
  telemetryFactory,
  overrideColorTheme,
  BodyLarge,
  Caption,
} from "@shiksha/common-lib";
import { Box, Button, Stack, Text, VStack } from "native-base";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function RecipientList({
  setPageName,
  students,
  setStudents,
  appName,
}) {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));

  React.useEffect((e) => {
    setStudents(
      students.map((item) => {
        return { ...item, isSelected: false };
      })
    );
  }, []);

  return (
    <Stack>
      <VStack bg={colors.white} p="5" space="2">
        <Box pb="2">
          <BodyLarge>{"Recipient List"}</BodyLarge>
        </Box>
        {students.map((item, index) => (
          <Box
            key={index}
            borderWidth="1"
            borderColor={colors.primary}
            bg={colors.absentCardBg}
            p="10px"
            rounded="lg"
          >
            <Suspense fallback="logding">
              <Card
                attendanceProp={[]}
                item={item}
                type="rollFather"
                textTitle={
                  <VStack alignItems="center">
                    <BodyLarge>
                      <Text>{item.fullName}</Text>
                      <Text color={colors.grayInLight}> • </Text>
                      <Text color={colors.absentCardText}>
                        {item.days} {t("DAYS")}
                      </Text>
                    </BodyLarge>
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
      <Box
        bg={colors.white}
        p="5"
        pt="0"
        position="sticky"
        bottom="0"
        shadow={2}
      >
        <Button.Group>
          <Button
            flex="1"
            colorScheme="button"
            variant="outline"
            px="5"
            mr="5px"
            onPress={(e) => {
              const telemetryData = telemetryFactory.interact({
                appName,
                type: "Attendance-Notification-Add-Another-Student",
              });
              capture("INTERACT", telemetryData);
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
            ml="5px"
            onPress={(e) => setPageName("FormNotification")}
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
      <VStack bg={colors.white} p="5" space="2">
        <Box pb="2">
          <BodyLarge>{"Recipient List"}</BodyLarge>
        </Box>
        {newStudents.map((item, index) => (
          <Box
            key={index}
            borderBottomWidth="1"
            borderColor={colors.coolGray}
            p="10px"
          >
            <Suspense fallback="logding">
              <Card
                attendanceProp={[]}
                item={item}
                type="rollFather"
                textTitle={
                  <VStack alignItems="center">
                    <BodyLarge>
                      <Text>{item.admissionNo}</Text>
                      <Text color={colors.grayInLight}> • </Text>
                      <Text>{item.fullName}</Text>
                    </BodyLarge>
                  </VStack>
                }
                textSubTitle={
                  <VStack alignItems="center">
                    <Caption color={colors.gray}>
                      <Text>{item.fathersName}</Text>
                    </Caption>
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
      <Box bg={colors.white} p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          <Button
            flex="1"
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            onPress={(e) => setPageName("FormNotification")}
          >
            {t("ADD_STUDENTS")}
          </Button>
        </Button.Group>
      </Box>
    </Stack>
  );
};
