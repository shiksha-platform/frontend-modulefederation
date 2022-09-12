import React, { useEffect, useState } from "react";

// Import for translation
import { useTranslation } from "react-i18next";

// Imports from common library functions and native base components
import {
  Box,
  VStack,
  Text,
  HStack,
  Actionsheet,
  Stack,
  Button,
} from "native-base";
import { BodyLarge, H2, H4, IconByName } from "@shiksha/common-lib";

const chunks = (data, chunkCount = 2) => {
  return data.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkCount);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
};

function SchoolAdminTile({ title, grades, genderCount, socialCategoryCount }) {
  const { t } = useTranslation();
  const [academicDetailModal, setAcademicDetailModal] = useState(false);
  const [viewBy, setViewBy] = useState("grade");

  useEffect(() => {}, []);
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

              {grades &&
                grades?.length &&
                chunks(grades)?.map((item) => (
                  <HStack alignItems="center" space={10}>
                    {item?.map((grade) => (
                      <HStack alignItems="center">
                        <H4>{grade} : </H4>
                        <BodyLarge>1</BodyLarge>
                      </HStack>
                    ))}
                  </HStack>
                ))}

              {/* <AttributeComponent /> */}
              {/* <Box>
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
              </Box> */}
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
                    bg={"schools.girls"}
                    style={{ width: "12px", height: "12px" }}
                  ></Box>
                  <BodyLarge mx={2}>Male:</BodyLarge>
                  <H4>{genderCount?.male}</H4>
                </HStack>
                <HStack ml={4} alignItems="center">
                  <Box
                    bg={"schools.boys"}
                    style={{ width: "12px", height: "12px" }}
                  ></Box>
                  <BodyLarge mx={2}>Female:</BodyLarge>
                  <H4>{genderCount?.female}</H4>
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
                {socialCategoryCount &&
                  Object.entries(socialCategoryCount).map(([key, value]) => (
                    <VStack space={4}>
                      <HStack alignItems="center">
                        <H4>{key} : </H4>
                        <BodyLarge>{value?.length}</BodyLarge>
                      </HStack>
                    </VStack>
                  ))}
              </Box>
            </VStack>
          </Box>
        </Box>
      )}

      <Actionsheet
        isOpen={academicDetailModal}
        onClose={() => setAcademicDetailModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={"schools.cardBg"}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("View By")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"schools.darkGray"}
              onPress={() => setAcademicDetailModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={"schools.white"}>
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
