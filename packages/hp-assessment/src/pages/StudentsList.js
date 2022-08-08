import {
  classRegistryService,
  H3,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Avatar, Stack, Box, Button, HStack } from "native-base";
import StudentListCard from "../components/StudentListCard";
import colorTheme from "../colorTheme";
import { useNavigate } from "react-router-dom";

const colors = overrideColorTheme(colorTheme);

export default function StudentsListPage({
  classId,
  setPageName,
  handleBackButton,
  chooseAssessmentTypeModal,
  handleSelectedStudent,
  selectedStudent,
  handleStudentPageNext,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState();

  return (
    <Layout
      _header={{
        title: "Grade I"
      }}
      _appBar={{
        languages: ["en"],
      }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            route: "/",
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            route: "/classes",
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            route: "/",
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            route: "/",
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            route: "/",
          },
        ],
      }}
    >
      <Box p={4}>
        <StudentListCard
          classId={classId}
          setPageName={setPageName}
          chooseAssessmentTypeModal={chooseAssessmentTypeModal}
          handleSelectedStudent={handleSelectedStudent}
          handleStudentPageNext={handleStudentPageNext}
        />
      </Box>
      <Box bg={colors.white} p="5" position="sticky" bottom="85" shadow={2}>
        <HStack justifyContent={"space-between"}>
          <Button
            colorScheme="button"
            variant="outline"
            w="45%"
            mr="2"
            // onPress={()=> setSelectedStudent()}
          >
            {t("Mark Absent")}
          </Button>

          <Button
            colorScheme="button"
            w="50%"
            ml="2"
            _text={{
              color: colors.white,
            }}
            onPress={() =>
              navigate("/oral-assessment-success")
            }
          >
            {t("Continue Assessment")}
          </Button>
        </HStack>
      </Box>
    </Layout>
  );
}
