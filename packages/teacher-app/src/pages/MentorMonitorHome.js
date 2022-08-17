import {
  BodyLarge,
  BodyMedium,
  BodySmall,
  DEFAULT_THEME,
  FilterButton,
  H1,
  H2,
  Layout,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Avatar, Box, HStack, Text, VStack, Divider } from "native-base";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { overrideColorTheme } from "@shiksha/common-lib";
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
let colors = overrideColorTheme({});
console.log({ colors });
export default function Home({ footerLinks, appName }) {
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
                  uri: "https://via.placeholder.com/50x50.png",
                }}
              />
              <VStack>
                <BodyLarge>Welcome</BodyLarge>
                <H1>Mr. Dhananjay Tripathi</H1>
              </VStack>
            </HStack>
          </Box>
        ),
        _heading: { color: colors.white },
      }}
      _appBar={{ languages: ["en"], isShowNotificationButton: true }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
            textTransform: "capitalize",
          },
          {
            title: "VISITS",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/visits",
            routeparameters: {},
            textTransform: "capitalize",
          },
          {
            title: "LEARNING",
            icon: "LightbulbFlashLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
            textTransform: "capitalize",
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
            textTransform: "capitalize",
          },
          {
            title: "PROFILE",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
            textTransform: "capitalize",
          },
        ],
      }}
    >
      <Box p={6}>
        <VStack space={6}>
          <Box rounded={10} bg={colors.white} shadow="md">
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
                        pathColor: colors.purple,
                        textColor: colors.error,
                        trailColor: colors.background,
                      })}
                    >
                      <Box textAlign="center">
                        <VStack>
                          <Text color={colors.purple}>
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
                        pathColor: colors.blue,
                        textColor: colors.error,
                        trailColor: colors.background,
                      })}
                    >
                      <Box textAlign="center">
                        <VStack>
                          <Text color={colors.blue}>
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
                  <H2 color={colors.green}>2.5 Hrs</H2>
                </HStack>
              </Box>
            </VStack>
          </Box>

          <Box>
            <H2 textTransform="none">
              Performance Overview of the District / Block
            </H2>
            <FilterButton
              getObject={callBackFilterObject}
              object={filterObject}
              _actionSheet={{ bg: colors.white }}
              _box={{ pt: 5 }}
              _button={{
                px: "15px",
                py: "2",
                mr: "5",
              }}
              _filterButton={{
                rightIcon: "",
                bg: colors.white,
              }}
              resetButtonText={t("COLLAPSE")}
              filters={defaultInputs}
            />
          </Box>

          <Box>
            <HStack space="10px">
              <Box
                bg={colors.white}
                rounded={10}
                flex={1}
                w="115px"
                h="150px"
                alignItems="center"
                textAlign="center"
                py={4}
              >
                <VStack space={4} alignItems="center">
                  <Box w="50px" h="50px">
                    <CircularProgressbarWithChildren
                      value={0}
                      maxValue={756}
                      styles={buildStyles({
                        pathColor: colors.purple,
                        textColor: colors.error,
                        trailColor: colors.background,
                      })}
                    >
                      <BodyLarge color={colors.primary}>756</BodyLarge>
                    </CircularProgressbarWithChildren>
                  </Box>
                  <BodyMedium>
                    No of
                    <br /> Mentors
                  </BodyMedium>
                </VStack>
              </Box>
              <Box
                bg={colors.white}
                rounded={10}
                flex={1}
                w="115px"
                h="150px"
                alignItems="center"
                textAlign="center"
                py={4}
              >
                <VStack space={4} alignItems="center">
                  <Box w="50px" h="50px">
                    <CircularProgressbarWithChildren
                      value={450}
                      maxValue={600}
                      styles={buildStyles({
                        pathColor: colors.primary,
                        trailColor: colors.background,
                      })}
                    >
                      <BodyLarge color={colors.primary}>450</BodyLarge>
                    </CircularProgressbarWithChildren>
                  </Box>
                  <BodyMedium px="1">
                    No of
                    <br />
                    Monthly Targets
                    <br />
                    achievers
                  </BodyMedium>
                </VStack>
              </Box>
              <Box
                bg={colors.white}
                rounded={10}
                flex={1}
                w="115px"
                h="150px"
                alignItems="center"
                textAlign="center"
                py={4}
              >
                <VStack space={4} alignItems="center">
                  <Box w="50px" h="50px">
                    <CircularProgressbarWithChildren
                      value={45}
                      maxValue={100}
                      styles={buildStyles({
                        pathColor: colors.primary,
                        trailColor: colors.background,
                      })}
                    >
                      <BodyLarge color={colors.primary}>45%</BodyLarge>
                    </CircularProgressbarWithChildren>
                  </Box>
                  <BodyMedium px="1">
                    Percentage of
                    <br />
                    monthly target
                    <br />
                    achievers
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
