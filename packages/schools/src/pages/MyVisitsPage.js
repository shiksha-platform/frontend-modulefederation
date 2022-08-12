import {
  BodyLarge,
  BodyMedium,
  H2,
  H3,
  H4,
  IconByName,
  Layout,
  overrideColorTheme,
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
} from "native-base";
import TeacherTile from "../components/TeacherTile";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function Myvisitspage({ footerLinks }) {
  const { t } = useTranslation();
  const [teacherDetailModal, setTeacherDetailModal] = useState(false);
  const navigate = useNavigate();
  const [teacherlist, setTeacherList] = useState([]);

  useEffect(() => {
    setTeacherList([
      {
        id: 1,
        name: "Chandan Pandit",
        class: "VI A",
      },
      {
        id: 2,
        name: "Sudesh Sharma",
        class: "VI A",
      },
      {
        id: 3,
        name: "Nikita Singh",
        class: "VI A",
      },
      {
        id: 4,
        name: "Mahesh Yadav",
        class: "VI A",
      },
      {
        id: 5,
        name: "Tej Prakash",
        class: "VI A",
      },
      {
        id: 6,
        name: "Pratik Verma",
        class: "VI A",
      },
    ]);
  }, []);

  return (
    <Layout
      _header={{
        title: "My Visits",
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={<H2 textTransform="inherit">View all teachers</H2>}
      _subHeader={{ bg: "schools.cardBg" }}
      _footer={footerLinks}
    >
      <Box p={6} bg={"schools.white"}>
        <VStack space={6}>
          <VStack space={6}>
            {teacherlist &&
              teacherlist.length &&
              teacherlist.map((teacher, index) => {
                return (
                  <TeacherTile
                    key={`teacher${index}`}
                    teacher={teacher}
                    index={index}
                    setTeacherDetailModal={setTeacherDetailModal}
                  />
                );
              })}
          </VStack>
        </VStack>
      </Box>

      <Actionsheet
        isOpen={teacherDetailModal}
        onClose={() => setTeacherDetailModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={"schools.cardBg"}>
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
                        color: "schools.darkGray2",
                      }}
                    >
                      Rahul
                    </H3>
                    <BodyMedium color={"schools.gray"}>
                      Class Teacher: VI A
                    </BodyMedium>
                  </VStack>
                </HStack>
              </Box>
            </Stack>
            <Stack pb="15px">
              <IconByName
                name="CloseCircleLineIcon"
                color={"schools.darkGray2"}
                onPress={() => setTeacherDetailModal(false)}
              />
            </Stack>
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={"schools.white"}>
          <VStack space={6}>
            <Box>
              <H4 color={"schools.gray"}>Qualifications</H4>
              <BodyLarge>Assistant Officer</BodyLarge>
            </Box>
            <Box>
              <H4 color={"schools.gray"}>Qualifications</H4>
              <BodyLarge>B.Com. Hons</BodyLarge>
            </Box>
            <Box>
              <H4 color={"schools.gray"}>Phone</H4>
              <BodyLarge>+91 1234 567 890</BodyLarge>
            </Box>
            <Box>
              <H4 color={"schools.gray"}>Date of Joining</H4>
              <BodyLarge>10 Aug, 2013</BodyLarge>
            </Box>
          </VStack>
          <Divider marginTop={6} />
          <Button
            variant={"outline"}
            marginTop={6}
            onPress={(e) => navigate("/schools/teacher-details")}
          >
            See More
          </Button>
        </Box>
      </Actionsheet>
    </Layout>
  );
}
