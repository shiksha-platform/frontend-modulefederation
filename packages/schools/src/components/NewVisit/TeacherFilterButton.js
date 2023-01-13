import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  HStack,
  Pressable,
  Stack,
  VStack,
  Text,
} from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { H2, H3, H4, IconByName } from "@shiksha/common-lib";

export default function TeacherFilterButton({
  data,
  selectedTeacher,
  setSelectedTeacher,
}) {
  const { t } = useTranslation();

  const [filterData, setFilterData] = useState();

  return (
    <Box roundedBottom={"xl"}>
      <VStack space={2}>
        <H4>Teacher Name</H4>
        <Pressable onPress={() => setFilterData(data)}>
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
              {selectedTeacher
                ? `${selectedTeacher?.firstName} ${selectedTeacher?.lastName}`
                : "Select Teacher"}
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
                  <H2>{t("Choose Teacher")}</H2>
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
                      onPress={() => setSelectedTeacher(data?.teacherData)}
                    >
                      <Box bg={"schools.white"}>
                        <HStack
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            <HStack alignItems="center" space={3}>
                              <Avatar
                                size="48px"
                                borderRadius="md"
                                source={{
                                  uri: data?.teacherData?.image
                                    ? data?.teacherData?.image
                                    : "",
                                }}
                                bg={"schools.primary"}
                              >
                                <H2 color={"schools.white"}>
                                  {data?.teacherData?.firstName
                                    ?.slice(0, 2)
                                    .toUpperCase()}
                                </H2>
                              </Avatar>
                              <VStack>
                                <H3
                                  color={"schools.bodyText"}
                                  _dark={{
                                    color: "warmGray.50",
                                  }}
                                >
                                  {`${data?.teacherData?.firstName} ${data?.teacherData?.lastName}`}
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
                  <Text px={5}>No available Teachers</Text>
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
