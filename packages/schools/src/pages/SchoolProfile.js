import React, { useEffect, useState } from "react";

// Imports for navigationa and for extraction of params
import { useNavigate, useParams } from "react-router-dom";

// Import for translation
import { useTranslation } from "react-i18next";

// Imports for common library functions and native base components
import { Box, VStack } from "native-base";
import {
  Layout,
  mentorRegisteryService,
  Menu,
  schoolRegisteryService,
} from "@shiksha/common-lib";

// Components used inside the School Profile page
import SchoolAddressCard from "components/SchoolAddressCard";
import SchoolAdminDetailCard from "components/SchoolAdminDetailCard";
import SchoolAcademicDetailCard from "components/SchoolAcademicDetailCard";
import TeacherListCard from "components/TeacherListCard";
import PastVisitCard from "components/PastVisitCard";

export default function SchoolProfile({ footerLinks }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Fectchig school Id from the page route
  const { id } = useParams();

  // It will contain the school data of fetched id
  const [schoolData, setSchoolData] = useState(null);

  // It will contain the mentor visit details of specific school
  const [visitedSchoolsData, setVisitedSchoolsData] = useState(null);

  useEffect(async () => {
    // Fectchig the school data and setting up in the state
    const data = await schoolRegisteryService.getSchoolById({
      id,
    });
    setSchoolData(() => data);

    // Fectchig the mentor visit details of specific school and setting up in the state
    const visitedData = await mentorRegisteryService.getAllAllocatedSchools({
      mentorId: localStorage.getItem("id"),
      schoolId: id,
    });
    setVisitedSchoolsData(() => visitedData);
  }, []);
  return (
    // Check if the visit details and school data is present or not
    visitedSchoolsData &&
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
          // Start Visit button will only appear when there will be a allocated school to you
          visitedSchoolsData.length > 0 && (
            <Menu
              routeDynamics={true}
              _icon={{ isDisabled: true }}
              items={[
                {
                  keyId: 1,
                  title: "Start a Visit",
                  _text: { minW: "115px" },
                  onPress: () => navigate(`/schools/new-visit/${id}`),
                },
              ]}
              type={"vertical"}
            />
          )
        }
        _subHeader={{ bg: "schools.cardBg" }}
        _footer={footerLinks}
      >
        <Box p={6} bg={"schools.white"}>
          <VStack space={6}>
            {/* To check whether the school is been allocated to you or not */}
            {visitedSchoolsData && visitedSchoolsData.length > 0 ? (
              <Box>
                <VStack space={6}>
                  <SchoolAddressCard schoolData={schoolData} />
                  <SchoolAdminDetailCard schoolId={id} />
                  <SchoolAcademicDetailCard />
                  <TeacherListCard
                    schoolId={id}
                    visitedData={visitedSchoolsData}
                  />
                  <PastVisitCard schoolId={id} />
                </VStack>
              </Box>
            ) : (
              <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
                This school is not allocated to you for visit
              </Box>
            )}
          </VStack>
        </Box>
      </Layout>
    )
  );
}
