import React from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  Spacer,
  Pressable,
  Button,
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  ProgressBar,
  overrideColorTheme,
  BodyMedium,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import RoundedProgressBar from "../../RoundedProgressBar";
import AttendanceWeeklyCard from "./AttendanceWeeklyCard";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

function StudentAttendanceCollapsibleCard() {
  const { t } = useTranslation();
  const [progressData, setProgressData] = React.useState([
    {
      name: "22 Present",
      color: colors.green,
      value: 22,
    },
    {
      name: "4 Absent",
      color: colors.absent,
      value: 4,
    },
    {
      name: "1 Unmarked",
      color: colors.unmarked,
      value: 1,
    },
  ]);
  return (
    <Collapsible
      defaultCollapse={true}
      header={
        <Box py={4}>
          <VStack>
            <H2>{t("Student Wise Attendance")}</H2>
            <HStack alignItems={"center"}>
              <BodyMedium color={colors.darkGray}>
                {t("3 Students")}{" "}
              </BodyMedium>
              <Text fontSize="5px" color={colors.darkGray} fontWeight={400}>
                {" "}
                ●{" "}
              </Text>
              <BodyMedium color={colors.darkGray}>
                {" "}
                {t("Less than 75%")}
              </BodyMedium>
            </HStack>
          </VStack>
        </Box>
      }
    >
      <Divider mb={4} />
      <VStack pt={6} space={4}>
        <Box>
          <VStack space={4}>
            <AttendanceWeeklyCard />
            <AttendanceWeeklyCard />
            <AttendanceWeeklyCard />

            <Box>
              <Button colorScheme="button" variant="outline" py={3}>
                {t("See all students")}
              </Button>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Collapsible>
  );
}
export default StudentAttendanceCollapsibleCard;
