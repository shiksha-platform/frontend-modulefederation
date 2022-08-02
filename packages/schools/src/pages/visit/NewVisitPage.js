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
        _heading: { color: colors0.white },
      }}
      _appBar={{
        languages: ["en"],
        isEnableSearchBtn: true,
      }}
    >
      <Box rounded={10} bg={colors0.white} shadow="md">
        <VStack>
          <Box p={4}>
            <H2>Start your visit based on</H2>
          </Box>
          <Divider />
          <Box p={6}>
            <VStack space={6}>
              <Box>
                <TeacherFilterButton
                  getObject={callBackFilterObject}
                  object={filterObject}
                  _actionSheet={{ bg: colors.cardBg }}
                  _box={{ pt: 5 }}
                  _button={{ bg: colors.primary, px: "15px", py: "2" }}
                  _filterButton={{
                    rightIcon: "",
                    bg: colors0.white,
                  }}
                  resetButtonText={t("COLLAPSE")}
                />
              </Box>
              <Box>
                <ClassFilterButton
                  getObject={callBackFilterObject}
                  object={filterObject}
                  _actionSheet={{ bg: colors.cardBg }}
                  _button={{ bg: colors.primary, px: "15px", py: "2" }}
                  _filterButton={{
                    rightIcon: "",
                    bg: colors0.white,
                  }}
                  resetButtonText={t("COLLAPSE")}
                />
              </Box>
              <Box>
                <SubjectFilterButton
                  getObject={callBackFilterObject}
                  object={filterObject}
                  _actionSheet={{ bg: colors.cardBg }}
                  _button={{ bg: colors.primary, px: "15px", py: "2" }}
                  _filterButton={{
                    rightIcon: "",
                    bg: colors0.white,
                  }}
                  resetButtonText={t("COLLAPSE")}
                />
              </Box>
            </VStack>
          </Box>
          <Divider />
          <Box p={4}>
            <Button
              colorScheme="button"
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
