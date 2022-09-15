import {
  BodyLarge,
  H2,
  IconByName,
  assessmentRegistryService,
  questionRegistryService,
} from "@shiksha/common-lib";
import SuccessPublicationReport from "components/SpotAssessment/successPublicationReport";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Pressable,
  Stack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import AssessmentResult from "./AssessmentResult";
import QumlTest from "./QumlTest";
import StudentsListPage from "./StudentsList";

export default function AssessmentGiven(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let { classId, subject } = useParams();
  classId = classId ? classId : "ce045222-52a8-4a0a-8266-9220f63baba7";
  subject = subject ? subject : "English";
  const [pageName, setPageName] = React.useState();
  const [competencies, setCompetencies] = React.useState([]);
  const [selectedCompetencies, setSelectedCompetencies] = React.useState([]);
  const [fetchingQuestion, setFetchingQuestion] = React.useState(false);
  const [questionIds, setQuestionIds] = React.useState([]);

  const [assessmentTypes, setAssessmentTypes] = React.useState([
    "Oral Assessment",
    "Written Assessment",
  ]);
  const [selectedAssessmentType, setSelectedAssessmentType] = React.useState();

  const [chooseAssessmentTypeModal, setChooseAssessmentTypeModal] =
    React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState();
  const [chooseCompetenciesModal, setChooseCompetenciesModal] =
    React.useState(false);

  const [isRepeat, setIsRepeat] = React.useState(false);
  const [similarWithComp, setSimilarWithComp] = React.useState(false);
  const [similarWithoutComp, setSimilarWithoutComp] = React.useState(false);

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

  const handleSelectedStudent = (student) => {
    setSelectedStudent(student);
  };

  const getCompetenciesList = async () => {
    const res = await assessmentRegistryService.getCompetenciesList({
      subject: subject,
    });
    setCompetencies(res);
  };

  const handleCompetenceSelection = (competence) => {
    let newData = [];
    if (selectedCompetencies.includes(competence)) {
      newData = selectedCompetencies.filter((e) => competence !== e);
    } else {
      newData = [...selectedCompetencies, competence];
    }
    setSelectedCompetencies(newData);
  };

  const handleStartAssessment = async () => {
    const { config } = props;
    if (!isRepeat) {
      setFetchingQuestion(true);
      const limit = config["spot-assessment.limitOfNumberOfQuestions"];
      let data = {
        adapter: config["spot-assessment.questionSource"],
        limit,
        subject: subject,
        bloomsLevel: selectedCompetencies || "application",
        questionType: "MCQ",
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

  const handleAssessmentEnd = () => {
    setSelectedStudent([]);
    setSelectedAssessmentType();
    setSelectedCompetencies();
    setPageName("SuccessPublicationReport");
  };

  React.useEffect(async () => {
    await getCompetenciesList();
  }, []);

  if (pageName === "SuccessPublicationReport") {
    return (
      <SuccessPublicationReport
        {...props}
        {...{ classId, subject, handleBackButton, selectedStudent }}
      />
    );
  }

  if (pageName === "QUMLTest") {
    return (
      <QumlTest
        {...props}
        classId={classId}
        setPageName={setPageName}
        handleBackButton={handleBackButton}
        selectedStudent={selectedStudent}
        selectedAssessmentType={selectedAssessmentType}
        selectedCompetencies={selectedCompetencies}
        selectedSubject={subject}
        questionIds={questionIds}
      />
    );
  }

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

  return (
    <>
      <StudentsListPage
        {...props}
        classId={classId}
        setPageName={setPageName}
        handleBackButton={handleBackButton}
        handleStudentPageNext={handleStudentPageNext}
        handleSelectedStudent={handleSelectedStudent}
        selectedStudent={selectedStudent}
      />
      {/*========= choose Assessment Type Modal =============*/}
      <Actionsheet
        isOpen={chooseAssessmentTypeModal}
        onClose={() => setChooseAssessmentTypeModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={"assessment.cardBg"}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2 textTransform="none">{t("Choose the type of assessment")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"assessment.cardCloseIcon"}
              onPress={() => setChooseAssessmentTypeModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={2} justifyContent="center" bg={"assessment.white"}>
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
                        : "assessment.gray"
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
              _text={{
                color: "assessment.white",
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

      {/*========= choose Competencies Modal =============*/}
      <Actionsheet
        isOpen={chooseCompetenciesModal}
        onClose={() => setChooseCompetenciesModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={"assessment.cardBg"}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2 textTransform="none">{t("Select the competencies")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"assessment.cardCloseIcon"}
              onPress={(e) => setChooseCompetenciesModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={5} justifyContent="center" bg="white">
          {competencies && competencies.length ? (
            competencies.map((competence) => {
              const isSelected = selectedCompetencies.includes(competence);
              return (
                <Pressable
                  key={competence}
                  onPress={() => {
                    handleCompetenceSelection(competence);
                  }}
                >
                  <HStack justifyContent={"space-between"} py={4}>
                    <BodyLarge>{t(competence)}</BodyLarge>
                    <IconByName
                      isDisabled
                      color={
                        isSelected ? "assessment.primary" : "assessment.gray"
                      }
                      name={
                        isSelected
                          ? "CheckboxLineIcon"
                          : "CheckboxBlankLineIcon"
                      }
                    />
                  </HStack>
                </Pressable>
              );
            })
          ) : (
            <>No Competencies</>
          )}

          <Box p="5">
            <Button
              colorScheme="button"
              _text={{
                color: "assessment.white",
              }}
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
