import React, { useState, useEffect } from "react";
import {
  ProgressBar,
  overrideColorTheme,
  BodyLarge,
  BodySmall,
  Subtitle,
} from "@shiksha/common-lib";
import { VStack, Box, Button, Divider } from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const SpotAssessmentCard = ({
  _handleSpotAssessmentStart,
  _viewPastAssessment,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const [chooseSubjectModal, setChooseSubjectModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(
    localStorage.getItem("assessment-subject")
  );
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

  return (
    <>
      {/*========= box1 =============*/}
      <VStack space={4}>
        <BodyLarge>Spot Assessment</BodyLarge>
        <Box
          borderWidth="1"
          borderColor={colors.borderColor}
          borderRadius="10px"
        >
          <VStack space="4">
            <Box p="4" pb="4px" roundedTop="6">
              <VStack space={4}>
                <Box>
                  <BodyLarge py="2">{t("Written Spot Assessment")}</BodyLarge>
                  <BodySmall color={colors.gray}>27, May 2022</BodySmall>
                </Box>

                <ProgressBar
                  isTextShow
                  legendType="separated"
                  h="35px"
                  _bar={{ rounded: "md", mb: "2" }}
                  isLabelCountHide
                  _legendType={{ color: colors.gray }}
                  data={progressAssessment}
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
              <VStack space={4}>
                <Box>
                  <BodyLarge py="2">{t("Oral Spot Assessment")}</BodyLarge>
                  <BodySmall color={colors.gray}>27, May 2022</BodySmall>
                </Box>

                <ProgressBar
                  isTextShow
                  legendType="separated"
                  h="35px"
                  _bar={{ rounded: "md", mb: "2" }}
                  _legendType={{ color: colors.gray }}
                  isLabelCountHide
                  data={progressAssessment}
                />
              </VStack>
            </Box>
          </VStack>
        </Box>

        <Divider mx="4" w="90%"></Divider>
        <Box p="4" pt="4px">
          <Button
            py={3}
            // colorScheme="button"
            _text={{ color: colors.white }}
            onPress={_handleSpotAssessmentStart}
          >
            {t("Continue")}
          </Button>
        </Box>
        <Subtitle
          my={2}
          textAlign={"center"}
          color={colors.primary}
          {..._viewPastAssessment}
        >
          {t("VIEW PAST ASSESSMENTS")}
        </Subtitle>
      </VStack>
    </>
  );
};

export default SpotAssessmentCard;
