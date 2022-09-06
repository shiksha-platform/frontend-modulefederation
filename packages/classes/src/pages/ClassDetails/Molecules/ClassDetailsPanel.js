import React from "react";
import { Collapsible } from "@shiksha/common-lib";
import { HStack, Text, VStack, Box, useTheme } from "native-base";
import { useTranslation } from "react-i18next";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const ClassDetailsPanel = ({ students }) => {
  const { colors } = useTheme();
  const MALECOLOR = colors?.["classes"]?.["boys"];
  const FEMALECOLOR = colors?.["classes"]?.["girls"];
  const { t } = useTranslation();
  const fullName = localStorage.getItem("fullName");
  const maleCount = students.filter((e) => e.gender === "Male").length;
  const femaleCount = students.filter((e) => e.gender === "Female").length;

  return (
    <Collapsible defaultCollapse={true} header={t("CLASS_DETAILS")}>
      <Collapsible defaultCollapse={true} header={t("SUMMARY")}>
        <VStack p="2" space={4}>
          <Box bg={"classes.lightGray4"} rounded={"md"} p="4">
            <VStack space={2}>
              <HStack justifyContent={"space-between"} alignItems="center">
                <Text bold>{t("CLASS_TEACHER")}</Text>
                {/* <IconByName name="More2LineIcon" /> */}
              </HStack>
              <Text>
                <Text bold>{t("NAME")}: </Text>
                {fullName}
              </Text>
            </VStack>
          </Box>
          <Box bg={"classes.lightGray4"} rounded={"md"} p="4">
            <VStack space={2}>
              <HStack justifyContent={"space-between"} alignItems="center">
                <Text bold>{t("CLASS_STRENGTH")}</Text>
                {/* <IconByName name="More2LineIcon" /> */}
              </HStack>
              <HStack space={6} alignItems="center">
                <VStack>
                  <HStack alignItems={"center"} space={1}>
                    <Box bg={"classes.girls"} p="2" rounded={"full"} />
                    <Text bold>{t("GIRLS")}:</Text>
                    <Text>
                      {students.filter((e) => e.gender === "Female").length}
                    </Text>
                  </HStack>
                  <HStack alignItems={"center"} space={1}>
                    <Box bg={"classes.boys"} p="2" rounded={"full"} />
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
          <Box bg={"classes.lightGray4"} rounded={"md"} p="4">
            <VStack space={2}>
              <HStack justifyContent={"space-between"} alignItems="center">
                <Text bold>{t("DETAILS")}</Text>
                {/* <IconByName name="More2LineIcon" /> */}
              </HStack>
              <HStack space="2" alignItems="center">
                <Text>
                  <Text bold textTransform="inherit">
                    {t("MATHS")}:{" "}
                  </Text>
                  {fullName}
                </Text>
                <Box
                  rounded="full"
                  borderWidth="1"
                  borderColor={"classes.primary"}
                  px="6px"
                  _text={{
                    color: "classes.primary",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  Coming Soon...
                </Box>
              </HStack>
              <HStack space="2" alignItems="center">
                <Text>
                  <Text bold textTransform="inherit">
                    {t("ENGLISH")}:{" "}
                  </Text>
                  {fullName}
                </Text>
                <Box
                  rounded="full"
                  borderWidth="1"
                  borderColor={"classes.primary"}
                  px="6px"
                  _text={{
                    color: "classes.primary",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  Coming Soon...
                </Box>
              </HStack>
              <HStack space="2" alignItems="center">
                <Text>
                  <Text bold textTransform="inherit">
                    {t("SCIENCE")}:{" "}
                  </Text>
                  {fullName}
                </Text>
                <Box
                  rounded="full"
                  borderWidth="1"
                  borderColor={"classes.primary"}
                  px="6px"
                  _text={{
                    color: "classes.primary",
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
              borderColor={"classes.primary"}
              px="6px"
              _text={{
                color: "classes.primary",
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
              borderColor={"classes.primary"}
              px="6px"
              _text={{
                color: "classes.primary",
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
