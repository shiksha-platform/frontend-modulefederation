import {
  BodyLarge,
  Collapsible,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React from "react";
import { HStack, Stack, Text, VStack } from "native-base";
import colorTheme from "../colorTheme";
import SpotAssessmentCard from "../components/SpotAssessment/SpotAssessmentCard";
import ExamScoresCard from "../components/ExamScores/ExamScoresCard";
import { useNavigate } from "react-router-dom";

const colors = overrideColorTheme(colorTheme);

export default function Homepage({
  classId,
  subject,
  setPageName,
  footerLinks,
  isLayoutNotRequired,
  _handleSpotAssessmentStart,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isLayoutNotRequired) {
    return (
      <Stack space={1} mb="2">
        <VStack py="4" space={4}>
          <SpotAssessmentCard
            _viewPastAssessment={{
              onPress: () => {
                navigate(`/assessment/past-assessments/${classId}/${subject}`);
              },
            }}
            _handleSpotAssessmentStart={_handleSpotAssessmentStart}
          />
          <ExamScoresCard setPageName={setPageName} />
        </VStack>
      </Stack>
    );
  }

  return (
    <Layout
      _header={{
        title: "Spot Assessment",
        isEnableSearchBtn: true,
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={
        <HStack space="4" justifyContent="space-between">
          <VStack>
            <Text fontSize={"lg"}>{"Assessment"}</Text>
          </VStack>
          <IconByName size="sm" name="ArrowRightSLineIcon" />
        </HStack>
      }
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <Stack space={1} mb="2" shadow={2}>
        <Collapsible
          defaultCollapse={true}
          header={<BodyLarge>{t("Assessment")}</BodyLarge>}
        >
          <VStack py="4" space={4}>
            <SpotAssessmentCard
              _viewPastAssessment={{
                onPress: () => {
                  navigate(
                    `/assessment/past-assessments/${classId}/${subject}`
                  );
                },
              }}
              _handleSpotAssessmentStart={_handleSpotAssessmentStart}
            />
            <ExamScoresCard setPageName={setPageName} />
          </VStack>
        </Collapsible>
      </Stack>
    </Layout>
  );
}
