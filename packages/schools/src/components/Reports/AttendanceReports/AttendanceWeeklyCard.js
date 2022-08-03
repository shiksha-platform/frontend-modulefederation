import React, { useState } from "react";
import {
  Collapsible,
  IconByName,
  attendanceRegistryService,
  ProgressBar,
  getUniqAttendance,
  BodyMedium,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button,
  Divider,
  Actionsheet,
  Checkbox,
  Avatar,
  Spacer,
  Pressable,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { H2, overrideColorTheme } from "@shiksha/common-lib";
import RoundedProgressBar from "../../RoundedProgressBar";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);
// import StudentDetailCard from "./StudentDetail";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const AttendanceWeeklyCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box borderColor={colors.borderSeprator} borderWidth={1} rounded={10}>
      <Box p={4}>
        <HStack alignItems="center" justifyContent="space-between">
          <Box>
            <HStack>
              <Avatar
                size="48px"
                borderRadius="md"
                mr={4}
                source={{
                  uri: "https://via.placeholder.com/50x50.png",
                }}
              />
              <Box>
                <VStack>
                  <H2>Shah Rukh Khan</H2>
                  <HStack alignItems={"center"}>
                    <BodyMedium color={colors.darkGray}>
                      {t("Roll No. 23")}{" "}
                    </BodyMedium>
                    <Text
                      fontSize="5px"
                      color={colors.darkGray}
                      fontWeight={400}
                    >
                      {" "}
                      ●{" "}
                    </Text>
                    <BodyMedium color={colors.darkGray}>
                      {" "}
                      {t("Mr. Father's Name")}
                    </BodyMedium>
                  </HStack>
                </VStack>
              </Box>
            </HStack>
          </Box>
          <RoundedProgressBar
            values={[5, 2]}
            colors={[colors.green, colors.unmarkeds]}
            title={{ text: "5", fontSize: "12px" }}
            legend={{ text: "Days", fontSize: "14px" }}
            cutout={"79%"}
            size="45px"
          />
        </HStack>
      </Box>
      <Divider />
      <Box borderColor={colors.borderSeprator} borderRadius={10} p={4}>
        <HStack justifyContent="space-between" flexWrap="wrap">
          <Box minW="14%" textAlign="center">
            <VStack justifyContent="center" space={2}>
              <Box>
                <Text fontSize="xs" color={colors.absent}>
                  Mon
                </Text>
                <Text fontSize="xs">10</Text>
              </Box>
              {/*<IconByName name="CheckboxCircleLineIcon" color={"#0D921B"} p={0} _icon={{ size: 20 }} mx={"auto"} />*/}
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.absent}
                p={0}
                _icon={{ size: 20 }}
                mx={"auto"}
              />
            </VStack>
          </Box>
          <Box minW="14%" textAlign="center">
            <VStack justifyContent="center" space={2}>
              <Box>
                <Text fontSize="xs" color={colors.subtitle}>
                  Tue
                </Text>
                <Text fontSize="xs">11</Text>
              </Box>
              <IconByName
                name="CheckboxCircleLineIcon"
                color={colors.greens}
                p={0}
                _icon={{ size: 20 }}
                mx={"auto"}
              />
              {/*<IconByName name="CloseCircleLineIcon" color={"#F57B7B"} p={0} _icon={{ size: 20 }} mx={"auto"} />*/}
            </VStack>
          </Box>
          <Box minW="14%" textAlign="center">
            <VStack justifyContent="center" space={2}>
              <Box>
                <Text fontSize="xs" color={colors.subtitles}>
                  Wed
                </Text>
                <Text fontSize="xs">12</Text>
              </Box>
              <IconByName
                name="CheckboxCircleLineIcon"
                color={colors.green}
                p={0}
                _icon={{ size: 20 }}
                mx={"auto"}
              />
              {/*<IconByName name="CloseCircleLineIcon" color={"#F57B7B"} p={0} _icon={{ size: 20 }} mx={"auto"} />*/}
            </VStack>
          </Box>
          <Box minW="14%" textAlign="center">
            <VStack justifyContent="center" space={2}>
              <Box>
                <Text fontSize="xs" color={colors.subtitle}>
                  Thu
                </Text>
                <Text fontSize="xs">13</Text>
              </Box>
              <IconByName
                name="CheckboxCircleLineIcon"
                color={colors.green}
                p={0}
                _icon={{ size: 20 }}
                mx={"auto"}
              />
              {/*<IconByName name="CloseCircleLineIcon" color={"#F57B7B"} p={0} _icon={{ size: 20 }} mx={"auto"} />*/}
            </VStack>
          </Box>
          <Box minW="14%" textAlign="center">
            <VStack justifyContent="center" space={2}>
              <Box>
                <Text fontSize="xs" color={colors.subtitle}>
                  Fri
                </Text>
                <Text fontSize="xs">14</Text>
              </Box>
              <IconByName
                name="CheckboxCircleLineIcon"
                color={colors.green}
                p={0}
                _icon={{ size: 20 }}
                mx={"auto"}
              />
              {/*<IconByName name="CloseCircleLineIcon" color={"#F57B7B"} p={0} _icon={{ size: 20 }} mx={"auto"} />*/}
            </VStack>
          </Box>
          <Box minW="14%" textAlign="center">
            <VStack justifyContent="center" space={2}>
              <Box>
                <Text fontSize="xs" color={colors.subtitle}>
                  Sat
                </Text>
                <Text fontSize="xs">15</Text>
              </Box>
              <IconByName
                name="CheckboxBlankCircleLineIcon"
                color={colors.attendanceUnmarked}
                p={0}
                _icon={{ size: 20 }}
                mx={"auto"}
              />
              {/*<IconByName name="CloseCircleLineIcon" color={"#F57B7B"} p={0} _icon={{ size: 20 }} mx={"auto"} />*/}
            </VStack>
          </Box>
          <Box minW="14%" textAlign="center">
            <VStack justifyContent="center" space={2}>
              <Box>
                <Text fontSize="xs" color={colors.date}>
                  Sun
                </Text>
                <Text fontSize="xs" color={colors.date}>
                  16
                </Text>
              </Box>
              <IconByName
                name="CheckboxBlankCircleLineIcon"
                color={colors.borderSeprator}
                p={0}
                _icon={{ size: 20 }}
                mx={"auto"}
              />
              {/*<IconByName name="CloseCircleLineIcon" color={"#F57B7B"} p={0} _icon={{ size: 20 }} mx={"auto"} />*/}
            </VStack>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default AttendanceWeeklyCard;
