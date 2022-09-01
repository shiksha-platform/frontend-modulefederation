import {
  classRegistryService,
  H3,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Avatar, Stack } from "native-base";
import StudentListCard from "../components/SpotAssessment/StudentList";
import colorTheme from "../colorTheme";

const colors = overrideColorTheme(colorTheme);

export default function StudentsListPage({
  classId,
  handleBackButton,
  handleSelectedStudent,
  selectedStudent,
  handleStudentPageNext,
  footerLinks,
}) {
  const { t } = useTranslation();
  // const [schoolDetails, setSchoolDetails] = useState();
  const [title, setTitle] = useState();

  const fetchClassDetails = async () => {
    const schoolDetails = await classRegistryService.getOne({ id: classId });
    // setSchoolDetails(schoolDetails);
    setTitle(
      schoolDetails && schoolDetails.name
        ? `${schoolDetails.name} ${schoolDetails?.section}`
        : ""
    );
  };
  useEffect(() => {
    fetchClassDetails();
  }, []);

  return (
    <Layout
      _header={{
        title: title,
        isEnableSearchBtn: true,
        // setSearch: setSearch,
        subHeading: t("Select Students"),
        iconComponent: (
          <Avatar
            size="48px"
            borderRadius="md"
            bg={"primary"}
            _text={{ color: "white" }}
          >
            {localStorage.getItem("fullName")?.toUpperCase()?.substring(0, 2)}
          </Avatar>
        ),
      }}
      _appBar={{
        languages: ["en"],
        onPressBackButton: handleBackButton,
      }}
      subHeader={<H3 textTransform="none">{t("Choose a Student")}</H3>}
      _subHeader={{ bg: colors.cardBg, py: "6" }}
      _footer={footerLinks}
    >
      <Stack space={1} mb="2" shadow={2}>
        <StudentListCard
          classId={classId}
          handleSelectedStudent={handleSelectedStudent}
          selectedStudent={selectedStudent}
          handleStudentPageNext={handleStudentPageNext}
        />
      </Stack>
    </Layout>
  );
}
