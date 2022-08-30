import { H2, Layout, mentorRegisteryService } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Box, VStack, Button, Divider } from "native-base";
import TeacherFilterButton from "components/NewVisit/TeacherFilterButton";
import ClassFilterButton from "components/NewVisit/ClassFilterButton";
import SubjectFilterButton from "components/NewVisit/SubjectFilterButton";
import { useNavigate, useParams } from "react-router-dom";

export default function NewVisitPage({ footerLinks }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [visitData, setVisitData] = useState();

  const [filterObject, setFilterObject] = useState({});

  const callBackFilterObject = React.useCallback((e) => {
    setFilterObject();
  }, []);

  const { schoolId } = useParams();

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(async () => {
    const data = await mentorRegisteryService.getAllAllocatedSchools({
      mentorId: localStorage.getItem("id"),
      schoolId,
    });
    console.log(data);
    setVisitData(data);
  }, []);

  return (
    <Layout
      _header={{
        title: "New Visit",
      }}
      subHeader={<H2 textTransform="inherit">Start your visit based on</H2>}
      _subHeader={{ bg: "schools.cardBg" }}
      _appBar={{
        languages: ["en"],
        isEnableSearchBtn: true,
      }}
      _footer={footerLinks}
    >
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
                    data={selectedTeacher?.id?.slice(
                      2,
                      selectedTeacher?.id?.length
                    )}
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                  />
                </Box>
              )}

              {selectedTeacher && selectedClass && (
                <Box>
                  <SubjectFilterButton
                    data={selectedTeacher?.id?.slice(
                      2,
                      selectedTeacher?.id?.length
                    )}
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
    </Layout>
  );
}
