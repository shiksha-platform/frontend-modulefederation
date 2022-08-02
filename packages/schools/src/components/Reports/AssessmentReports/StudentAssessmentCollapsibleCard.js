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
import AssessmentScoreCard from "./AssessmentScoreCard";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);
// import AttendanceWeeklyCard from "./AttendanceWeekly Card";

function StudentAssessmentCollapsibleCard() {
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
            <H2 fontWeight={600}>{t("Student Wise Assessment")}</H2>
            <HStack alignItems={"center"}>
              <BodyMedium color={colors.darkGray}>
                {t("20 Students")}{" "}
              </BodyMedium>
              <Text fontSize="5px" color={colors.darkGray} fontWeight={400}>
                {" "}
                ●{" "}
              </Text>
              <BodyMedium color={colors.darkGray}>
                {" "}
                {t("Max Score 25")}
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
            <AssessmentScoreCard />
            <AssessmentScoreCard />
            <AssessmentScoreCard />

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
export default StudentAssessmentCollapsibleCard;
