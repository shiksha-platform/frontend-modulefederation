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
import { Avatar, HStack, Stack, Text, VStack } from "native-base";
import StudentListCard from "../components/SpotAssessment/StudentList";
import colorTheme from "../colorTheme";
import SpotAssessmentCard from "../components/SpotAssessment/SpotAssessmentCard";
import ExamScoresCard from "../components/ExamScores/ExamScoresCard";

const colors = overrideColorTheme(colorTheme);

export default function Homepage({
  setPageName,
  isLayoutNotRequired,
  _handleSpotAssessmentStart,
}) {
  const { t } = useTranslation();

  if (isLayoutNotRequired) {
    return (
      <Stack space={1} mb="2" shadow={2}>
        <Collapsible
          defaultCollapse={true}
          header={<BodyLarge>{t("Assessment")}</BodyLarge>}
        >
          <VStack py="4" space={4}>
            <SpotAssessmentCard
              setPageName={setPageName}
              _handleSpotAssessmentStart={_handleSpotAssessmentStart}
            />
            <ExamScoresCard setPageName={setPageName} />
          </VStack>
        </Collapsible>
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
      <Stack space={1} mb="2" shadow={2}>
        <Collapsible
          defaultCollapse={true}
          header={<BodyLarge>{t("Assessment")}</BodyLarge>}
        >
          <VStack py="4" space={4}>
            <SpotAssessmentCard
              setPageName={setPageName}
              _handleSpotAssessmentStart={_handleSpotAssessmentStart}
            />
            <ExamScoresCard setPageName={setPageName} />
          </VStack>
        </Collapsible>
      </Stack>
    </Layout>
  );
}
