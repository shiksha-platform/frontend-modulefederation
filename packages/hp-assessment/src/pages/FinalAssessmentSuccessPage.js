import {
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
  H2,
  H3,
  H4,
  ProgressBar,
  overrideColorTheme,
  Caption,
  BodyMedium,
} from "@shiksha/common-lib";
import {
  Button,
  Box,
  VStack,
  Text,
  HStack,
  Divider,
  Avatar,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import nipun_badge from "../stories/assets/nipun_badge.svg";
import nipun_kids from "../stories/assets/nipun_kids.svg";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import colorTheme from "../colorTheme";
import { useNavigate } from "react-router-dom";
const colors = overrideColorTheme(colorTheme);

export default function FinalAssessmentSuccessPage({
  handleBackButton,
  formObject,
}) {
  let orfObtained, orfTotal, writtenNumeracyObtained, writtenNumeracyTotal, writtenLanguageObtained, writtenLanguageTotal;
  orfObtained = JSON.parse(localStorage.getItem('hpAssessment-orf-language-score'))?.obtained;
  let grade = localStorage.getItem('hp-assessment-groupName');
  if (grade == 3) {
    orfTotal = 60
  } else if (grade == 2) {
    orfTotal = 45
  } else if (grade == 1) {
    orfTotal = 10
  }
  writtenNumeracyObtained = JSON.parse(localStorage.getItem('hpAssessment-written-numeracy-score'))?.obtained;
  console.log(writtenNumeracyObtained);
  writtenNumeracyTotal = JSON.parse(localStorage.getItem('hpAssessment-written-numeracy-score'))?.totalScore;
  writtenLanguageObtained = JSON.parse(localStorage.getItem('hpAssessment-written-language-score'))?.obtained;
  writtenLanguageTotal = JSON.parse(localStorage.getItem('hpAssessment-written-language-score'))?.totalScore;
  const [width, height] = useWindowSize();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: "hpAssessment.success",
      value: 12,
    },
    {
      name: "6 pending",
      color: "hpAssessment.unmarked",
      value: 6,
    },
  ]);
  const selectedStudent = JSON.parse(localStorage.getItem('hp-assessment-selectedStudent') || "");

  return (
    <Layout isDisabledAppBar={false}>
      <Loading
        width={width}
        height={height - 230}
        customComponent={
          <VStack space="0" flex="1" width={width}>
            <VStack
              bg="hpAssessment.successBackground"
              pb="100px"
              pt="32px"
              alignItems="center"
            >
              <img
                src={nipun_badge}
                alt="nipun badge"
                style={{ maxWidth: "150px", width: "30%" }}
              />
              <img
                src={nipun_kids}
                alt="nipun kids"
                style={{ maxWidth: "170px", width: "35%" }}
              />
            </VStack>
            <Box
              {...{
                mx: "auto",
                mt: "-40px",
                textAlign: "center",
                position: "relative",
                _text: { textTransform: "inherit" },
              }}
            >
              <VStack>
                <Avatar
                  size="80px"
                  borderRadius="md"
                  source={{
                    uri: "https://via.placeholder.com/50x50.png",
                  }}
                  mb={4}
                  mx={"auto"}
                />
                <H2>{selectedStudent.fullName}</H2>
              </VStack>
            </Box>

            <Box p={4}>
              <VStack space={4}>
                <Box bg="white" rounded={10}>
                  <Box p={4} textAlign="center">
                    <H3>{t("Language")}</H3>
                  </Box>
                  <Divider />
                  <Box p={4}>
                    <HStack justifyContent={grade == 3 ? "space-around" : "center"}>
                      <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={orfObtained}
                          maxValue={orfTotal}
                          styles={buildStyles({
                            pathColor: orfObtained >= orfTotal ? colors.success : colors.danger,
                            textColor: orfObtained >= orfTotal ? colors.success : colors.danger,
                            trailColor: colors.lightGray5,
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <H2 color={orfObtained >= orfTotal ? colors.success : colors.danger}>
                                <H2 bold>{orfObtained}/</H2>
                                <BodyMedium>{orfTotal}</BodyMedium>
                              </H2>
                              <Caption>
                                Correct <br />
                                Words/Minute
                              </Caption>
                            </VStack>
                          </Box>
                        </CircularProgressbarWithChildren>
                      </Box>
                      {grade == 3 && <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={writtenLanguageObtained}
                          maxValue={writtenLanguageTotal}
                          styles={buildStyles({
                            pathColor: (writtenLanguageObtained * 100 / writtenLanguageTotal) >= 75 ? colors.success : colors.danger,
                            textColor: (writtenLanguageObtained * 100 / writtenLanguageTotal) >= 75 ? colors.success : colors.danger,
                            trailColor: colors.lightGray5,
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <H2 color={(writtenLanguageObtained * 100 / writtenLanguageTotal) >= 75 ? colors.success : colors.danger}>
                                <H2 bold>{writtenLanguageObtained * 100 / writtenLanguageTotal}%</H2>
                              </H2>
                              <Caption>
                                Correct <br />
                                Comprehension
                              </Caption>
                            </VStack>
                          </Box>
                        </CircularProgressbarWithChildren>
                      </Box>}

                    </HStack>
                  </Box>
                </Box>
                <Box bg="white" rounded={10}>
                  <Box p={4} textAlign="center">
                    <H3>{t("Numeracy")}</H3>
                  </Box>
                  <Divider />
                  <Box>
                    <HStack justifyContent="space-around" p={4}>
                      <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={writtenNumeracyObtained}
                          maxValue={writtenNumeracyTotal}
                          styles={buildStyles({
                            pathColor: writtenNumeracyObtained * 100 / writtenNumeracyTotal >= 75 ? colors.success : colors.danger,
                            textColor: writtenNumeracyObtained * 100 / writtenNumeracyTotal >= 75 ? colors.success : colors.danger,
                            trailColor: colors.lightGray5,
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <H2 color={writtenNumeracyObtained * 100 / writtenNumeracyTotal >= 75 ? colors.success : colors.danger}>
                                <H2 bold>{writtenNumeracyObtained * 100 / writtenNumeracyTotal}%</H2>
                              </H2>
                              <Caption>
                                Correct <br /> Numeracy
                              </Caption>
                            </VStack>
                          </Box>
                        </CircularProgressbarWithChildren>
                      </Box>
                    </HStack>
                  </Box>
                </Box>
                <Box p="4">
                  <Button
                    colorScheme="hpButton"
                    _text={{
                      color: colors.white,
                    }}
                    onPress={() => {
                      localStorage.removeItem("hp-assessment-selectedStudent");
                      localStorage.removeItem("hp-assessment-selectedStudentId");
                      localStorage.removeItem("hpAssessment-written-language-score");
                      localStorage.removeItem("hpAssessment-written-numeracy-score");
                      localStorage.removeItem("hpAssessment-orf-language-score");
                      localStorage.removeItem("hp-assessment-written-questionIds");
                      localStorage.removeItem("hp-assessment-written-reading-comprehension")
                      navigate("/hpAssessment/student-list");
                    }}
                  >
                    {t("Start Next Student Assessment")}
                  </Button>
                </Box>
              </VStack>
            </Box>
          </VStack>
        }
      />
    </Layout>
  );
}