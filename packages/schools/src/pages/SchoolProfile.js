import { Layout, Menu, schoolRegisteryService } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Button } from "native-base";
import SchoolAddressCard from "../components/SchoolAddressCard";
import SchoolAdminDetailCard from "../components/SchoolAdminDetailCard";
import SchoolAcademicDetailCard from "../components/SchoolAcademicDetailCard";
import TeacherListCard from "../components/TeacherListCard";
import PastVisitCard from "../components/PastVisitCard";

export default function SchoolProfile({ footerLinks }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const [schoolData, setSchoolData] = useState(null);

  useEffect(async () => {
    const data = await schoolRegisteryService.getSchoolById({
      id,
    });
    setSchoolData(() => data);
  }, [id]);
  return (
    schoolData && (
      <Layout
        imageUrl={`${window.location.origin}/school.png`}
        _header={{
          title: schoolData?.schoolName,
          _heading: { color: "schools.white", t },
        }}
        _appBar={{
          languages: ["en"],
        }}
        subHeader={
          <Menu
            routeDynamics={true}
            _icon={{ isDisabled: true }}
            items={[
              {
                keyId: 1,
                title: "Start a Visit",
                _text: { minW: "115px" },
                onPress: (e) => navigate("/schools/new-visit"),
              },
            ]}
            type={"vertical"}
          />
        }
        _subHeader={{ bg: "schools.cardBg" }}
        _footer={footerLinks}
      >
        <Box p={6} bg={"schools.white"}>
          <VStack space={6}>
            <Box>
              <VStack space={6}>
                <SchoolAddressCard schoolData={schoolData} />
                <SchoolAdminDetailCard schoolId={id} />
                <SchoolAcademicDetailCard />
                <TeacherListCard schoolId={id} />
                <PastVisitCard schoolId={id} />
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Layout>
    )
  );
}
