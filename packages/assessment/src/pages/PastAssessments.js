import {
  BodyLarge,
  BodySmall,
  Collapsible,
  H2,
  H3,
  IconByName,
  Layout,
  ProgressBar,
  overrideColorTheme,
  Caption,
  assessmentRegistryService, Loading, useWindowSize
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  HStack,
  Text,
  VStack,
  Button,
  Actionsheet,
  Stack,
  Divider,
  Avatar, Spacer
} from "native-base";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function PastAssessmentList({classId}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [width, height] = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [allAssessments, setAllAssessments] = useState();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: colors.successBarColor,
      value: 12,
    },
    {
      name: "6 pending",
      color: colors.pendingBarColor,
      value: 6,
    },
  ]);

  const getALlAssessment = async () => {
    const data = await assessmentRegistryService.getAllAssessment({filters: {groupId: classId}});
    console.log(data);
    setAllAssessments(data);
    setLoading(false);
  }

  useEffect(()=> {
    getALlAssessment();
  }, [])

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        title: 'Past Assessments',
      }}
      _appBar={{
        languages: ["en"],
        // onPressBackButton: handleBackButton,
      }}
      subHeader={
        <VStack>
          <H2>{t("Science")}</H2>
          <HStack alignItems={"center"}>
            <Caption color={colors.gray}>{t("Class VI")}</Caption>{" "}
            <Caption color={colors.gray}> {t(" A")}</Caption>
          </HStack>
        </VStack>
      }
      _subHeader={{ bg: colors.cardBg, py: "6" }}
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
      <Box p={4}>
        <>
          <VStack space={12}>
            {/*  card  */}

            {
              allAssessments && allAssessments.length > 0 && allAssessments.map((item) => {
                return (
                  <Box>
                    <BodyLarge mb={2}>27, July 2022</BodyLarge>
                    <VStack space={4}>
                      <Box
                        borderWidth="1"
                        borderColor={colors.borderColor}
                        borderRadius="10px"
                      >
                        <VStack space="4">
                          <Box p="4" pb="4px" roundedTop="6">
                            <VStack space={2}>
                              <Box>
                                <BodyLarge py="2">{t("Written Spot Assessment")}</BodyLarge>
                              </Box>

                              <ProgressBar
                                isTextShow
                                legendType="separated"
                                h="35px"
                                _bar={{ rounded: "md", mb: "2" }}
                                isLabelCountHide
                                data={progressAssessment}
                              />
                            </VStack>
                          </Box>
                        </VStack>
                      </Box>

                      <Box
                        borderWidth="1"
                        borderColor={colors.borderColor}
                        borderRadius="10px"
                      >
                        <VStack space="4">
                          <Box p="4" pb="4px" roundedTop="6">
                            <VStack space={2}>
                              <Box>
                                <BodyLarge py="2">{t("Oral Spot Assessment")}</BodyLarge>
                              </Box>

                              <ProgressBar
                                isTextShow
                                legendType="separated"
                                h="35px"
                                _bar={{ rounded: "md", mb: "2" }}
                                isLabelCountHide
                                data={progressAssessment}
                              />
                            </VStack>
                          </Box>
                        </VStack>
                      </Box>
                    </VStack>
                  </Box>
                )
              })
            }
          </VStack>
        </>
      </Box>
    </Layout>
  );
}
