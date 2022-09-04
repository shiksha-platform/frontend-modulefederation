import React from "react";
import {
  BodyLarge,
  BodySmall,
  Caption,
  Collapsible,
  H2,
  IconByName,
  Subtitle,
} from "@shiksha/common-lib";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  useTheme,
  VStack,
} from "native-base";
import RoundedProgressBar from "components/RoundedProgressBar";
import { useTranslation } from "react-i18next";
import { getMaxScore } from "utils/report";
import { useNavigate } from "react-router-dom";

export default function StudentQuestionsReport({
  students,
  track,
  subject,
  classId,
  date,
  limit,
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [maxScore, setMaxScore] = React.useState(0);
  const navigate = useNavigate();
  const [studentData, setStudentData] = React.useState([]);

  React.useEffect(() => {
    setMaxScore(getMaxScore(track));
    if (limit) {
      setStudentData(students.filter((e, index) => limit > index));
    } else {
      setStudentData(students);
    }
  }, [track, students]);

  return (
    <Box p={4} px="0px" bg={"assessment.white"}>
      <Collapsible
        defaultCollapse={true}
        header={
          <VStack>
            <H2>{t("Student Wise Assessment")}</H2>
            <HStack alignItems={"center"}>
              <Caption color={"assessment.gray"}>
                {`${students?.length} ${t("Students")}`}
              </Caption>
              <Caption color={"assessment.lightGray0"}> ● </Caption>
              <Caption color={"assessment.gray"}>
                {`${t("Max Score")} : ${maxScore}`}
              </Caption>
            </HStack>
          </VStack>
        }
        fontSize="2px"
      >
        {studentData.map((student, key) => {
          const trackStudent = track.find((e) => e.studentId === student.id);
          let questions = [];
          let totalScore = 0,
            score = 0;
          if (trackStudent?.answersheet) {
            const data = JSON.parse(trackStudent.answersheet);
            questions = data.children;
            totalScore = trackStudent.totalScore;
            score = questions.reduce((value, item) => value + item.score, 0);
          }

          return (
            <VStack pt={6} space={4} key={key}>
              <Box
                bg={"assessment.QuationsBoxBg"}
                roundedTop="10px"
                px="4"
                py="2"
              >
                <HStack alignItems="center" justifyContent="space-between">
                  <Box>
                    <HStack>
                      <Avatar
                        size="10"
                        borderRadius="md"
                        mr={4}
                        bg="assessment.primary"
                      >
                        <Subtitle color="assessment.white">
                          {`${student.firstName} ${student.lastName}`
                            .toUpperCase()
                            .substr(0, 2)}
                        </Subtitle>
                      </Avatar>
                      <VStack>
                        <BodyLarge>{`${student.firstName} ${student.lastName}`}</BodyLarge>
                        <HStack alignItems={"center"}>
                          <Caption color={"assessment.lightGray0"}>
                            {t("Roll No. ") + student.admissionNo} ●
                          </Caption>
                          <Caption color={"assessment.lightGray0"}>
                            {student.fathersName}
                          </Caption>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                  <RoundedProgressBar
                    values={[score, totalScore]}
                    colors={[
                      colors["assessment"]?.["success"],
                      colors["assessment"]?.["lightGray2"],
                    ]}
                    cutout={"80%"}
                    size="45px"
                    title={{ text: score, fontSize: "12px" }}
                    legend={{ text: "Total Score", fontSize: "10px" }}
                  />
                </HStack>
              </Box>

              <Box
                borderWidth="1"
                borderColor={"assessment.lightGray2"}
                borderRadius="10px"
              >
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  p={4}
                >
                  <H2>Written Assessment</H2>
                  <RoundedProgressBar
                    values={[score, totalScore]}
                    colors={[
                      colors["assessment"]?.["success"],
                      colors["assessment"]?.["lightGray2"],
                    ]}
                    cutout={"80%"}
                    size="45px"
                    title={{ text: score, fontSize: "12px" }}
                    legend={{ text: "Total Score", fontSize: "10px" }}
                  />
                </HStack>
                <HStack space={10} flexWrap="wrap" p="4">
                  {questions.map((question, index) => {
                    let iconProp = {
                      name: "CloseCircleLineIcon",
                      color: "assessment.error",
                    };

                    if (question?.class && question?.class === "skipped") {
                      iconProp = {
                        name: "CheckboxBlankCircleLineIcon",
                        color: "assessment.gray",
                      };
                    } else if (
                      question?.class &&
                      question?.class === "correct"
                    ) {
                      iconProp = {
                        name: "CheckboxCircleLineIcon",
                        color: "assessment.success",
                      };
                    }

                    return (
                      <Box key={`q-${index}`} textAlign="center" mb={8}>
                        <VStack justifyContent="center" space={2}>
                          <BodySmall>Q-{question.index}</BodySmall>
                          <IconByName
                            {...iconProp}
                            p={0}
                            _icon={{ size: 25 }}
                          />
                        </VStack>
                      </Box>
                    );
                  })}
                </HStack>
              </Box>

              <Box
                borderWidth="1"
                borderColor={"assessment.lightGray2"}
                borderRadius="10px"
                p={4}
              >
                <VStack space={4}>
                  <H2>{t("Oral Assessment")}</H2>
                  <HStack alignItems="center" justifyContent="space-between">
                    <RoundedProgressBar
                      values={[18, 6]}
                      colors={[
                        colors["assessment"]?.["success"],
                        colors["assessment"]?.["lightGray2"],
                      ]}
                      cutout={"80%"}
                      size="45px"
                      title={{ text: 20, fontSize: "12px" }}
                      legend={{ text: "Words Read", fontSize: "10px" }}
                    />
                    <RoundedProgressBar
                      values={[18, 6]}
                      colors={[
                        colors["assessment"]?.["success"],
                        colors["assessment"]?.["lightGray2"],
                      ]}
                      cutout={"80%"}
                      size="45px"
                      title={{ text: 18, fontSize: "12px" }}
                      legend={{ text: "Numbers Read", fontSize: "10px" }}
                    />
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          );
        })}
        {limit && students?.length > limit ? (
          <Box py="2">
            <Button
              colorScheme="button"
              variant="outline"
              py={3}
              onPress={(e) =>
                navigate(
                  `/assessment/student-report/${classId}/${subject}/${date}`
                )
              }
            >
              {t("See all students")}
            </Button>
          </Box>
        ) : (
          <React.Fragment />
        )}
      </Collapsible>
    </Box>
  );
}
