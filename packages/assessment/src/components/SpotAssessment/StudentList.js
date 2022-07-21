import React, { useState, useEffect } from "react";
import {
  Collapsible,
  overrideColorTheme,
  H2,
  Caption,
  BodyLarge,
  studentRegistryService,
  Loading,
  questionRegistryService,
  IconByName,
  telemetryFactory,
  capture,
  assessmentRegistryService,
  H3,
} from "@shiksha/common-lib";
import {
  HStack,
  VStack,
  Box,
  Divider,
  Avatar,
  Spacer,
  Pressable,
  Button,
  Actionsheet,
  Stack,
  Checkbox,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import colorTheme from "../../colorTheme";
import moment from "moment";
const colors = overrideColorTheme(colorTheme);
const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const StudentListCard = ({ classId, students, setHeaderDetails }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // let { classId } = useParams();
  // if (!classId) classId = "9eae88b7-1f2d-4561-a64f-871cf7a6b3f2";

  const [studentlist, setStudentlist] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(
    JSON.parse(localStorage.getItem("assessment-student")) || null
  );
  const [loading, setLoading] = React.useState(true);

  const [chooseAssessmentTypeModal, setChooseAssessmentTypeModal] =
    useState(false);
  const [assessmentTypes, setAssessmentTypes] = useState([
    "Oral Assessment",
    "Written Assessment",
  ]);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState(
    localStorage.getItem("assessment-type")
  );
  const [competencies, setCompetencies] = useState([]);
  const [selectedCompetencies, setSelectedCompetencies] = useState(
    JSON.parse(localStorage.getItem("assessment-competencies")) || []
  );
  const [chooseCompetenciesModal, setChooseCompetenciesModal] = useState(false);

  const checkAttendance = async () => {
    setLoading(false);
    const date = moment().format("YYYY-MM-DD");
    await assessmentRegistryService.getAttendanceDetailsByClass(classId, {
      date,
    });
  };
  const getStudentsList = async () => {
    const list = await studentRegistryService.getAll({ classId });
    setStudentlist(list);
    setLoading(false);
  };

  const handleSelectedStudent = (student) => {
    setSelectedStudent(student);
    localStorage.setItem("assessment-student", JSON.stringify(student));
  };

  const handleStartAssessment = async () => {
    const limit = 2;
    let data = {
      adapter: "diksha",
      limit,
      subject: localStorage.getItem("assessment-subject") || "English",
      bloomsLevel:
        JSON.parse(localStorage.getItem("assessment-competencies")) ||
        "application",
    };
    const questions = await questionRegistryService.getAllQuestions(data);
    let questionIds = questions.map((question) => {
      return question.questionId;
    });
    localStorage.setItem("assessment-questionIds", JSON.stringify(questionIds));
    navigate("/quml-test");
  };

  const getCompetenciesList = async (selectedSubject) => {
    const res = await assessmentRegistryService.getCompetenciesList({
      subject: selectedSubject,
    });
    setCompetencies(res);
  };

  const handleAssessmentTypeSelection = (assessmentType) => {
    setSelectedAssessmentType(assessmentType);
    localStorage.setItem("assessment-type", assessmentType);
  };

  const handleCompetenceSelection = (competence) => {
    let assessmentCompetencies = JSON.parse(
      localStorage.getItem("assessment-competencies")
    );
    if (assessmentCompetencies) {
      if (assessmentCompetencies.includes(competence)) {
        assessmentCompetencies = assessmentCompetencies.filter((item) => {
          return item !== competence;
        });
      } else {
        assessmentCompetencies = [...assessmentCompetencies, competence];
      }
      setSelectedCompetencies(assessmentCompetencies);
      localStorage.setItem(
        "assessment-competencies",
        JSON.stringify(assessmentCompetencies)
      );
    } else {
      setSelectedCompetencies([competence]);
      localStorage.setItem(
        "assessment-competencies",
        JSON.stringify([competence])
      );
    }
  };

  useEffect(() => {
    const selectedSubject = localStorage.getItem("assessment-subject");
    if (selectedSubject) {
      getCompetenciesList(selectedSubject);
    }
  }, []);

  useEffect(() => {
    // checkAttendance();
    getStudentsList();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Collapsible
        defaultCollapse={true}
        header={
          <>
            <VStack>
              <H2>{t("Students List")}</H2>
              <HStack alignItems={"center"}>
                <Caption color={colors.gray}>
                  {t("Total ") + studentlist.length}
                </Caption>{" "}
                <Caption color={colors.lightGray}> ●</Caption>{" "}
                <Caption color={colors.gray}> {t("Present ") + 19}</Caption>
              </HStack>
            </VStack>
          </>
        }
        fontSize="2px"
      >
        {studentlist && studentlist.length ? (
          studentlist.map((student, index) => {
            return (
              <React.Fragment key={student.id}>
                <Box py="3">
                  <Pressable
                    onPress={() => {
                      handleSelectedStudent(student);
                    }}
                  >
                    <HStack alignItems="center" space={3}>
                      <Avatar
                        size="48px"
                        borderRadius="md"
                        source={{
                          uri: "https://via.placeholder.com/50x50.png",
                        }}
                      />
                      <VStack>
                        <BodyLarge
                          alignItems="center"
                          display="flex"
                          color={
                            selectedStudent.id === student.id
                              ? "black"
                              : colors.gray
                          }
                        >
                          {index + 1}{" "}
                          <Caption color={colors.lightGray}>●</Caption>{" "}
                          {student.firstName} {student.lastName}
                        </BodyLarge>
                        <Caption color={colors.lightGray}>
                          {student.fathersName
                            ? `Mr. ${student.fathersName}`
                            : ""}
                        </Caption>
                      </VStack>
                      <Spacer />
                    </HStack>
                  </Pressable>
                </Box>

                {studentlist.length - 1 != index && (
                  <Divider bg={colors.dividerColor} />
                )}
              </React.Fragment>
            );
          })
        ) : (
          <>No students found</>
        )}
      </Collapsible>
      <Box bg={colors.white} p="5" position="sticky" bottom="85" shadow={2}>
        <Button.Group>
          <Button
            isDisabled={!selectedStudent}
            flex="1"
            colorScheme="button"
            _text={{ color: colors.white }}
            px="5"
            // onPress={()=> {handleStartAssessment()}}
            onPress={() => {
              setChooseAssessmentTypeModal(true);
            }}
          >
            {/*{t("START ASSESSMENT")}*/}
            {t("Next")}
          </Button>
        </Button.Group>
      </Box>

      {/*========= drawer2 =============*/}
      <Actionsheet
        isOpen={chooseAssessmentTypeModal}
        onClose={() => setChooseAssessmentTypeModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2 textTransform="none">{t("Choose the type of assessment")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={() => setChooseSubjectModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={2} justifyContent="center" bg={colors.white}>
          {assessmentTypes && assessmentTypes.length ? (
            assessmentTypes.map((assessmentType) => {
              return (
                <Actionsheet.Item
                  key={assessmentType}
                  onPress={() => {
                    handleAssessmentTypeSelection(assessmentType);
                  }}
                >
                  <BodyLarge
                    color={
                      selectedAssessmentType === assessmentType
                        ? "black"
                        : colors.gray
                    }
                  >
                    {assessmentType}
                  </BodyLarge>
                </Actionsheet.Item>
              );
            })
          ) : (
            <>No Subjects</>
          )}

          <Box p="4">
            <Button
              colorScheme="button"
              _text={{
                color: colors.white,
              }}
              onPress={() => {
                setChooseAssessmentTypeModal(false);
                if (selectedAssessmentType === "Written Assessment") {
                  setChooseCompetenciesModal(true);
                } else if (selectedAssessmentType === "Oral Assessment") {
                  //code to navigate to google bolo
                }
              }}
              isDisabled={!selectedAssessmentType}
            >
              {t("Next")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>

      {/*========= drawer3 =============*/}
      <Actionsheet
        isOpen={chooseCompetenciesModal}
        onClose={() => setChooseCompetenciesModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("Select the competencies")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setChooseCompetenciesModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={5} justifyContent="center" bg="white">
          {competencies && competencies.length ? (
            competencies.map((competence) => {
              return (
                <HStack
                  justifyContent={"space-between"}
                  py={4}
                  key={competence}
                >
                  <BodyLarge>{t(competence)}</BodyLarge>
                  <Checkbox
                    colorScheme="button"
                    borderColor={colors.primary}
                    borderRadius="0"
                    _text={{ color: colors.primary, fontSize: "14px" }}
                    isChecked={selectedCompetencies.includes(competence)}
                    onChange={() => {
                      handleCompetenceSelection(competence);
                    }}
                  />
                </HStack>
              );
            })
          ) : (
            <>No Competencies</>
          )}

          <Box p="5">
            <Button
              colorScheme="button"
              _text={{
                color: colors.white,
              }}
              // onPress={() => setPageName("assessmentStudentList")}
              onPress={() => {
                handleStartAssessment();
              }}
              isDisabled={
                !(selectedCompetencies && selectedCompetencies.length)
              }
            >
              {t("Next")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </>
  );
};

export default StudentListCard;
