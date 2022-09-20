import {
  BodyLarge,
  BodyMedium,
  BodySmall,
  FilterButton,
  H1,
  H2,
  H3,
  Layout,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  HStack,
  Text,
  VStack,
  Divider,
  useTheme,
} from "native-base";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const defaultInputs = [
  {
    name: "Year",
    attributeName: "year",
    data: ["2020", "2021", "2022", "2023", "2024"],
  },
  {
    name: "Month",
    attributeName: "month",
    data: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  {
    name: "District",
    attributeName: "year",
    data: ["District1", "District2", "District3", "District4", "District5"],
  },
  {
    name: "Block",
    attributeName: "block",
    data: [
      "Block 1",
      "Block 2",
      "Block 3",
      "Block 4",
      "Block 5",
      "Block 6",
      "Block 7",
      "Block 8",
      "Block 9",
      "Block 10",
    ],
  },
];

export default function Home({ footerLinks, appName }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState([{}, {}, {}, {}]);
  const [filterObject, setFilterObject] = React.useState({});

  const callBackFilterObject = React.useCallback((e) => {
    setFilterObject();
  }, []);

  return (
    <Layout
      _header={{
        title: (
          <Box>
            <HStack alignItems="center" space={3}>
              <Avatar
                size="48px"
                borderRadius="md"
                source={{
                  uri: "",
                }}
                bg={"primary"}
              >
                <H2 color="white">
                  {localStorage.getItem("fullName").slice(0, 2).toUpperCase()}
                </H2>
              </Avatar>
              <VStack>
                <BodyLarge mb={-2.5}>Welcome</BodyLarge>
                <H1>{localStorage.getItem("fullName")}</H1>
              </VStack>
            </HStack>
          </Box>
        ),
      }}
      subHeader={"This is how your progress looks like"}
      _appBar={{ languages: ["en"] }}
      _footer={footerLinks}
    >
      <Box p={6} bg="white">
        <VStack space={6}>
          <Box rounded={10} bg={"lightGray6"} shadow="md">
            <VStack>
              <Box alignItems="center" p={4}>
                <H2 textTransform="none">Your monthly review</H2>
              </Box>
              <Divider />
              <Box p={6}>
                <HStack justifyContent="space-around">
                  <Box w="100px" h="100px">
                    <CircularProgressbarWithChildren
                      value={24}
                      maxValue={60}
                      styles={buildStyles({
                        pathColor: colors?.primary,
                        textColor: colors?.error,
                        trailColor: "background",
                      })}
                    >
                      <Box textAlign="center">
                        <VStack>
                          <Text color={"purple"}>
                            <H1>24/</H1>
                            <H2>60</H2>
                          </Text>
                          <BodySmall>
                            Teachers
                            <br /> Mentored
                          </BodySmall>
                        </VStack>
                      </Box>
                    </CircularProgressbarWithChildren>
                  </Box>

                  <Box w="100px" h="100px">
                    <CircularProgressbarWithChildren
                      value={7}
                      maxValue={14}
                      styles={buildStyles({
                        pathColor: colors?.primary,
                        textColor: colors?.error,
                        trailColor: "background",
                      })}
                    >
                      <Box textAlign="center">
                        <VStack>
                          <Text color={"blue"}>
                            <H1>07/</H1>
                            <H2>14</H2>
                          </Text>
                          <BodySmall>
                            Schools
                            <br />
                            Covered
                          </BodySmall>
                        </VStack>
                      </Box>
                    </CircularProgressbarWithChildren>
                  </Box>
                </HStack>
              </Box>
              <Divider />
              <Box p={4}>
                <HStack alignItems="center" justifyContent="space-between">
                  <BodyMedium>Average Mentoring Time</BodyMedium>
                  <H2 color={"green"}>2.5 Hrs</H2>
                </HStack>
              </Box>
            </VStack>
          </Box>

          <Box>
            <H2 textTransform="none" fontWeight="bold">
              Performance Overview of the District / Block
            </H2>
            <FilterButton
              getObject={callBackFilterObject}
              object={filterObject}
              _actionSheet={{ bg: "white" }}
              _box={{ pt: 5 }}
              _button={{
                px: "15px",
                py: "2",
                mr: "5",
              }}
              _filterButton={{
                rightIcon: "",
                bg: "white",
              }}
              resetButtonText={t("COLLAPSE")}
              filters={defaultInputs}
            />
          </Box>

          <Box>
            <HStack space="10px">
              <Box
                bg={"lightGray6"}
                rounded={10}
                flex={1}
                w="115px"
                minH="150px"
                alignItems="center"
                textAlign="center"
                py={4}
              >
                <VStack space={4} alignItems="center">
                  <Box w="50px" minH="50px">
                    <CircularProgressbarWithChildren
                      value={0}
                      maxValue={756}
                      styles={buildStyles({
                        pathColor: colors?.primary,
                        textColor: colors?.error,
                        trailColor: "background",
                      })}
                    >
                      <BodyLarge color={"primary"}>756</BodyLarge>
                    </CircularProgressbarWithChildren>
                  </Box>
                  <BodyMedium>
                    No of
                    <br /> Mentors
                  </BodyMedium>
                </VStack>
              </Box>
              <Box
                bg={"lightGray6"}
                rounded={10}
                flex={1}
                w="115px"
                minH="150px"
                alignItems="center"
                textAlign="center"
                py={4}
              >
                <VStack space={4} alignItems="center">
                  <Box w="50px" minH="50px">
                    <CircularProgressbarWithChildren
                      value={450}
                      maxValue={600}
                      styles={buildStyles({
                        pathColor: colors?.primary,
                        trailColor: "background",
                      })}
                    >
                      <BodyLarge color={"primary"}>450</BodyLarge>
                    </CircularProgressbarWithChildren>
                  </Box>
                  <BodyMedium px="1">
                    No of Monthly Targets achievers
                  </BodyMedium>
                </VStack>
              </Box>
              <Box
                bg={"lightGray6"}
                rounded={10}
                flex={1}
                w="115px"
                minH={"150px"}
                alignItems="center"
                textAlign="center"
                py={4}
              >
                <VStack space={4} alignItems="center">
                  <Box w="50px" minH="50px">
                    <CircularProgressbarWithChildren
                      value={45}
                      maxValue={100}
                      styles={buildStyles({
                        pathColor: colors?.primary,
                        trailColor: "background",
                      })}
                    >
                      <BodyLarge color={"primary"}>45%</BodyLarge>
                    </CircularProgressbarWithChildren>
                  </Box>
                  <BodyMedium px="1">
                    Percentage of monthly target achievers
                  </BodyMedium>
                </VStack>
              </Box>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
}
