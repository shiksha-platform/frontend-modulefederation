import React, { useState } from "react";
import {
  BodyLarge,
  BodySmall,
  IconByName,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { HStack, Text, VStack, Box, Divider } from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const MultipleSelectQuestionCard = ({ questionNumber, question }) => {
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
              <BodyLarge bold mt={4} mr={2}>
                Q{questionNumber}.{" "}
              </BodyLarge>
              <div
                dangerouslySetInnerHTML={{ __html: question?.question }}
              ></div>
              <IconByName
                name="InformationFillIcon"
                p={0}
                w="20px"
                h="20px"
                color={colors.primary}
                mt={3}
              />
            </HStack>
          </Box>
          <Box p="4" bg={colors.QuationsBoxContentBg} borderBottomRadius={6}>
            <VStack space={4}>
              <HStack
                alignItems={"center"}
                justifyContent={"space-between"}
                flexWrap={"wrap"}
              >
                {question &&
                  question.options &&
                  question.options.length &&
                  question.options.map((option, optionIndex) => {
                    return (
                      <div
                        style={{ flex: "0 0 50%", maxWidth: "50%" }}
                        key={`option-${optionIndex}`}
                      >
                        <HStack>
                          <Text bold mt={4}>
                            {optionIndex + 1}.{" "}
                          </Text>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: option.value.body,
                            }}
                          ></div>
                        </HStack>
                      </div>
                    );
                  })}
                {/*<Text flexGrow={1} flexBasis={'50px'}>a. 70</Text>
                <Text flexGrow={1} flexBasis={'50px'}>b. 0.7</Text>*/}
              </HStack>

              {/*<HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text flexGrow={1} flexBasis={'50px'}>c. 7000</Text>
                <Text flexGrow={1} flexBasis={'50px'}>d. 0.75</Text>
              </HStack>*/}
              <Divider />
              <Box>
                <VStack space={3}>
                  <Text>Grade</Text>
                  <HStack
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box
                      borderWidth={2}
                      borderColor={colors.primary}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <BodySmall color={colors.primary}>A</BodySmall>
                    </Box>

                    <Box
                      borderWidth={2}
                      borderColor={colors.primary}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <BodySmall color={colors.primary}>B</BodySmall>
                    </Box>

                    <Box
                      borderWidth={2}
                      borderColor={colors.primary}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <BodySmall color={colors.primary}>C</BodySmall>
                    </Box>

                    <Box
                      borderWidth={2}
                      borderColor={colors.primary}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <BodySmall color={colors.primary}>D</BodySmall>
                    </Box>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default MultipleSelectQuestionCard;
