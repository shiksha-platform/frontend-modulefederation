import React from "react";
import { IconByName, H2, H3 } from "@shiksha/common-lib";
import { HStack, VStack, Box, Avatar, Pressable } from "native-base";
import { useTranslation } from "react-i18next";

const TeacherTile = ({ index, teacher, setTeacherData, visitedData }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Pressable onPress={() => setTeacherData(teacher)}>
        <Box bg={"schools.lightGray5"} p={4} rounded={10}>
          <HStack alignItems="center" justifyContent="space-between">
            <Box>
              <HStack alignItems="center" space={3}>
                <Avatar
                  size="48px"
                  borderRadius="md"
                  source={{
                    uri: teacher?.image ? teacher?.image : "",
                  }}
                  bg={"schools.primary"}
                >
                  <H2 color={"schools.white"}>
                    {teacher?.firstName?.slice(0, 2)?.toUpperCase()}
                  </H2>
                </Avatar>
                <VStack>
                  <H3
                    color={"schools.bodyText"}
                    _dark={{
                      color: "warmGray.50",
                    }}
                  >
                    {index + 1} . {`${teacher?.firstName} ${teacher?.lastName}`}
                  </H3>
                </VStack>
              </HStack>
            </Box>
            <Box>
              <HStack>
                {visitedData &&
                  visitedData?.find(
                    (data) => data?.teacherId === teacher?.id
                  ) && (
                    <Box>
                      <IconByName
                        _icon={{ size: "22" }}
                        borderRadius="full"
                        bg={"schools.primary"}
                        color={"schools.white"}
                        name="UserLineIcon"
                      />
                    </Box>
                  )}

                <IconByName
                  name="ArrowRightSLineIcon"
                  color={"schools.lightGray"}
                />
              </HStack>
            </Box>
          </HStack>
        </Box>
      </Pressable>
    </React.Fragment>
  );
};

export default TeacherTile;
