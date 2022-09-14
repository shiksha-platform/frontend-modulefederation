// Route: {basePath}/schools/new-visit/{id}

import React, { useState, useEffect } from "react";

// Imports for navigation and for extraction of params
import { useNavigate, useParams } from "react-router-dom";

// Import for translation
import { useTranslation } from "react-i18next";
import manifest from "manifest.json";

// Imports from common library functions and native base components
import { Box, VStack, Button, Divider } from "native-base";
import {
  H2,
  Layout,
  Loading,
  mentorRegisteryService,
} from "@shiksha/common-lib";

// Components used inside the New Visits page for adding different classes filters
import TeacherFilterButton from "components/NewVisit/TeacherFilterButton";
import ClassFilterButton from "components/NewVisit/ClassFilterButton";
import SubjectFilterButton from "components/NewVisit/SubjectFilterButton";

export default function NewVisitPage({ footerLinks }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [visitData, setVisitData] = useState();

  const { schoolId } = useParams();

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(async () => {
    const data = await mentorRegisteryService.getAllAllocatedSchools({
      mentorId: localStorage.getItem("id"),
      schoolId,
      status: "pending",
    });
    console.log({ data });
    setVisitData(data);
  }, [schoolId]);

  return (
    <Layout
      _header={{
        title: "New Visit",
      }}
      subHeader={<H2 textTransform="inherit">Start your visit based on</H2>}
      _subHeader={{ bg: "schools.cardBg" }}
      _appBar={{
        languages: manifest.languages,
      }}
      _footer={footerLinks}
    >
      {visitData ? (
        <Box rounded={10} bg={"schools.white"} shadow="md">
          <VStack>
            <Box p={6}>
              <VStack space={6}>
                <Box>
                  <TeacherFilterButton
                    data={visitData}
                    selectedTeacher={selectedTeacher}
                    setSelectedTeacher={setSelectedTeacher}
                  />
                </Box>
                {selectedTeacher && (
                  <Box>
                    <ClassFilterButton
                      data={selectedTeacher?.id}
                      selectedClass={selectedClass}
                      setSelectedClass={setSelectedClass}
                    />
                  </Box>
                )}

                {selectedTeacher && selectedClass && (
                  <Box>
                    <SubjectFilterButton
                      data={selectedTeacher?.id}
                      selectedSubject={selectedSubject}
                      setSelectedSubject={setSelectedSubject}
                    />
                  </Box>
                )}
              </VStack>
            </Box>
            <Divider />
            <Box p={4}>
              <Button
                py={3}
                onPress={() => {
                  navigate("/schools/questionnaire");
                }}
                _text={{ color: "schools.white" }}
                isDisabled={
                  (selectedTeacher && selectedClass && selectedSubject) === null
                    ? true
                    : false
                }
              >
                {t("Start Visit")}
              </Button>
            </Box>
          </VStack>
        </Box>
      ) : (
        <Loading height={"200px"} />
      )}
    </Layout>
  );
}
