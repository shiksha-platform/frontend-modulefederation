import React, { useState } from "react";
import { IconByName, overrideColorTheme, Subtitle } from "@shiksha/common-lib";
import { HStack, Text, VStack, Box, Input } from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const SimpleQuestionCard = ({ questionNumber, question }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      <Box borderRadius="md">
        <VStack>
          <Box px="4" py={2} bg={colors.QuationsBoxBg} roundedTop="6">
            <HStack>
              <Text bold mt={4} mr={2}>
                Q{questionNumber}.{" "}
              </Text>
              <div
                dangerouslySetInnerHTML={{ __html: question?.question }}
              ></div>
              {question?.question && (
                <IconByName
                  name="InformationFillIcon"
                  p={0}
                  w="20px"
                  h="20px"
                  color={colors.primary}
                  mt={3}
                />
              )}
            </HStack>
          </Box>
          <Box p="4" bg={colors.QuationsBoxContentBg} borderBottomRadius={6}>
            <VStack space={3}>
              <Input
                placeholder={"Enter Marks"}
                bgColor={colors.white}
                fontSize="14px"
                fontWeight="400"
              />

              <Subtitle color={colors.gray}>Max marks: 2</Subtitle>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default SimpleQuestionCard;
