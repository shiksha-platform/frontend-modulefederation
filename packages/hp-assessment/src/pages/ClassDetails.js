import { H2, IconByName, Layout, ProgressBar, overrideColorTheme } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Button } from "native-base";
import SchoolAcademicDetailCard from "../components/SchoolAcademicDetailCard";
import nipun_badge from "../stories/assets/nipun_badge.svg"
import colorTheme from "../colorTheme";
import ClassAssessmentResultCollapsibleCard from "../components/ClassAssessmentResultCollapsibleCard";
import ClassParticipationCollapsibleCard from "../components/ClassParticipationCollapsibleCard";
const colors = overrideColorTheme(colorTheme);

export default function ClassDetails() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout
      _header={{
        title: "Class Details",
        subHeading: 'Grade I',
      }}
      _appBar={{
        languages: ["en"],
      }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            route: "/",
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            route: "/classes",
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            route: "/",
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            route: "/",
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            route: "/",
          },
        ],
      }}
    >
      <>
        <Box p={4} bg={colors.white}>
          <Button
            colorScheme={"button"}
            _text={{ color: colors.white }}
            isDisabled={false}
            onPress={()=> {navigate('/student-list')}}
          >
            {t('Conduct Student Assessment')}
          </Button>
        </Box>
        <Box p={4}>
          <VStack space={4}>
            <ClassParticipationCollapsibleCard />
            <ClassAssessmentResultCollapsibleCard />
          </VStack>
        </Box>
      </>
    </Layout>
  );
}
