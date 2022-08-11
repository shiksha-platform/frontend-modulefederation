import Reacttra from "react";
import { Layout, H2, IconByName, Caption, overrideColorTheme, H1, BodyLarge } from "@shiksha/common-lib";
import { Link } from "react-router-dom";
import { Box, HStack, Text, VStack, Button } from "native-base";
import SchoolCard from "../components/SchoolCard";
import colorTheme from "../colorTheme";
import { useTranslation } from "react-i18next";
import React from "react";
const colors = overrideColorTheme(colorTheme);

export default function AllocatedSchools() {
  const { t } = useTranslation();
  return (
    <Layout
      _header={{
        // title: "My Schools",
        // subHeading: "View your schools for Nipun Vidalaya Evaluation",
        title: (
          <VStack>
            <H1>My Schools</H1>
            <BodyLarge>{t("View your schools for Nipun Vidalaya Evaluation")}</BodyLarge>
          </VStack>
        ),
        isEnableSearchBtn: true,
      }}
      subHeader={
        <HStack space="4" justifyContent="space-between">
          <VStack>
            <Text fontSize={"lg"} bold>Allocated Schools</Text>
            <HStack alignItems={"center"}>
              <Caption>
                {t("Total Schools for Evaluation ") + 5}
              </Caption>{" "}
              <Caption fontSize={2}> •</Caption>{" "}
              <Caption>
                {" "}
                {t("Pending ") + 4}
              </Caption>
            </HStack>
          </VStack>
        </HStack>
      }
      _subHeader={{ bg: colors.cardBg }}
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
      <Box p={4}>
        <VStack space={4}>
          <SchoolCard status={'pending'} />
          <SchoolCard status={'ongoing'} />
          <SchoolCard status={'complete'} />
          <SchoolCard status={'completeWithNipun'} />
        </VStack>
      </Box>
    </Layout>
  );
}
