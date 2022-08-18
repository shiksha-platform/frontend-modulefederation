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
import manifest from "../manifest.json";
import nipun_ready_badge from "../stories/assets/nipun_ready-badge.svg";
import nipun_ready_kids from "../stories/assets/nipun_ready_kids.svg";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import colorTheme from "../colorTheme";
import SchoolAssessmentProgressBox from "../components/ClassAssessmentProgressBox";
const colors = overrideColorTheme(colorTheme);

export default function SchoolReport({ handleBackButton, formObject }) {
  const [width, height] = useWindowSize();
  const { t } = useTranslation();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: "#0D921B",
      value: 12,
    },
    {
      name: "6 pending",
      color: "#DDDDDD",
      value: 6,
    },
  ]);

  return (
    <Layout isDisabledAppBar={true}>
      <Loading
        width={width}
        height={height - 230}
        customComponent={
          <VStack space="0" flex="1" width={width}>
            <VStack
              bg={colors.scoreCardBg1}
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
                  <H2>{t("अभ्यास करते रहें")}</H2>
                  <Box>
                    <Text>
                      {t("और फिर आप भी अगले निपुण इवैल्यूएशन में हो जाओगे")}
                    </Text>
                    <Text bold>{t("निपुण विद्यालय!")}</Text>
                  </Box>
                </VStack>
              </Box>
            </VStack>

            <Box p={4}>
              <VStack space={4}>
                <Box p={4} bg="white" rounded={10}>
                  <SchoolAssessmentProgressBox />
                </Box>
                <Box p="4">
                  <Button
                    colorScheme="button"
                    _text={{
                      color: colors.white,
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
