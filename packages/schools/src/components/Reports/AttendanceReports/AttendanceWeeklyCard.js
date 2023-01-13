import React from "react";
import { IconByName, BodyMedium } from "@shiksha/common-lib";
import { HStack, Text, VStack, Box, Divider, Avatar } from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
    <Box borderColor={"schools.lightGray3"} borderWidth={1} rounded={10}>
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
                    <BodyMedium color={"schools.darkGray"}>
                      {t("Roll No. 23")}{" "}
                    </BodyMedium>
                    <Text
                      fontSize="5px"
                      color={"schools.darkGray"}
                      fontWeight={400}
                    >
                      {" "}
                      ●{" "}
                    </Text>
                    <BodyMedium color={"schools.darkGray"}>
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
            colors={["schools.green", "schools.unmarked"]}
            title={{ text: "5", fontSize: "12px" }}
            legend={{ text: "Days", fontSize: "14px" }}
            cutout={"79%"}
            size="45px"
          />
        </HStack>
      </Box>
      <Divider />
      <Box borderColor={"schools.lightGray3"} borderRadius={10} p={4}>
        <HStack justifyContent="space-between" flexWrap="wrap">
          <Box minW="14%" textAlign="center">
            <VStack justifyContent="center" space={2}>
              <Box>
                <Text fontSize="xs" color={"schools.absent"}>
                  Mon
                </Text>
                <Text fontSize="xs">10</Text>
              </Box>
              <IconByName
                name="CloseCircleLineIcon"
                color={"schools.absent"}
                p={0}
                _icon={{ size: 20 }}
                mx={"auto"}
              />
            </VStack>
          </Box>
          <Box minW="14%" textAlign="center">
            <VStack justifyContent="center" space={2}>
              <Box>
                <Text fontSize="xs" color={"schools.gray"}>
                  Tue
                </Text>
                <Text fontSize="xs">11</Text>
              </Box>
              <IconByName
                name="CheckboxCircleLineIcon"
                color={".green"}
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
                <Text fontSize="xs" color={"schools.gray"}>
                  Wed
                </Text>
                <Text fontSize="xs">12</Text>
              </Box>
              <IconByName
                name="CheckboxCircleLineIcon"
                color={"schools.green"}
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
                <Text fontSize="xs" color={"schools.gray"}>
                  Thu
                </Text>
                <Text fontSize="xs">13</Text>
              </Box>
              <IconByName
                name="CheckboxCircleLineIcon"
                color={"schools.green"}
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
                <Text fontSize="xs" color={"schools.gray"}>
                  Fri
                </Text>
                <Text fontSize="xs">14</Text>
              </Box>
              <IconByName
                name="CheckboxCircleLineIcon"
                color={"schools.green"}
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
                <Text fontSize="xs" color={"schools.gray"}>
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
                color={"schools.lightGray3"}
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
