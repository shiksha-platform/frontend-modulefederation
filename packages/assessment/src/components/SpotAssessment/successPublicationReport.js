import {
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
  H2,
  H3,
  ProgressBar,
  overrideColorTheme,
  BodyLarge,
  Caption,
  Subtitle,
  capture,
  telemetryFactory, assessmentRegistryService, studentRegistryService
} from "@shiksha/common-lib";
import { Button, Box, VStack, Text, HStack, Avatar } from "native-base";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import manifest from "../../manifest.json";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../colorTheme";
import moment from "moment";
const colors = overrideColorTheme(colorTheme);

export default function SuccessPublicationReport({
  appName,
  classId,
  selectedSubject,
  schoolDetails,
}) {
  const [width, height] = useWindowSize();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allGroupedAssessments, setAllGroupedAssessments] = useState({});
  const [studentlist, setStudentlist] = useState([]);

  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: colors.successBarColor,
      value: 12,
    },
    {
      name: "6 pending",
      color: colors.pendingBarColor,
      value: 6,
    },
  ]);

  useEffect(()=> {
    getStudentsList();
    getAllAssessment();
  }, [])


  const getStudentsList = async () => {
    const list = await studentRegistryService.getAll({ classId });
    setStudentlist(list);
    setLoading(false);
  };

  const _handleSpotAssessmentNotificationSend = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Notification-Send",
    });
    capture("INTERACT", telemetryData);
    navigate("notification/create?module=Assessment")
  };

  const handleFullReportClick = () => {
    // _handleFullReportStartEvent();
    navigate("/assessment-detailed-report");
  };

  const getAllAssessment = async () => {
    const data = await assessmentRegistryService.getAllAssessment({
      filters: { groupId: classId, subject: selectedSubject },
    });
    data.forEach((item) => {
      item.date = moment(item.createdAt).format("MM-DD-YYYY");
    });
    const groupedAssessments = groupBy(data, "date");
    setAllGroupedAssessments(groupedAssessments);
    setLoading(false);
  };

  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const getCard = (type) => {
    let content = [];
    for (let key in allGroupedAssessments) {
      // if(key === moment().format('MM-DD-YYYY')){
      if(key === '07-28-2022'){
        let writtenAssessedStudents = allGroupedAssessments[key].filter(
          (item) => {
            return item.type === "Written Assessment";
          }
        ).length;
        let oralAssessedStudents = allGroupedAssessments[key].filter((item) => {
          return item.type === "Oral Assessment";
        }).length;
        content.push(
          <FailureCard type={type} writtenAssessedStudents={writtenAssessedStudents} oralAssessedStudents={oralAssessedStudents} />
        );
      }
    }
    return content;
  };

  const FailureCard = ({type, oralAssessedStudents, writtenAssessedStudents}) => {
    return (
      <Box borderRadius="md">
        <VStack>
          <Box
            px="4"
            py={2}
            bg={colors.scoreCardIcon2}
            roundedTop="6"
          >
            <HStack alignItems="center">
              <IconByName
                name="EmotionSadLineIcon"
                pr="0"
                color={colors.white}
              />
              <Subtitle color={colors.white}>
                {" "}
                Poor overall performance!
              </Subtitle>
            </HStack>
          </Box>
          <Box p="4" bg={colors.QuationsBoxContentBg}>
            <VStack flex="auto" alignContent={"center"}>
              {
                type === 'oral' ?
                  <ProgressBar
                    isTextShow
                    legendType="separated"
                    h="35px"
                    _bar={{ rounded: "md", mb: "2" }}
                    isLabelCountHide
                    _legendType={{ color: colors.gray }}
                    data={[
                      {
                        name: `${oralAssessedStudents} Assessed`,
                        color: colors.successBarColor,
                        value: oralAssessedStudents,
                      },
                      {
                        name: `${
                          studentlist.length - oralAssessedStudents
                        } pending`,
                        color: colors.pendingBarColor,
                        value: studentlist.length - oralAssessedStudents,
                      },
                    ]}
                  />
                  :
                  <ProgressBar
                    isTextShow
                    legendType="separated"
                    h="35px"
                    _bar={{ rounded: "md", mb: "2" }}
                    isLabelCountHide
                    _legendType={{ color: colors.gray }}
                    data={[
                      {
                        name: `${writtenAssessedStudents} Assessed`,
                        color: colors.successBarColor,
                        value: writtenAssessedStudents,
                      },
                      {
                        name: `${
                          studentlist.length - writtenAssessedStudents
                        } pending`,
                        color: colors.pendingBarColor,
                        value: studentlist.length - writtenAssessedStudents,
                      },
                    ]}
                  />
              }
            </VStack>
          </Box>
          <Box
            p="4"
            bg={colors.QuationsBoxBg}
            borderBottomRadius={6}
            textAlign="center"
          >
            {
              type === 'oral' ?
                <Subtitle>
                  Average correct words/minute is <H2>12</H2>
                </Subtitle>
                :
                <Subtitle>
                  Average Class Score is <H2 bold>18</H2> out of{" "}
                  <H2>25</H2>
                </Subtitle>
            }
          </Box>
        </VStack>
      </Box>
    )
  }

  return (
    <Layout
      _appBar={{
        // onPressBackButton: handleBackButton
        //   ? handleBackButton
        //   : (e) => console.log(e),
        languages: manifest.languages,
        color: colors.success,
        _box: { bg: colors.bgSuccessAlert },
      }}
    >
      <Loading
        width={width}
        height={height - 230}
        customComponent={
          <VStack space="0" flex="1" width={width}>
            <VStack bg={colors.bgSuccessAlert} pb="100px" pt="32px">
              <IconByName
                alignSelf="center"
                name="CheckboxCircleFillIcon"
                color={colors.success}
                _icon={{ size: 100 }}
              />
              <Box alignItems="center">
                <H1 color={colors.success}>Completed</H1>
                <BodyLarge color={colors.success}>
                  Your spot assessment successfully
                </BodyLarge>
              </Box>
            </VStack>
            <Box
              {...{
                p: 4,
                mt: -30,
                position: "relative",
                bg: colors.reportDetailsSubheaderBg,
                roundedTop: "20",
                _text: { textTransform: "inherit" },
              }}
            >
              <VStack>
                <H2>{selectedSubject}</H2>
                <HStack alignItems={"center"}>
                  <Caption color={colors.gray}>
                    Class {schoolDetails && schoolDetails.name}
                  </Caption>
                  {schoolDetails && schoolDetails.section && (
                    <>
                      <Caption color={colors.lightGray0}> ●</Caption>{" "}
                      <Caption color={colors.gray}> {schoolDetails.section}</Caption>
                    </>
                  )}
                </HStack>
              </VStack>
            </Box>

            <Box>
              <VStack space={2}>
                <Box p={4} bg={colors.white}>
                  <VStack space={6}>
                    <Box>
                      <VStack space={2}>
                        <H2>Class Participation in Oral Assessments</H2>
                        {
                          getCard('oral')
                        }
                      </VStack>
                    </Box>

                    <Box>
                      <VStack space={2}>
                        <H2>Class Participation in Written Assessments</H2>
                        {
                          getCard('written')
                        }
                      </VStack>
                    </Box>
                  </VStack>
                </Box>

                <Box p={4} justifyContent="center" bg={colors.white}>
                  <H2>20 Students Assessed</H2>
                  <Subtitle color={colors.gray} mb="4">
                    Assessment SMS will be sent to selected students
                  </Subtitle>

                  <Box py="2">
                    <HStack justifyContent={"space-between"}>
                      <Button
                        colorScheme="button"
                        variant="outline"
                        w="45%"
                        onPress={()=> navigate("/notification?module=Assessment")}
                      >
                        {t("View Message")}
                      </Button>

                      <Button
                        colorScheme="button"
                        w="50%"
                        _text={{
                          color: colors.white,
                        }}
                        onPress={() => {
                          _handleSpotAssessmentNotificationSend();
                        }}
                      >
                        {t("Send Another message")}
                      </Button>
                    </HStack>
                  </Box>
                </Box>
                <Box p={4} bg={colors.white}>
                  <Box py="4" bg={colors.white}>
                    <VStack space={4}>
                      <H2 mb={3}>100% Achievers</H2>
                      <Box p={4} bg={colors.achiverBoxBg} rounded="10">
                        <HStack space={2} justifyContent="space-between">
                          <Box textAlign={"center"}>
                            <VStack space={1}>
                              <Avatar
                                size="48px"
                                mx="auto"
                                borderRadius="md"
                                source={{
                                  uri: "https://via.placeholder.com/50x50.png",
                                }}
                              />
                              <H3>Shivani Joshi</H3>
                              <Subtitle color={colors.gray}>
                                Roll No 11
                              </Subtitle>
                            </VStack>
                          </Box>

                          <Box textAlign={"center"}>
                            <VStack space={1}>
                              <Avatar
                                size="48px"
                                mx="auto"
                                borderRadius="md"
                                source={{
                                  uri: "https://via.placeholder.com/50x50.png",
                                }}
                              />
                              <H3>Shivani Joshi</H3>
                              <Subtitle color={colors.gray}>
                                Roll No 11
                              </Subtitle>
                            </VStack>
                          </Box>

                          <Box textAlign={"center"}>
                            <VStack space={1}>
                              <Avatar
                                size="48px"
                                mx="auto"
                                borderRadius="md"
                                source={{
                                  uri: "https://via.placeholder.com/50x50.png",
                                }}
                              />
                              <H3>Shivani Joshi</H3>
                              <Subtitle color={colors.gray}>
                                Roll No 11
                              </Subtitle>
                            </VStack>
                          </Box>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                  <Box mt={4}>
                    <HStack justifyContent={"space-between"}>
                      <Button
                        colorScheme="button"
                        variant="outline"
                        w="45%"
                        mr="2"
                        // onPress={()=> setSelectedStudent()}
                      >
                        {t("Close")}
                      </Button>

                      <Button
                        colorScheme="button"
                        w="50%"
                        ml="2"
                        _text={{
                          color: colors.white,
                        }}
                        /*onPress={() =>
                          navigate("/assessment/assessment-detailed-report")
                        }*/
                        onPress={handleFullReportClick}
                      >
                        {t("See full report")}
                      </Button>
                    </HStack>
                  </Box>
                </Box>
              </VStack>
            </Box>
          </VStack>
        }
      />
      {/*<Box
        bg="white"
        p="5"
        position="fixed"
        bottom="0"
        shadow={2}
        width={width}
      >
        <HStack justifyContent={'space-between'}>
                      <Button
                        colorScheme="button"
                        variant="outline"
                        _text={{
                          fontSize: '14px',
                          p:'1'
                        }}
                        // onPress={()=> setSelectedStudent()}
                      >
                        {t("View Message")}
                      </Button>

                      <Button
                        colorScheme="button"
                        _text={{
                          color: '#fff',
                          fontSize: '14px',
                          p:'1'
                        }}
                      >
                        {t("Send Another message")}
                      </Button>
                    </HStack>
      </Box>*/}
    </Layout>
  );
}
