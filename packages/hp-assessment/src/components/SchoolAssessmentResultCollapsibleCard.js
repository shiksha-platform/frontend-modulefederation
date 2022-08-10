import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Text, Divider, Button
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible, ProgressBar, overrideColorTheme
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
import SchoolAssessmentProgressBox from "./ClassAssessmentProgressBox";
import { useNavigate } from "react-router-dom";
const colors = overrideColorTheme(colorTheme);
export default function SchoolAssessmentResultCollapsibleCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Collapsible
        defaultCollapse={true}
        header={
          <Box py={4}>
            <H2>Assessments Results</H2>
          </Box>
        }
      >
        <>
          <Box>
            <VStack space={4}>
              <SchoolAssessmentProgressBox />
              <Divider />
              <Box>
                <VStack space={4}>
                  <Box>
                    <Button
                      colorScheme={"button"}
                      _text={{ color: colors.white }}
                      isDisabled={false}
                      // onPress={()=> {navigate('/school-report')}}
                      onPress={()=> {navigate('/school-nipun-certificate')}}
                    >
                      {t('View Results')}
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </>
      </Collapsible>
    </>
  );
}
