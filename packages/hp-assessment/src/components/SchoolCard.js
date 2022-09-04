import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  Pressable,
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  hpAssessmentRegistryService,
  IconByName,
  overrideColorTheme,
  H3,
  Caption,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
import nipun_badge from "../stories/assets/nipun_badge.svg";
import { useTranslation } from "react-i18next";
const colors = overrideColorTheme(colorTheme);

const CardBasedOnStatus = ({ status, children }) => {
  if (status === "visited") {
    return (
      <Box bg="hpAssessment.ongoing" borderRadius={10}>
        {children}
      </Box>
    );
  }
  if (status === "nipun_ready" || status === "nipun") {
    return (
      <Box bg="hpAssessment.completed" borderRadius={10}>
        {children}
      </Box>
    );
  }
  return (
    <Box bg={"white"} borderRadius={10}>
      {children}
    </Box>
  );
};

function SchoolCard({ schoolId, groupIds, status }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [schoolDetail, setSchoolDetail] = useState({});

  const getSchoolDetail = async (id) => {
    const detail = await hpAssessmentRegistryService.getSchoolDetail(id);
    detail["assessmentStatus"] = status;
    setSchoolDetail(detail);
  };

  const _handleSchoolSelect = () => {
    localStorage.setItem("hp-assessment-school", JSON.stringify(schoolDetail));
    localStorage.setItem("hp-assessment-grades", groupIds);
    navigate("/hpAssessment/school-profile");
  };

  useEffect(() => {
    getSchoolDetail(schoolId);
  }, []);

  return (
    <>
      <VStack space={6}>
        <Pressable onPress={_handleSchoolSelect}>
          <CardBasedOnStatus status={status}>
            <>
              <Box p={4}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Box>
                    <HStack alignItems="center">
                      <Avatar
                        size="60px"
                        mr={4}
                        borderRadius="5"
                        source={{
                          uri: "https://via.placeholder.com/50x50.png",
                        }}
                      />
                      <VStack>
                        <H3>{schoolDetail?.schoolName}</H3>
                        <Caption color={colors.gray}>
                          {schoolDetail?.district}
                        </Caption>
                      </VStack>
                    </HStack>
                  </Box>
                  {status === "nipun" && (
                    <Box alignItems="end">
                      <img
                        src={nipun_badge}
                        alt="nipun"
                        style={{ maxWidth: "45px" }}
                      />
                    </Box>
                  )}
                </HStack>
              </Box>
              <Divider
                bg={
                  status === "visited"
                    ? "hpAssessment.warning"
                    : status === "nipun_ready" || status === "nipun"
                    ? "hpAssessment.completeSeparator"
                    : "hpAssessment.pendingSeparator"
                }
              />
              <Box p={4}>
                <HStack
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  flexWrap={"wrap"}
                >
                  <Box w={"50%"}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName
                          size="12px"
                          mr={2}
                          ml="-7px"
                          color={colors.gray}
                          name="MapPinLineIcon"
                        />
                        <Caption color={colors.gray}>{t("District")}</Caption>
                      </HStack>
                      <Caption>{schoolDetail?.district}</Caption>
                    </VStack>
                  </Box>

                  <Box w={"50%"}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName
                          size="12px"
                          mr={2}
                          ml="-7px"
                          color={colors.gray}
                          name="GovernmentLineIcon"
                        />
                        <Caption color={colors.gray}>{t("Block")}</Caption>
                      </HStack>
                      <Caption>{schoolDetail?.block}</Caption>
                    </VStack>
                  </Box>

                  <Box w={"50%"} mt={4}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName
                          size="12px"
                          mr={2}
                          ml="-7px"
                          color={colors.gray}
                          name="CalendarEventLineIcon"
                        />
                        <Caption color={colors.gray}>{t("Cluster")}</Caption>
                      </HStack>
                      <Caption>{t("Gandhi Nagar")}</Caption>
                    </VStack>
                  </Box>

                  <Box w={"50%"} mt={4}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName
                          size="12px"
                          mr={2}
                          ml="-7px"
                          color={colors.gray}
                          name="CalendarEventLineIcon"
                        />
                        <Caption color={colors.gray}>
                          {t("Enrollment in Grade 1-3")}
                        </Caption>
                      </HStack>
                      <Caption>200</Caption>
                    </VStack>
                  </Box>

                  <Box w={"50%"} mt={4}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName
                          size="12px"
                          mr={2}
                          ml="-7px"
                          color={colors.gray}
                          name="CalendarEventLineIcon"
                        />
                        <Caption color={colors.gray}>
                          {t("Reference ID/UDISE")}
                        </Caption>
                      </HStack>
                      <Caption>{schoolDetail?.udise}</Caption>
                    </VStack>
                  </Box>
                </HStack>
              </Box>
            </>
          </CardBasedOnStatus>
        </Pressable>
      </VStack>
    </>
  );
}
export default SchoolCard;
