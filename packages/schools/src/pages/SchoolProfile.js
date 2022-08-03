import {
  H2,
  IconByName,
  Layout,
  SearchLayout,
  overrideColorTheme,
  BodyLarge,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Button } from "native-base";
import SchoolAddressCard from "../components/SchoolAddressCard";
import SchoolAdminDetailCard from "../components/SchoolAdminDetailCard";
import SchoolAcademicDetailCard from "../components/SchoolAcademicDetailCard";
import TeacherListCard from "../components/TeacherListCard";
import PastVisitCard from "../components/PastVisitCard";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function SchoolProfile() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout
      imageUrl={
        "https://via.placeholder.com/728x90.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide"
      }
      _header={{
        title: "Delhi Public School, Ghaziabad",
        _heading: { color: colors.white },
        subHeading: (
          <VStack>
            <BodyLarge color={colors.white}>
              {t("Ghaziabad, Uttar Pradesh")}
            </BodyLarge>
            <HStack>
              <IconByName
                name="CameraLineIcon"
                color={colors.white}
                // onPress={() => setSortModal(false)}
              />
              <IconByName
                name="MapPinLineIcon"
                color={colors.white}
                // onPress={() => setSortModal(false)}
              />
            </HStack>
          </VStack>
        ),
        _subHeading: { color: colors.white },
      }}
      _appBar={{
        languages: ["en"],
        // isEnableSearchBtn: true,
        // setSearch,
        // setSearchState,
      }}
      subHeader={
        <Box bg={colors.white} px={2}>
          <HStack alignItems="center" justifyContent="space-between">
            <Button
              leftIcon={<IconByName name="ArrowRightSFillIcon" p={0} />}
              onPress={() => {
                navigate("/schools/new-visit");
              }}
            >
              Start a Visit
            </Button>
            <Button
              variant="outline"
              leftIcon={<IconByName name="CalendarEventLineIcon" p={0} />}
            >
              See Calendar
            </Button>
          </HStack>
        </Box>
      }
      _subHeader={{ bg: colors.white }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "VISITS",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/my-visits",
            routeparameters: {},
          },
          {
            title: "LEARNING",
            icon: "LightbulbFlashLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "PROFILE",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <Box p={6}>
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
