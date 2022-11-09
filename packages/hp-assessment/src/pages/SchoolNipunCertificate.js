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
import nipun_badge from "../stories/assets/nipun_badge.svg";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import colorTheme from "../colorTheme";
import SchoolAssessmentProgressBox from "../components/ClassAssessmentProgressBox";
const colors = overrideColorTheme(colorTheme);

export default function SchoolNipunCertificate({
  handleBackButton,
  formObject,
}) {
  const [width, height] = useWindowSize();
  const { t } = useTranslation();
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
                    <H4>{t("निआपका विद्यालय निपुण है")}</H4>
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
