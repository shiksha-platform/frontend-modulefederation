import {
  BodyLarge,
  BodySmall,
  Collapsible,
  H2,
  H3,
  IconByName,
  Layout,
  ProgressBar,
  overrideColorTheme,
  Caption,
  assessmentRegistryService,
  Loading,
  useWindowSize, studentRegistryService
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
  Spacer,
} from "native-base";
import colorTheme from "../colorTheme";
import moment from "moment";
const colors = overrideColorTheme(colorTheme);

export default function PastAssessmentList({ classId, selectedSubject, schoolDetails }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [width, height] = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [allAssessments, setAllAssessments] = useState();
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


  const getStudentsList = async () => {
    const list = await studentRegistryService.getAll({ classId });
    setStudentlist(list);
    setLoading(false);
  };

  const getALlAssessment = async () => {
    const data = await assessmentRegistryService.getAllAssessment({
      filters: { groupId: classId, subject: selectedSubject },
    });
    setAllAssessments(data);
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

  const getCards = () => {
    let content = [];
    for (let key in allGroupedAssessments) {
      let writtenAssessedStudents = allGroupedAssessments[key].filter((item) => {return item.type === 'Written Assessment'}).length;
      let oralAssessedStudents = allGroupedAssessments[key].filter((item) => {return item.type === 'Oral Assessment'}).length;
      content.push(
        <Box>
          {/*<BodyLarge mb={2}>{allGroupedAssessments[key][0].date}</BodyLarge>*/}
          <BodyLarge mb={2}>{key}</BodyLarge>
          <VStack space={4}>
            <Box
              borderWidth="1"
              borderColor={colors.borderColor}
              borderRadius="10px"
            >
              <VStack space="4">
                <Box p="4" pb="4px" roundedTop="6">
                  <VStack space={2}>
                    <Box>
                      <BodyLarge py="2">
                        {t("Written Spot Assessment")}
                      </BodyLarge>
                    </Box>

                    <ProgressBar
                      isTextShow
                      legendType="separated"
                      h="35px"
                      _bar={{ rounded: "md", mb: "2" }}
                      isLabelCountHide
                      data={
                        [
                          {
                            name: `${writtenAssessedStudents} Assessed`,
                            color: colors.successBarColor,
                            value: writtenAssessedStudents,
                          },
                          {
                            name: `${studentlist.length - writtenAssessedStudents} pending`,
                            color: colors.pendingBarColor,
                            value: studentlist.length - writtenAssessedStudents,
                          },
                        ]
                      }
                    />
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box
              borderWidth="1"
              borderColor={colors.borderColor}
              borderRadius="10px"
            >
              <VStack space="4">
                <Box p="4" pb="4px" roundedTop="6">
                  <VStack space={2}>
                    <Box>
                      <BodyLarge py="2">
                        {t("Oral Spot Assessment")}
                      </BodyLarge>
                    </Box>

                    <ProgressBar
                      isTextShow
                      legendType="separated"
                      h="35px"
                      _bar={{ rounded: "md", mb: "2" }}
                      isLabelCountHide
                      data={
                        [
                          {
                            name: `${oralAssessedStudents} Assessed`,
                            color: colors.successBarColor,
                            value: oralAssessedStudents,
                          },
                          {
                            name: `${studentlist.length - oralAssessedStudents} pending`,
                            color: colors.pendingBarColor,
                            value: studentlist.length - oralAssessedStudents,
                          },
                        ]
                      }
                    />
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Box>
      );
    }
    return content;
  };

  useEffect(() => {
    getStudentsList();
    getALlAssessment();
  }, []);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        title: "Past Assessments",
      }}
      _appBar={{
        languages: ["en"],
        // onPressBackButton: handleBackButton,
      }}
      subHeader={
        <VStack>
          <H2>{selectedSubject}</H2>
          <HStack alignItems={"center"}>
            <Caption color={colors.gray}>{
              schoolDetails && schoolDetails.name
            }</Caption>
            {
              schoolDetails && schoolDetails.section &&
              <Caption color={colors.gray}> {schoolDetails.section}</Caption>
            }
          </HStack>
        </VStack>
      }
      _subHeader={{ bg: colors.cardBg, py: "6" }}
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
      <Box p={4}>
        <>
          <VStack space={12}>
            {
              getCards()
            }
          </VStack>
        </>
      </Box>
    </Layout>
  );
}
