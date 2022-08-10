import {
  DEFAULT_THEME,
  H2,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Box, VStack, Button, Divider } from "native-base";
import TeacherFilterButton from "../../components/NewVisit/TeacherFilterButton";
import ClassFilterButton from "../../components/NewVisit/ClassFilterButton";
import SubjectFilterButton from "../../components/NewVisit/SubjectFilterButton";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../colorTheme";
const colors0 = overrideColorTheme(colorTheme);
let colors = DEFAULT_THEME;

export default function NewVisitPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [recommendedVisits, setRecommendedVisits] = useState([{}, {}, {}, {}]);
  const [teacherDetailModal, setTeacherDetailModal] = useState(false);

  const [teacherlist, setTeacherList] = useState([]);

  const [filterObject, setFilterObject] = React.useState({});

  const callBackFilterObject = React.useCallback((e) => {
    setFilterObject();
  }, []);

  React.useEffect(() => {
    setTeacherList([
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
    >
      <Box rounded={10} bg={"schools.white"} shadow="md">
        <VStack>
          <Box p={6}>
            <VStack space={6}>
              <Box>
                <TeacherFilterButton
                  getObject={callBackFilterObject}
                  object={filterObject}
                  _actionSheet={{ bg: "schools.cardBg" }}
                  _box={{ pt: 5 }}
                  _button={{ px: "15px", py: "2" }}
                  _filterButton={{
                    rightIcon: "",
                    bg: "schools.white",
                  }}
                  resetButtonText={t("COLLAPSE")}
                />
              </Box>
              <Box>
                <ClassFilterButton
                  getObject={callBackFilterObject}
                  object={filterObject}
                  _actionSheet={{ bg: "schools.cardBg" }}
                  _button={{ px: "15px", py: "2" }}
                  _filterButton={{
                    rightIcon: "",
                    bg: "schools.white",
                  }}
                  resetButtonText={t("COLLAPSE")}
                />
              </Box>
              <Box>
                <SubjectFilterButton
                  getObject={callBackFilterObject}
                  object={filterObject}
                  _actionSheet={{ bg: "schools.cardBg" }}
                  _button={{ px: "15px", py: "2" }}
                  _filterButton={{
                    rightIcon: "",
                    bg: "schools.white",
                  }}
                  resetButtonText={t("COLLAPSE")}
                />
              </Box>
            </VStack>
          </Box>
          <Divider />
          <Box p={4}>
            <Button
              variant={"outline"}
              py={3}
              onPress={() => {
                navigate("/schools/questionnaire");
              }}
            >
              {t("Start Visit")}
            </Button>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
}
