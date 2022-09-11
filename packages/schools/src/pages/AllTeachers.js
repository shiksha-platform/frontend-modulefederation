import {
  BodyLarge,
  H2,
  H3,
  H4,
  IconByName,
  Layout,
  Loading,
  userRegistryService,
  mentorRegisteryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import TeacherTile from "components/TeacherTile";

export default function AllTeachers({ footerLinks }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [teacherlist, setTeacherList] = useState([]);
  const [teacherData, setTeacherData] = useState(null);
  const [visitedSchoolsData, setVisitedSchoolsData] = useState(null);
  const { schoolId } = useParams();

  useEffect(async () => {
    const data = await userRegistryService.getAll({
      schoolId: { eq: schoolId },
      role: { eq: "Teacher" },
    });
    setTeacherList(data);

    const visitedData = await mentorRegisteryService.getAllAllocatedSchools({
      mentorId: localStorage.getItem("id"),
      schoolId,
    });
    setVisitedSchoolsData(() => visitedData);
  }, []);

  return (
    <Layout
      _header={{
        title: t("MY_VISITS"),
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={<H2 textTransform="inherit">{t("VIEW_ALL_TEACHERS")}</H2>}
      _subHeader={{ bg: "schools.cardBg" }}
      _footer={footerLinks}
    >
      <Box p={6} bg={"schools.white"}>
        <VStack space={6}>
          <VStack space={6}>
            {teacherlist && teacherlist?.length > 0 ? (
              teacherlist?.map((teacher, index) => {
                return (
                  <TeacherTile
                    key={`teacher${index}`}
                    teacher={teacher}
                    index={index}
                    setTeacherData={setTeacherData}
                    visitedData={visitedSchoolsData}
                  />
                );
              })
            ) : (
              <Loading height={"200px"} />
            )}
          </VStack>
        </VStack>
      </Box>

      {teacherData && visitedSchoolsData && (
        <Actionsheet isOpen={teacherData} onClose={() => setTeacherData()}>
          <Actionsheet.Content alignItems={"left"} bg={"schools.cardBg"}>
            <HStack justifyContent={"space-between"} alignItems="center">
              <Stack p={5} pt={2} pb="15px">
                <Box>
                  <HStack alignItems="center" space={3}>
                    <Avatar
                      size="48px"
                      borderRadius="md"
                      source={{
                        uri: teacherData.image ? teacherData.image : "",
                      }}
                      bg={"schools.primary"}
                    >
                      <H2 color={"schools.white"}>
                        {teacherData?.firstName?.slice(0, 2).toUpperCase()}
                      </H2>
                    </Avatar>
                    <HStack>
                      <H3
                        color={"schools.bodyText"}
                        _dark={{
                          color: "schools.darkGray2",
                        }}
                        marginTop="5px"
                      >
                        {`${teacherData.firstName} ${teacherData.lastName}`}
                      </H3>
                      {visitedSchoolsData &&
                        visitedSchoolsData?.find(
                          (data) => data?.teacherId === teacherData?.id
                        ) && (
                          <Box>
                            <IconByName
                              _icon={{ size: "16" }}
                              borderRadius="full"
                              bg={"schools.primary"}
                              color={"schools.white"}
                              name="UserLineIcon"
                              marginLeft="15px"
                            />
                          </Box>
                        )}
                    </HStack>
                  </HStack>
                </Box>
              </Stack>
              <Stack pb="15px">
                <IconByName
                  name="CloseCircleLineIcon"
                  color={"schools.darkGray2"}
                  onPress={() => setTeacherData()}
                />
              </Stack>
            </HStack>
          </Actionsheet.Content>
          <Box w="100%" p={4} justifyContent="center" bg={"schools.white"}>
            <VStack space={6}>
              <Box>
                <H4 color={"schools.gray"}>{t("DESIGNATION")}</H4>
                <BodyLarge>{teacherData?.designation}</BodyLarge>
              </Box>
              <Box>
                <H4 color={"schools.gray"}>{t("QUALIFICATIONS")}</H4>
                <BodyLarge>{teacherData?.profQualification}</BodyLarge>
              </Box>
              <Box>
                <H4 color={"schools.gray"}>{t("PHONE")}</H4>
                <BodyLarge>{teacherData?.phoneNumber}</BodyLarge>
              </Box>
              <Box>
                <H4 color={"schools.gray"}>{t("DATE_OF_JOINING")}</H4>
                <BodyLarge>{teacherData?.joiningDate}</BodyLarge>
              </Box>
            </VStack>
            <Divider marginTop={6} />
            <Button
              variant={"outline"}
              marginTop={6}
              onPress={(e) =>
                navigate(`/schools/teacher-details/${teacherData.id}`)
              }
            >
              {t("SEE_MORE")}
            </Button>
          </Box>
        </Actionsheet>
      )}
    </Layout>
  );
}
