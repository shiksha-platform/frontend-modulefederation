import {
  capture,
  telemetryFactory,
  overrideColorTheme,
  BodyLarge,
  Caption,
  attendanceRegistryService,
} from "@shiksha/common-lib";
import { Box, Button, Stack, Text, VStack } from "native-base";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function RecipientList({
  setPageName,
  students,
  setStudents,
  appName,
  dateTime,
}) {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));

  const getRecipientList = async () => {
    let triggersArray = dateTime.Event.split("_");
    const recipientList = await attendanceRegistryService.getOne({
      groupId: dateTime.GroupId,
      date: dateTime.Event.split("_").pop().toLowerCase(),
      attendance: triggersArray[0],
    });
    setStudents(recipientList);
  };

  useEffect((e) => {
    getRecipientList();
  }, []);

  return (
    <Stack>
      <VStack bg={colors.white} p="5" space="2">
        <Box pb="2">
          <BodyLarge>{t("Recipient List")}</BodyLarge>
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
            <Suspense fallback="loading">
              <Card
                attendanceProp={[]}
                item={item}
                type="rollFather"
                textTitle={
                  <VStack alignItems="center">
                    <BodyLarge>
                      <Text>{item.name}</Text>
                      <Text color={colors.grayInLight}> • </Text>
                      {/* <Text color={colors.absentCardText}>
                        {item.days} {t("DAYS")}
                      </Text> */}
                    </BodyLarge>
                  </VStack>
                }
                // rightComponent={
                //   <input
                //     type={"checkbox"}
                //     value={item.admissionNo}
                //     checked={
                //       students.filter((e) => e.admissionNo === item.admissionNo)
                //         .length > 0
                //     }
                //     onChange={(event) => {
                //       if (!event.currentTarget.checked) {
                //         const newData = students.filter(
                //           (subE) => subE.admissionNo !== item.admissionNo
                //         );
                //         setStudents(newData);
                //       } else {
                //         setStudents([...students, item]);
                //       }
                //     }}
                //   />
                // }
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
          {/* <Button
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
          </Button> */}
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
