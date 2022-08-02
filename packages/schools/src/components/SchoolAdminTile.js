import React, { useState } from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  Actionsheet,
  Stack,
  Button,
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  overrideColorTheme,
  H4,
  BodyLarge,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

function SchoolAdminTile({ title }) {
  const { t } = useTranslation();
  const [academicDetailModal, setAcademicDetailModal] = useState(false);
  const [viewBy, setViewBy] = useState("grade");
  return (
    <>
      {viewBy === "grade" && (
        <Box>
          <Box py={4}>
            <VStack space={2}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text>{title || ""}</Text>
                <Button
                  variant="ghost"
                  rightIcon={<IconByName name="ArrowDownSLineIcon" p={0} />}
                  onPress={() => {
                    setAcademicDetailModal(true);
                  }}
                >
                  Grade
                </Button>
              </HStack>

              <Box>
                <VStack space={4}>
                  <HStack alignItems="center">
                    <HStack alignItems="center">
                      <H4>Grade 1 : </H4>
                      <BodyLarge>50</BodyLarge>
                    </HStack>
                    <HStack alignItems="center" ml={10}>
                      <H4>Grade 2 : </H4>
                      <BodyLarge>125</BodyLarge>
                    </HStack>
                  </HStack>

                  <HStack alignItems="center">
                    <HStack alignItems="center">
                      <H4>Grade 3 : </H4>
                      <BodyLarge>50</BodyLarge>
                    </HStack>
                    <HStack alignItems="center" ml={10}>
                      <H4>Grade 4 : </H4>
                      <BodyLarge>125</BodyLarge>
                    </HStack>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Box>
      )}

      {viewBy === "gender" && (
        <Box>
          <Box py={4}>
            <VStack space={6}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text>{title || ""}</Text>
                <Button
                  variant="ghost"
                  rightIcon={<IconByName name="ArrowDownSLineIcon" p={0} />}
                  onPress={() => {
                    setAcademicDetailModal(true);
                  }}
                >
                  Gender
                </Button>
              </HStack>

              <HStack alignItems="center">
                <HStack alignItems="center">
                  <Box
                    bg={colors.blue}
                    style={{ width: "12px", height: "12px" }}
                  ></Box>
                  <BodyLarge mx={2}>Boys:</BodyLarge>
                  <H4>150</H4>
                </HStack>
                <HStack ml={4} alignItems="center">
                  <Box
                    bg={colors.purple}
                    style={{ width: "12px", height: "12px" }}
                  ></Box>
                  <BodyLarge mx={2}>Girls:</BodyLarge>
                  <H4>125</H4>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}

      {viewBy === "category" && (
        <Box>
          <Box py={4}>
            <VStack space={2}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text>{title || ""}</Text>
                <Button
                  variant="ghost"
                  rightIcon={<IconByName name="ArrowDownSLineIcon" p={0} />}
                  onPress={() => {
                    setAcademicDetailModal(true);
                  }}
                >
                  Category
                </Button>
              </HStack>

              <Box>
                <VStack space={4}>
                  <HStack alignItems="center">
                    <H4>Scheduled Caste (SC) : </H4>
                    <BodyLarge>50</BodyLarge>
                  </HStack>
                  <HStack alignItems="center">
                    <H4>scheduled Tribe (ST) : </H4>
                    <BodyLarge>125</BodyLarge>
                  </HStack>

                  <HStack alignItems="center">
                    <H4>Other Backward Class (OBC) : </H4>
                    <BodyLarge>90</BodyLarge>
                  </HStack>
                  <HStack alignItems="center">
                    <H4>General Category (GC) : </H4>
                    <BodyLarge>95</BodyLarge>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Box>
      )}

      <Actionsheet
        isOpen={academicDetailModal}
        onClose={() => setAcademicDetailModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.lightGray}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("View By")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.primary}
              onPress={() => setAcademicDetailModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={colors.white}>
          <Actionsheet.Item
            onPress={() => {
              setViewBy("grade");
              setAcademicDetailModal(false);
            }}
          >
            Grade
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setViewBy("gender");
              setAcademicDetailModal(false);
            }}
          >
            Gender
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setViewBy("category");
              setAcademicDetailModal(false);
            }}
          >
            Category
          </Actionsheet.Item>
        </Box>
      </Actionsheet>
    </>
  );
}
export default SchoolAdminTile;
