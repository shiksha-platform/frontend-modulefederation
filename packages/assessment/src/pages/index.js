import {
  assessmentRegistryService,
  BodyLarge,
  Collapsible,
  H2,
  IconByName,
  Layout,
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
  Pressable,
  VStack,
} from "native-base";
import { useNavigate } from "react-router-dom";
import SpotAssessmentCard from "components/SpotAssessment/SpotAssessmentCard";
import ExamScoresCard from "components/ExamScores/ExamScoresCard";
import manifest from "../manifest.json";

const ChooseActionsheet = ({
  chooseSubjectModal,
  setChooseSubjectModal,
  classId,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = React.useState([]);

  useEffect(() => {
    getSubjectsList();
    localStorage.removeItem("assessment-score");
    localStorage.removeItem("assessment-totalScore");
  }, []);

  // homepage methods
  const getSubjectsList = async () => {
    const res = await assessmentRegistryService.getSubjectsList({
      gradeLevel: "class1",
    });
    setSubjects(res);
  };

  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject?.code);
  };

  const handleNext = () => {
    navigate(`/assessment/given/${classId}/${selectedSubject}`);
  };

  return (
    <Actionsheet
      isOpen={chooseSubjectModal}
      onClose={() => setChooseSubjectModal(false)}
    >
      <Actionsheet.Content alignItems={"left"} bg={"assessment.cardBg"}>
        <HStack justifyContent={"space-between"}>
          <Stack p={5} pt={2} pb="15px">
            <H2 textTransform="none">{t("Choose the subject")}</H2>
          </Stack>
          <IconByName
            name="CloseCircleLineIcon"
            color={"assessment.cardCloseIcon"}
            onPress={() => setChooseSubjectModal(false)}
          />
        </HStack>
      </Actionsheet.Content>
      <Box w="100%" justifyContent="center" bg={"assessment.white"}>
        {subjects && subjects.length ? (
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
              color: "assessment.white",
            }}
            onPress={handleNext}
            isDisabled={!selectedSubject}
          >
            {t("Next")}
          </Button>
        </Box>
      </Box>
    </Actionsheet>
  );
};

export default function Assessment({ footerLinks, ...props }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let { classId } = useParams();
  const [chooseSubjectModal, setChooseSubjectModal] = useState(false);

  classId = classId
    ? classId
    : props?.classObject?.id
    ? props?.classObject?.id
    : "ce045222-52a8-4a0a-8266-9220f63baba7";
  let subject = props?.subject ? props.subject : "English";

  const _handleSpotAssessmentStart = () => {
    if (!props?.subject) {
      setChooseSubjectModal(true);
    } else {
      navigate(`/assessment/given/${classId}/${subject}`);
    }
  };

  const Children = () => (
    <Stack space={1} mb="2">
      <VStack py="4" space={4}>
        <SpotAssessmentCard
          {...props}
          classId={classId}
          _viewPastAssessment={{
            onPress: () => {
              navigate(`/assessment/past-assessments/${classId}/${subject}`);
            },
          }}
          _handleSpotAssessmentStart={_handleSpotAssessmentStart}
        />
        <ExamScoresCard />
      </VStack>
      {!props?.subject ? (
        <ChooseActionsheet
          {...{ chooseSubjectModal, setChooseSubjectModal, classId }}
        />
      ) : (
        <React.Fragment />
      )}
    </Stack>
  );

  if (props?.isLayoutNotRequired) {
    return <Children />;
  }
  return (
    <Layout
      _header={{
        title: "Spot Assessment",
        isEnableSearchBtn: true,
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <HStack space="4" justifyContent="space-between">
          <VStack>
            <H2>{"Assessment"}</H2>
          </VStack>
          <IconByName size="sm" name="ArrowRightSLineIcon" isDisabled />
        </HStack>
      }
      _subHeader={{ bg: "assessment.cardBg" }}
      _footer={footerLinks}
    >
      <Stack space={1} mb="2" shadow={2}>
        <Collapsible
          defaultCollapse={true}
          header={<BodyLarge>{t("Assessment")}</BodyLarge>}
        >
          <Children />
        </Collapsible>
      </Stack>
    </Layout>
  );
}
