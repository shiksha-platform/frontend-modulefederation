import {
  assessmentRegistryService,
  BodyLarge,
  classRegistryService,
  H2,
  IconByName,
  overrideColorTheme,
  questionRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  HStack,
  Stack,
  Actionsheet,
  Button,
  Checkbox,
  Pressable,
} from "native-base";
import colorTheme from "../colorTheme";
import StudentsListPage from "./StudentsList";
import Homepage from "./Homepage";
import QumlTest from "./QumlTest";
import AssessmentResult from "./AssessmentResult";
import { useNavigate } from "react-router-dom";
import PastExaminationsList from "./PastExaminations";
import SuccessPublicationReport from "../components/SpotAssessment/successPublicationReport";
const colors = overrideColorTheme(colorTheme);

export default function Assessment(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let { classId } = useParams();
  classId = classId
    ? classId
    : props.classId
    ? props.classId
    : "ce045222-52a8-4a0a-8266-9220f63baba7";
  let subject = props?.subject ? props.subject : "English";
  const [fetchingQuestion, setFetchingQuestion] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [pageName, setPageName] = useState("");
  const [questionIds, setQuestionIds] = useState([]);
  const [schoolDetails, setSchoolDetails] = useState();

  // subject Modal states
  const [chooseSubjectModal, setChooseSubjectModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("English");

  // assessment type modal states
  const [chooseAssessmentTypeModal, setChooseAssessmentTypeModal] =
    useState(false);
  const [assessmentTypes, setAssessmentTypes] = useState([
    "Oral Assessment",
    "Written Assessment",
  ]);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState();
  // competencies modal states
  const [chooseCompetenciesModal, setChooseCompetenciesModal] = useState(false);
  const [competencies, setCompetencies] = useState([]);
  const [selectedCompetencies, setSelectedCompetencies] = useState(
    []
    // JSON.parse(localStorage.getItem("assessment-competencies")) || []
  );
  const [selectedStudent, setSelectedStudent] = useState();
  // JSON.parse(localStorage.getItem("assessment-student")) || null
  const [isRepeat, setIsRepeat] = useState(false);
  const [similarWithComp, setSimilarWithComp] = useState(false);
  const [similarWithoutComp, setSimilarWithoutComp] = useState(false);

  useEffect(() => {
    // localStorage.setItem("assessment-class", classId);
    fetchClassDetails();
    getSubjectsList();
    localStorage.removeItem("assessment-score");
    localStorage.removeItem("assessment-totalScore");
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      getCompetenciesList(selectedSubject);
    }
  }, [selectedSubject]);

  const fetchClassDetails = async () => {
    const schoolDetails = await classRegistryService.getOne({ id: classId });
    setSchoolDetails(schoolDetails);
  };

  const handleBackButton = () => {
    if (pageName === "assessmentStudentList") {
      setPageName();
    } else if (pageName === "QUMLTest") {
      setPageName("assessmentStudentList");
    } else if (pageName === "assessmentResult") {
      setPageName();
    } else {
      navigate(-1);
    }
  };

  // homepage methods
  const getSubjectsList = async () => {
    setLoadingSubjects(true);
    const res = await assessmentRegistryService.getSubjectsList({
      gradeLevel: "class1",
    });
    setSubjects(res);
    setLoadingSubjects(false);
  };

  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject?.code);
    // localStorage.setItem("assessment-subject", subject);
  };

  const _handleSpotAssessmentStart = () => {
    if (!subject) {
      setChooseSubjectModal(true);
    } else {
      navigate(`/assessment/given/${classId}/${subject}`);
    }
  };

  //student list page methods
  const handleStudentPageNext = () => {
    if (isRepeat || similarWithoutComp) {
      handleStartAssessment();
      return;
    }
    if (similarWithComp) {
      setChooseCompetenciesModal(true);
      return;
    }
    setChooseAssessmentTypeModal(true);
  };
  const handleAssessmentTypeSelection = (assessmentType) => {
    setSelectedAssessmentType(assessmentType);
  };

  const handleCompetenceSelection = (competence) => {
    // console.log('selectedCompetencies', selectedCompetencies);
    let assessmentCompetencies = selectedCompetencies;
    const index = assessmentCompetencies.indexOf(competence);
    if (index !== -1) {
      selectedCompetencies.splice(index, 1);
    } else {
      selectedCompetencies.push(competence);
    }
    setSelectedCompetencies(assessmentCompetencies.slice(0));
    /*if (assessmentCompetencies) {
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
    }*/
  };

  const handleSelectedStudent = (student) => {
    setSelectedStudent(student);
  };

  const getCompetenciesList = async (selectedSubject) => {
    const res = await assessmentRegistryService.getCompetenciesList({
      subject: selectedSubject,
    });
    setCompetencies(res);
  };

  const handleAssessmentEnd = () => {
    setSelectedStudent([]);
    setSelectedAssessmentType();
    setSelectedCompetencies();
    setSelectedSubject();
    setPageName("");
    navigate("/assessment/assessment-success");
  };

  const handleStartAssessment = async () => {
    if (!isRepeat) {
      setFetchingQuestion(true);
      const limit = 2;
      let data = {
        adapter: "diksha",
        limit,
        subject: selectedSubject || "English",
        bloomsLevel: selectedCompetencies || "application",
      };
      const questions = await questionRegistryService.getAllQuestions(data);
      let questionIds = questions.map((question) => {
        return question.questionId;
      });
      setQuestionIds(questionIds);
      setFetchingQuestion(false);
    }
    setChooseCompetenciesModal(false);
    setPageName("QUMLTest");
  };

  // render page layout based on pageName state
  if (pageName === "assessmentResult") {
    return (
      <AssessmentResult
        handleBackButton={handleBackButton}
        selectedStudent={selectedStudent}
        setSelectedCompetencies={setSelectedCompetencies}
        setPageName={setPageName}
        setSelectedStudent={setSelectedStudent}
        setIsRepeat={setIsRepeat}
        setSimilarWithComp={setSimilarWithComp}
        setSimilarWithoutComp={setSimilarWithoutComp}
        handleAssessmentEnd={handleAssessmentEnd}
        setChooseAssessmentTypeModal={setChooseAssessmentTypeModal}
        setSelectedAssessmentType={setSelectedAssessmentType}
        selectedAssessmentType={selectedAssessmentType}
      />
    );
  }
  if (pageName === "QUMLTest") {
    return (
      <QumlTest
        appName={props.appName}
        classId={classId}
        setPageName={setPageName}
        handleBackButton={handleBackButton}
        selectedStudent={selectedStudent}
        selectedAssessmentType={selectedAssessmentType}
        selectedCompetencies={selectedCompetencies}
        selectedSubject={selectedSubject}
        questionIds={questionIds}
      />
    );
  }
  if (pageName === "assessmentStudentList") {
    return (
      <>
        <StudentsListPage
          classId={classId}
          setPageName={setPageName}
          handleBackButton={handleBackButton}
          chooseAssessmentTypeModal={chooseAssessmentTypeModal}
          handleStudentPageNext={handleStudentPageNext}
          handleSelectedStudent={handleSelectedStudent}
          selectedStudent={selectedStudent}
        />
        {/*========= choose Assessment Type Modal =============*/}
        {chooseAssessmentTypeModal && (
          <Actionsheet
            isOpen={chooseAssessmentTypeModal}
            onClose={() => setChooseAssessmentTypeModal(false)}
          >
            <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
              <HStack justifyContent={"space-between"}>
                <Stack p={5} pt={2} pb="15px">
                  <H2 textTransform="none">
                    {t("Choose the type of assessment")}
                  </H2>
                </Stack>
                <IconByName
                  name="CloseCircleLineIcon"
                  color={colors.cardCloseIcon}
                  onPress={() => setChooseAssessmentTypeModal(false)}
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
        )}

        {/*========= choose Competencies Modal =============*/}
        <Actionsheet
          isOpen={chooseCompetenciesModal}
          onClose={() => setChooseCompetenciesModal(false)}
        >
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="15px">
                <H2 textTransform="none">{t("Select the competencies")}</H2>
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
                  <React.Fragment key={competence}>
                    <HStack justifyContent={"space-between"} py={4}>
                      <BodyLarge>{t(competence)}</BodyLarge>
                      <Checkbox
                        colorScheme="button"
                        borderColor={colors.primary}
                        borderRadius="0"
                        _text={{ color: colors.primary, fontSize: "14px" }}
                        // isChecked={selectedCompetencies.indexOf(competence) !== -1}
                        onChange={() => {
                          handleCompetenceSelection(competence);
                        }}
                      />
                    </HStack>
                  </React.Fragment>
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
                  !(selectedCompetencies && selectedCompetencies.length) ||
                  fetchingQuestion
                }
              >
                {fetchingQuestion ? t("Fetching...") : t("START ASSESSMENT")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
      </>
    );
  }

  if (pageName === "pastExaminations") {
    return (
      <PastExaminationsList
        classId={classId}
        setPageName={setPageName}
        handleBackButton={handleBackButton}
        selectedStudent={selectedStudent}
        selectedAssessmentType={selectedAssessmentType}
        selectedCompetencies={selectedCompetencies}
        selectedSubject={selectedSubject}
        questionIds={questionIds}
        schoolDetails={schoolDetails}
      />
    );
  }

  if (pageName === "assessmentSuccessReport") {
    return (
      <SuccessPublicationReport
        classId={classId}
        setPageName={setPageName}
        handleBackButton={handleBackButton}
        selectedStudent={selectedStudent}
        selectedAssessmentType={selectedAssessmentType}
        selectedCompetencies={selectedCompetencies}
        selectedSubject={selectedSubject}
        questionIds={questionIds}
        schoolDetails={schoolDetails}
      />
    );
  }

  return (
    <>
      <Homepage
        {...props}
        {...{ classId, setPageName, subject }}
        _handleSpotAssessmentStart={_handleSpotAssessmentStart}
      />
      {!subject ? (
        <Actionsheet
          isOpen={chooseSubjectModal}
          onClose={() => setChooseSubjectModal(false)}
        >
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="15px">
                <H2 textTransform="none">{t("Choose the subject")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.cardCloseIcon}
                onPress={() => setChooseSubjectModal(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box w="100%" justifyContent="center" bg={colors.white}>
            {loadingSubjects ? (
              <>Loading Subjects...</>
            ) : subjects && subjects.length ? (
              subjects.map((subject) => {
                return (
                  <Pressable
                    key={subject?.code}
                    p="3"
                    bg={
                      selectedSubject === subject.code
                        ? "assessment.lightGray2"
                        : "white"
                    }
                    onPress={() => {
                      handleSubjectSelection(subject);
                    }}
                  >
                    <BodyLarge color={"black"} textTransform="none">
                      {t(subject.name)}
                    </BodyLarge>
                  </Pressable>
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
                  setChooseSubjectModal(false);
                  // setChooseAssessmentTypeModal(true);
                  setPageName("assessmentStudentList");
                }}
                isDisabled={!selectedSubject}
              >
                {t("Next")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
      ) : (
        <React.Fragment />
      )}
    </>
  );
}
