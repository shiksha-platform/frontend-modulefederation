import {
  H2,
  IconByName,
  Layout,
  ProgressBar,
  overrideColorTheme,
  Loading,
  useWindowSize,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Button } from "native-base";
import SchoolAcademicDetailCard from "../components/SchoolAcademicDetailCard";
import nipun_badge from "../stories/assets/nipun_badge.svg";
import colorTheme from "../colorTheme";
import SchoolAssessmentResultCollapsibleCard from "../components/SchoolAssessmentResultCollapsibleCard";
const colors = overrideColorTheme(colorTheme);

export default function SchoolProfile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [width, height] = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [schoolDetail, setSchoolDetail] = useState({});

  useEffect(() => {
    const detail = JSON.parse(localStorage.getItem("hp-assessment-school"));
    setSchoolDetail(detail);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        title: schoolDetail?.schoolName,
        subHeading: schoolDetail?.district,
        ...(schoolDetail &&
          schoolDetail.assessmentStatus === "nipun" && {
            iconComponent: (
              <img src={nipun_badge} alt="nipun" style={{ maxWidth: "75px" }} />
            ),
          }),
        /*subHeading: (
          <VStack>
            <Text>
              {t("Ghaziabad, Uttar Pradesh")}
            </Text>
            <HStack>
              <IconByName
                name="MapPinLineIcon"
              />
            </HStack>
          </VStack>
        ),*/
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
        <VStack space={4}>
          <SchoolAcademicDetailCard />
          <SchoolAssessmentResultCollapsibleCard />
        </VStack>
      </Box>
    </Layout>
  );
}
