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
  assessmentRegistryService,
  Loading,
  useWindowSize,
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
  Avatar,
  Spacer,
} from "native-base";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function PastExaminationsList({
  classId,
  selectedSubject,
  schoolDetails,
  footerLinks,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [width, height] = useWindowSize();
  const [loading, setLoading] = useState(false);
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

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        title: "Past Examinations",
      }}
      _appBar={{
        languages: ["en"],
        // onPressBackButton: handleBackButton,
      }}
      subHeader={
        <VStack>
          <H2>{selectedSubject}</H2>
          <HStack alignItems={"center"}>
            <Caption color={colors.gray}>
              {schoolDetails && schoolDetails.name}
            </Caption>
            {schoolDetails && schoolDetails.section && (
              <Caption color={colors.gray}> {schoolDetails.section}</Caption>
            )}
          </HStack>
        </VStack>
      }
      _subHeader={{ bg: colors.cardBg, py: "6" }}
      _footer={footerLinks}
    >
      <Box p={4}>
        <>
          <VStack space={6}>
            <Box
              borderWidth="1"
              borderColor={colors.borderColor}
              borderRadius="10px"
            >
              <VStack space="4">
                <Box p="4" pb="4px" roundedTop="6">
                  <VStack space={4}>
                    <Box>
                      <BodyLarge py="2">
                        {t("Summative Assessment 1")}
                      </BodyLarge>
                      <BodySmall color={colors.gray}>27, May 2022</BodySmall>
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
        </>
      </Box>
    </Layout>
  );
}
