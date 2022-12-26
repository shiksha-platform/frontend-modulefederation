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
  H4,
  hpAssessmentRegistryService,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  VStack,
  Text,
  HStack,
  Divider,
  Avatar,
} from "native-base";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import nipun_ready_badge from "../stories/assets/nipun_ready-badge.png";
// import nipun_ready_kids from "../stories/assets/nipun_ready_kids.svg";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import colorTheme from "../colorTheme";
import SchoolAssessmentProgressBox from "../components/ClassAssessmentProgressBox";
import nipun_badge from "../stories/assets/nipun_badge.svg";
const colors = overrideColorTheme(colorTheme);

export default function SchoolReport({ handleBackButton, formObject }) {
  const [width, height] = useWindowSize();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schoolStatus = localStorage.getItem("hp-assessment-school-status");

  return (
    <Layout isDisabledAppBar={false}>
      <Loading
        width={width}
        height={height - 230}
        customComponent={
          <VStack space="0" flex="1" width={width}>
            {schoolStatus === "NIPUN" ? (
              <VStack
                bg="hpAssessment.successBackground"
                pb="100px"
                pt="32px"
                alignItems="center"
                space={8}
                position={"relative"}
              >
                <IconByName
                  name="DownloadLineIcon"
                  position="absolute"
                  top={0}
                  right={0}
                  _icon={{ size: 18 }}
                />
                <img
                  src={nipun_badge}
                  alt="nipun badge"
                  style={{ maxWidth: "150px", width: "30%" }}
                />
                <Box textAlign="center">
                  <VStack space={4}>
                    <Box>
                      <H4>{t("आपका विद्यालय निपुण है")}</H4>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            ) : (
              <VStack
                bg="hpAssessment.scoreCardBg1"
                pb="100px"
                pt="32px"
                alignItems="center"
                space={8}
              >
                <img
                  src={nipun_ready_badge}
                  alt="nipun badge"
                  style={{ maxWidth: "300px", width: "70%" }}
                />
                <Box textAlign="center">
                  <VStack space={4}>
                    <H1>{t("अभ्यास करते रहें")}</H1>
                    <H3>
                      {t("और फिर आप भी अगले निपुण इवैल्यूएशन में हो जाओगे")}
                    </H3>
                    <H2>{t("निपुण विद्यालय!")}</H2>
                  </VStack>
                </Box>
              </VStack>
            )}

            <Box p={4}>
              <VStack space={4}>
                <Box p={4} bg="white" rounded={10}>
                  <SchoolAssessmentProgressBox />
                </Box>
                <Box p="4">
                  <Button
                    colorScheme={"hpButton"}
                    _text={{
                      color: colors.white,
                    }}
                    onPress={() => {
                      navigate("/");
                    }}
                  >
                    {t("Home")}
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
