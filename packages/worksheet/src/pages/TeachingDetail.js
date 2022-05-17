import React from "react";
import { IconByName, Layout, SubMenu, Tab } from "@shiksha/common-lib";
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
} from "native-base";
import { worksheets } from "./../config/worksheet";
import { useNavigate } from "react-router-dom";
import manifest from "../manifest.json";
import WorksheetBox from "components/WorksheertBox";

export default function TeachingDetail({ footerLinks, appName }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout
      _header={{
        title: t("MY_TEACHING"),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("ACCESS_AND_PLAN_YOUR_TEACHING_MATERIAL")}
      _subHeader={{ bg: "worksheetCard.500" }}
      _footer={footerLinks}
    >
      <VStack>
        <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
          <Tab
            routes={[
              {
                title: t("Worksheets"),
                component: (
                  <VStack>
                    <Worksheets
                      data={worksheets}
                      leftTitle="Popular This Week"
                      rightTitle="Explore Questions"
                    />
                    <Worksheets
                      data={worksheets}
                      leftTitle="My Worksheets"
                      rightTitle="Explore Worksheets"
                    />
                    <Worksheets data={worksheets} leftTitle="Drafts" />
                  </VStack>
                ),
              },
              { title: t("Lesson Plans"), component: <LessonPlans /> },
            ]}
          />
        </Box>
      </VStack>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button
          _text={{ color: "white" }}
          p="3"
          onPress={(e) => navigate("/worksheet/create")}
        >
          {t("Create new")}
        </Button>
      </Box>
    </Layout>
  );
}

const Worksheets = ({ data, leftTitle, rightTitle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack>
      <HStack justifyContent="space-between" py="5">
        {leftTitle ? (
          <Text fontWeight="600" fontSize="16px">
            {leftTitle}
          </Text>
        ) : (
          ""
        )}
        {rightTitle ? (
          <Button variant="ghost" onPress={(e) => navigate("/questionBank")}>
            <Text fontWeight="500" fontSize="14px" color={"button.500"}>
              {rightTitle}
            </Text>
          </Button>
        ) : (
          ""
        )}
      </HStack>
      <VStack space={3}>
        {data.map((item, index) => {
          return (
            <WorksheetBox
              canShare={true}
              key={index}
              {...{ item, url: `/${item.id}` }}
            />
          );
        })}
      </VStack>
    </Stack>
  );
};

const LessonPlans = () => {
  return <h4>LessonPlans</h4>;
};
