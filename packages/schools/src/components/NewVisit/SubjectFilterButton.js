import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Stack,
  Pressable,
  VStack,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  H2,
  H3,
  H4,
  IconByName,
  userRegistryService,
} from "@shiksha/common-lib";

export default function SubjectFilterButton({
  data,
  selectedSubject,
  setSelectedSubject,
}) {
  const { t } = useTranslation();

  const [filterData, setFilterData] = useState(false);

  let subjectData;
  useEffect(async () => {
    subjectData = await userRegistryService.getAll({ userId: { eq: data } });
    console.log({ subjectData });
  }, [data]);

  return (
    <Box roundedBottom={"xl"}>
      <VStack space={2}>
        <H4>Subject</H4>
        <Pressable onPress={() => setFilterData(subjectData[0]?.subjectIds)}>
          <Box
            rounded={10}
            borderWidth={1}
            px={4}
            pt={3}
            pb={2}
            borderColor={"schools.primary"}
            color={"schools.primary"}
          >
            <HStack justifyContent={"space-between"}>
              {selectedSubject ? selectedSubject : "Select Subject"}
              <IconByName
                color={"schools.primary"}
                name="ArrowDownSLineIcon"
                isDisabled
              />
            </HStack>
          </Box>
        </Pressable>
        {filterData && (
          <Actionsheet isOpen={filterData} onClose={() => setFilterData()}>
            <Actionsheet.Content alignItems={"left"} bg={"schools.cardBg"}>
              <HStack justifyContent={"space-between"}>
                <Stack p={5} pt={2} pb="15px">
                  <H2>{t("Choose Subject")}</H2>
                </Stack>
                <IconByName
                  name="CloseCircleLineIcon"
                  onPress={() => setFilterData()}
                  color={"schools.primary"}
                />
              </HStack>
            </Actionsheet.Content>
            <Box bg={"schools.white"} width={"100%"} pt={4}>
              <VStack space={4}>
                {filterData.length > 0 ? (
                  filterData?.map((data, index) => (
                    <Pressable
                      px="5"
                      key={index}
                      onPress={() => setSelectedSubject(data)}
                    >
                      <Box bg={"schools.white"}>
                        <HStack
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            <HStack alignItems="center" space={3}>
                              <VStack>
                                <H3
                                  color={"schools.bodyText"}
                                  _dark={{
                                    color: "warmGray.50",
                                  }}
                                >
                                  {data}
                                </H3>
                              </VStack>
                            </HStack>
                          </Box>
                          <IconByName name="ArrowRightSLineIcon" />
                        </HStack>
                      </Box>
                    </Pressable>
                  ))
                ) : (
                  <Text px={5}>No available Subjects</Text>
                )}
              </VStack>
              <Box p="5">
                <Button
                  colorScheme="button"
                  _text={{ color: "schools.white" }}
                  onPress={() => setFilterData()}
                >
                  {t("Done")}
                </Button>
              </Box>
            </Box>
          </Actionsheet>
        )}
      </VStack>
    </Box>
  );
}
