import React, { useState } from "react";
import { BodyMedium, Collapsible, H3, IconByName } from "@shiksha/common-lib";
import {
  HStack,
  VStack,
  Box,
  Divider,
  Avatar,
  Pressable,
  Button,
} from "native-base";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { H2, overrideColorTheme } from "@shiksha/common-lib";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const TeacherListCard = ({ classId, students, setHeaderDetails }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [teacherlist, setStudentlist] = useState([]);

  React.useEffect(() => {
    setStudentlist([
      {
        id: 1,
        name: "Rahul",
        class: "VI A",
      },
      {
        id: 2,
        name: "Rahul",
        class: "VI A",
      },
      {
        id: 3,
        name: "Rahul",
        class: "VI A",
      },
    ]);
  }, []);

  return (
    <Collapsible
      defaultCollapse={true}
      header={
        <Box py={4}>
          <H2>Allocated Teachers List</H2>
        </Box>
      }
    >
      {teacherlist &&
        teacherlist.length &&
        teacherlist.map((teacher, index) => {
          return (
            <React.Fragment key={`student${index}`}>
              <Box borderColor={"schools.lightGray3"} p={4}>
                <Pressable
                  onPress={() => navigate("/schools/assessment-result")}
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <Box>
                      <HStack alignItems="center" space={3}>
                        <Avatar
                          size="48px"
                          borderRadius="md"
                          source={{
                            uri: "https://via.placeholder.com/50x50.png",
                          }}
                        />
                        <VStack>
                          <H3
                            color={"schools.bodyText"}
                            _dark={{
                              color: "warmGray.50",
                            }}
                          >
                            {index + 1} . {teacher.name}
                          </H3>
                          <BodyMedium color={"schools.gray"}>
                            Class Teacher: {teacher.class}
                          </BodyMedium>
                        </VStack>
                      </HStack>
                    </Box>
                    <Box>
                      <HStack alignItems="center">
                        <IconByName
                          _icon={{ size: "22" }}
                          borderRadius="full"
                          bg={"schools.primary"}
                          color={"schools.white"}
                          name="UserLineIcon"
                        />
                        <IconByName
                          _icon={{ size: "18" }}
                          color={"schools.darkGray"}
                          name="ArrowRightSLineIcon"
                        />
                      </HStack>
                    </Box>
                  </HStack>
                </Pressable>
              </Box>

              <Divider />
            </React.Fragment>
          );
        })}
      <Box pt={4} textAlign="center">
        <Button
          variant="outline"
          onPress={() => navigate("/schools/my-visits")}
        >
          Load More
        </Button>
      </Box>
    </Collapsible>
  );
};

export default TeacherListCard;
