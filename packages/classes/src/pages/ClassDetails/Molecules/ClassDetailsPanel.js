import React from "react";
import {
  Collapsible,
  IconByName,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { HStack, Text, VStack, Box, Progress, useToken } from "native-base";
import { useTranslation } from "react-i18next";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);
import colorTheme from "../../../colorTheme";

const colors = overrideColorTheme(colorTheme);

const MALECOLOR = colors.maleColor;
const FEMALECOLOR = colors.femaleColor;

const ClassDetailsPanel = ({ students }) => {
  const { t } = useTranslation();
  const fullName = localStorage.getItem("fullName");
  const maleCount = students.filter((e) => e.gender === "Male").length;
  const femaleCount = students.filter((e) => e.gender === "Female").length;

  return (
    <Collapsible defaultCollapse={true} header={t("CLASS_DETAILS")}>
      <Collapsible defaultCollapse={true} header={t("SUMMARY")}>
        <VStack p="2" space={4}>
          <Box bg={colors.lightGrayBg} rounded={"md"} p="4">
            <VStack space={2}>
              <HStack justifyContent={"space-between"} alignItems="center">
                <Text bold>{t("CLASS_TEACHER")}</Text>
                <IconByName name="More2LineIcon" />
              </HStack>
              <Text>
                <Text bold>{t("NAME")}: </Text>
                {fullName}
              </Text>
            </VStack>
          </Box>
          <Box bg={colors.lightGrayBg} rounded={"md"} p="4">
            <VStack space={2}>
              <HStack justifyContent={"space-between"} alignItems="center">
                <Text bold>{t("CLASS_STRENGTH")}</Text>
                <IconByName name="More2LineIcon" />
              </HStack>
              <HStack space={6} alignItems="center">
                <VStack>
                  <HStack alignItems={"center"} space={1}>
                    <Box bg={colors.classGirls} p="2" rounded={"full"} />
                    <Text bold>{t("GIRLS")}:</Text>
                    <Text>
                      {students.filter((e) => e.gender === "Female").length}
                    </Text>
                  </HStack>
                  <HStack alignItems={"center"} space={1}>
                    <Box bg={colors.classBoys} p="2" rounded={"full"} />
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
                <Box width="100px">
                  <Pie
                    data={{
                      datasets: [
                        {
                          data: [maleCount, femaleCount],
                          backgroundColor: [MALECOLOR, FEMALECOLOR],
                          borderColor: [MALECOLOR, FEMALECOLOR],
                        },
                      ],
                    }}
                  />
                </Box>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Collapsible>
      <Collapsible defaultCollapse={true} header={t("CONTACTS_TEACHERS")}>
        <VStack p="2" space={4}>
          <Box bg={colors.lightGrayBg} rounded={"md"} p="4">
            <VStack space={2}>
              <HStack justifyContent={"space-between"} alignItems="center">
                <Text bold>{t("DETAILS")}</Text>
                <IconByName name="More2LineIcon" />
              </HStack>
              <HStack space="2" alignItems="center">
                <Text>
                  <Text bold>{t("MATHS")}: </Text>
                  {fullName}
                </Text>
                <Box
                  rounded="full"
                  borderWidth="1"
                  borderColor={colors.primary}
                  px="6px"
                  _text={{
                    color: colors.primary,
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  Coming Soon...
                </Box>
              </HStack>
              <HStack space="2" alignItems="center">
                <Text>
                  <Text bold>{t("ENGLISH")}: </Text>
                  {fullName}
                </Text>
                <Box
                  rounded="full"
                  borderWidth="1"
                  borderColor={colors.primary}
                  px="6px"
                  _text={{
                    color: colors.primary,
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  Coming Soon...
                </Box>
              </HStack>
              <HStack space="2" alignItems="center">
                <Text>
                  <Text bold>{t("SCIENCE")}: </Text>
                  {fullName}
                </Text>
                <Box
                  rounded="full"
                  borderWidth="1"
                  borderColor={colors.primary}
                  px="6px"
                  _text={{
                    color: colors.primary,
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  Coming Soon...
                </Box>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Collapsible>
      <Collapsible
        header={
          <HStack alignItems="center" space="2">
            {t("AWARDS_AND_RECOGNITION")}
            <Box
              rounded="full"
              borderWidth="1"
              borderColor={colors.primary}
              px="6px"
              _text={{
                color: colors.primary,
                fontSize: "10px",
                fontWeight: "600",
              }}
            >
              Coming Soon...
            </Box>
          </HStack>
        }
      />
      <Collapsible
        header={
          <HStack alignItems="center" space="2">
            {t("STUDENT_COMPETENCIES")}
            <Box
              rounded="full"
              borderWidth="1"
              borderColor={colors.primary}
              px="6px"
              _text={{
                color: colors.primary,
                fontSize: "10px",
                fontWeight: "600",
              }}
            >
              Coming Soon...
            </Box>
          </HStack>
        }
      />
    </Collapsible>
  );
};

export default ClassDetailsPanel;
