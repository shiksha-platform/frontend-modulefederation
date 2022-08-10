import { Layout, Menu } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
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

  return (
    <Layout
      imageUrl={`${window.location.origin}/school.png`}
      _header={{
        title: "Delhi Public School, Ghaziabad",
        _heading: { color: "schools.white" },
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
            {
              keyId: 2,
              title: "See Calendar",
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
              <SchoolAddressCard />
              <SchoolAdminDetailCard />
              <SchoolAcademicDetailCard />
              <TeacherListCard />
              <PastVisitCard />
              <Box>
                <Button variant="outline">See All Allocated Teachers</Button>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
}
