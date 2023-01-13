import {
  BodyLarge,
  BodyMedium,
  H2,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "manifest.json";
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

import ClassParticipationCard from "../../components/Reports/AssessmentReports/ClassParticipationCard";
import AttendanceSuccessFailureCard from "../../components/Reports/AttendanceReports/AttendanceSuccessFailureCard";
import StudentAttendanceCollapsibleCard from "../../components/Reports/AttendanceReports/StudentAttendanceCollapsibleCard";
import AssessmentAchieverCard from "../../components/Reports/AssessmentReports/AssessmentAchieverCard";
import StudentAssessmentCollapsibleCard from "../../components/Reports/AssessmentReports/StudentAssessmentCollapsibleCard";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function AssessmentDetailedReport({ footerLinks }) {
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
        title: "Report Details",
        subHeading: (
          <VStack>
            <H3 color={"schools.white"}>{t("Summative Assessment 1")}</H3>
            <HStack>
              <IconByName
                name="DownloadLineIcon"
                color={"schools.white"}
                // onPress={() => setSortModal(false)}
              />
              <IconByName
                name="ShareLineIcon"
                color={"schools.white"}
                // onPress={() => setSortModal(false)}
              />
            </HStack>
          </VStack>
        ),
        _subHeading: { color: "schools.white" },
      }}
      subHeader={<H2>View Detailed view of Assessment report</H2>}
      _subHeader={{ bg: "schools.cardBg" }}
      _appBar={{
        languages: manifest.languages,
      }}
      _footer={footerLinks}
    >
      <Box p={6}>
        <VStack space={6}>
          <Box>
            <VStack>
              <H2>Science</H2>
              <HStack align="middle">
                <BodyMedium color={"schools.gray"}>Class I</BodyMedium>
                <Text fontSize="8px" color={"schools.gray"} mx={2}>
                  ●
                </Text>
                <BodyMedium color={"schools.gray"}>Sec A</BodyMedium>
              </HStack>
            </VStack>
          </Box>
          <VStack space={6}>
            <ClassParticipationCard />
            <AssessmentAchieverCard />
            <StudentAssessmentCollapsibleCard />
          </VStack>
        </VStack>
      </Box>

      <Actionsheet
        isOpen={teacherDetailModal}
        onClose={() => setTeacherDetailModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={"schools.lightGray"}>
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
                      color={"schools.bodyText"}
                      _dark={{
                        color: "warmGray.50",
                      }}
                    >
                      Rahul
                    </H3>
                    <BodyLarge color={"schools.gray"}>
                      Class Teacher: VI A
                    </BodyLarge>
                  </VStack>
                </HStack>
              </Box>
            </Stack>
            <Stack pb="15px">
              <IconByName
                name="CloseCircleLineIcon"
                color={"schools.primary"}
                onPress={() => setTeacherDetailModal(false)}
              />
            </Stack>
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={"schools.white"}>
          <VStack space={6}>
            <Box>
              <H3 color={"schools.gray"}>Designation</H3>
              <BodyLarge>Assistant Officer</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Qualifications</H3>
              <BodyLarge>B.Com. Hons</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Phone</H3>
              <BodyLarge>+91 1234 567 890</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Date of Joining</H3>
              <BodyLarge>10 Aug, 2013</BodyLarge>
            </Box>
          </VStack>
        </Box>
      </Actionsheet>
    </Layout>
  );
}
