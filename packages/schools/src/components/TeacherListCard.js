import React, { useState, useEffect } from "react";

// Imports for navigation
import { useNavigate } from "react-router-dom";

// Import for translation
import { useTranslation } from "react-i18next";

// Imports from common library functions and native base components
import {
  Collapsible,
  H3,
  IconByName,
  userRegistryService,
  H2,
} from "@shiksha/common-lib";
import { HStack, VStack, Box, Divider, Avatar, Button } from "native-base";

const TeacherListCard = ({ schoolId, visitedData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [teacherlist, setTeacherList] = useState([]);

  useEffect(async () => {
    const data = await userRegistryService.getAll({
      schoolId: { eq: schoolId },
      role: { eq: "Teacher" },
    });
    setTeacherList(data);
  }, []);

  return (
    <Collapsible
      defaultCollapse={true}
      header={
        <Box py={4}>
          <H2>Teachers List</H2>
        </Box>
      }
    >
      {teacherlist && teacherlist.length > 0 ? (
        teacherlist.map(
          (teacher, index) =>
            index < 3 && (
              <React.Fragment key={`student${index}`}>
                <Box borderColor={"schools.lightGray3"} p={4}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Box>
                      <HStack alignItems="center" space={3}>
                        <Avatar
                          size="48px"
                          borderRadius="md"
                          source={{
                            uri: teacher.image ? teacher.image : "",
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
                            {index + 1} .{" "}
                            {`${teacher?.firstName} ${teacher?.lastName}`}
                          </H3>
                        </VStack>
                      </HStack>
                    </Box>
                    {console.log("VISITEDDATA", visitedData)}
                    {visitedData &&
                      visitedData?.find((data) => {
                        return (
                          data?.teacherId ===
                          teacher?.id?.slice(2, teacher?.id.length)
                        );
                      }) && (
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
                  </HStack>
                </Box>
                <Divider />
              </React.Fragment>
            )
        )
      ) : (
        <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
          No teachers available in this school
        </Box>
      )}
      {teacherlist && teacherlist.length > 0 && (
        <Box pt={4} textAlign="center">
          <Button
            variant="outline"
            onPress={() => navigate(`/schools/teachers/${schoolId}`)}
          >
            Load More
          </Button>
        </Box>
      )}
    </Collapsible>
  );
};

export default TeacherListCard;
