import {
  BodyLarge,
  H2,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "native-base";

import ClassSectionCollapsibleCard from "../../components/Reports/AssessmentReports/ClassSectionCollapsibleCard";
import ExaminationTypeFilterButton from "../../components/Reports/AssessmentReports/ExaminationTypeFilterButton";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function AssessmentSectionWiseReport() {
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState([{}, {}, {}, {}]);
  const [teacherDetailModal, setTeacherDetailModal] = useState(false);

  const [teacherlist, setTeacherList] = useState([]);

  React.useEffect(() => {
    setTeacherList([
      {
        id: 1,
        name: "Rahul",
        class: "VI A",
      },
      {
        id: 2,
        name: "Rahul",
        class: "VI A",
      },
      {
        id: 3,
        name: "Rahul",
        class: "VI A",
      },
    ]);
  }, []);

  return (
    <Layout
      _header={{
        title: "Class I Assessment Reports",
        _heading: { color: colors.white },
      }}
      _appBar={{
        languages: ["en"],
        isEnableSearchBtn: true,
      }}
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
            title: "VISITS",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/my-visits",
            routeparameters: {},
          },
          {
            title: "LEARNING",
            icon: "LightbulbFlashLineIcon",
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
            title: "PROFILE",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <Box p={6}>
        <VStack space={6}>
          <Box>
            <HStack justifyContent="end">
              <ExaminationTypeFilterButton />
            </HStack>
          </Box>
          <VStack space={6}>
            <ClassSectionCollapsibleCard />
            <ClassSectionCollapsibleCard />
            <ClassSectionCollapsibleCard />
          </VStack>
        </VStack>
      </Box>

      <Actionsheet
        isOpen={teacherDetailModal}
        onClose={() => setTeacherDetailModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.lightGray}>
          <HStack justifyContent={"space-between"} alignItems="center">
            <Stack p={5} pt={2} pb="15px">
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
                    <H3
                      color={colors.bodyText}
                      _dark={{
                        color: "warmGray.50",
                      }}
                    >
                      Rahul
                    </H3>
                    <BodyLarge color={colors.subtitle}>
                      Class Teacher: VI A
                    </BodyLarge>
                  </VStack>
                </HStack>
              </Box>
            </Stack>
            <Stack pb="15px">
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.primary}
                onPress={() => setTeacherDetailModal(false)}
              />
            </Stack>
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={colors.white}>
          <VStack space={6}>
            <Box>
              <H3 color={colors.subtitle}>Designation</H3>
              <BodyLarge>Assistant Officer</BodyLarge>
            </Box>
            <Box>
              <H3 color={colors.subtitle}>Qualifications</H3>
              <BodyLarge>B.Com. Hons</BodyLarge>
            </Box>
            <Box>
              <H3 color={colors.subtitle}>Phone</H3>
              <BodyLarge>+91 1234 567 890</BodyLarge>
            </Box>
            <Box>
              <H3 color={colors.subtitle}>Date of Joining</H3>
              <BodyLarge>10 Aug, 2013</BodyLarge>
            </Box>
          </VStack>
        </Box>
      </Actionsheet>
    </Layout>
  );
}
