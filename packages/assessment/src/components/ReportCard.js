import { BodyLarge, ProgressBar } from "@shiksha/common-lib";
import { Box, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ReportCard({ writtenData, oralData }) {
  const { t } = useTranslation();
  return (
    <VStack space={4}>
      <Box
        borderWidth="1"
        borderColor={"assessment.lightGray2"}
        borderRadius="10px"
      >
        <VStack space="4">
          <Box p="4" pb="4px" roundedTop="6">
            <VStack space={2}>
              <Box>
                <BodyLarge py="2">{t("Written Spot Assessment")}</BodyLarge>
              </Box>

              <ProgressBar
                isTextShow
                legendType="separated"
                h="35px"
                _bar={{ rounded: "md", mb: "2" }}
                isLabelCountHide
                data={writtenData}
              />
            </VStack>
          </Box>
        </VStack>
      </Box>

      <Box
        borderWidth="1"
        borderColor={"assessment.lightGray2"}
        borderRadius="10px"
      >
        <VStack space="4">
          <Box p="4" pb="4px" roundedTop="6">
            <VStack space={2}>
              <Box>
                <BodyLarge py="2">{t("Oral Spot Assessment")}</BodyLarge>
              </Box>

              <ProgressBar
                isTextShow
                legendType="separated"
                h="35px"
                _bar={{ rounded: "md", mb: "2" }}
                isLabelCountHide
                data={oralData}
              />
            </VStack>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}
