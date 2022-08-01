import React from "react";
import { IconByName, Layout, SubMenu, Tab, Collapsible, H2, overrideColorTheme } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
  Accordion,
  BodyLarge,
} from "native-base";
import { lessonPlansList } from "components/config/lessonPlansList";
//import { Chapters } from "components/config/Chapters";
import { useNavigate } from "react-router-dom";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
import LessonPlansCard from "components/LessonPlansCard";
const colors = overrideColorTheme(colorTheme);

export default function LessonPlansDetails({ footerLinks }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout
      _header={{
        title: t("LESSON_PLANS"),
      }}
      _appBar={{ languages: manifest.languages, isEnableSearchBtn: true, setSearch: (e) => { console.log(e); } }}
      subHeader={t("CHOOSE_A_LESSON_FOR_CLASS_V_A")}
      _subHeader={{ bg: "worksheetCard.500" }}
      _footer={footerLinks}
    >
      <VStack>
        <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
          <Tab
            routes={[
              {
                title: t("LESSON_PLANS"),
                component: (
                  <VStack>
                    <LessonPlansMapping
                      data={lessonPlansList}
                      leftTitle="LESSON_PLANS"
                      rightTitle="EXPLORE_LESSON_PLANS"
                      seeButtonText={t("SEE_ALL_LESSON_PLANS")}
                    />
                  </VStack>
                ),
              },
            ]}
          />
        </Box>
      </VStack>
    </Layout>
  );
}

const LessonPlansMapping = ({
  data,
  leftTitle,
  rightTitle,
  seeButton,
  seeButtonText,
  _woksheetBox
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack>
      <HStack justifyContent="space-between" py="5" alignItems="center">
        {leftTitle ? <H2>{t(leftTitle)}</H2> : ""}
        {rightTitle ? (
          <Button variant="ghost" onPress={(e) => navigate("/lessonplans/list")}>
            <Text color={colors.primary}>{t(rightTitle)}</Text>
          </Button>
        ) : (
          ""
        )}
      </HStack>
      <VStack space={3}>
        {data.map((item, index) => {
          return (
            <LessonPlansCard
              canShare={true}
              key={index}
              {...{ item, url: `/lessonplan/${item.id}` }}
            />
          );
        })}
      </VStack>
    </Stack>
  );
};

