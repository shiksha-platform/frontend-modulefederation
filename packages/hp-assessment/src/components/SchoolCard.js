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
  if (status === "VISITED") {
    return (
      <Box bg="hpAssessment.ongoing" borderRadius={10}>
        {children}
      </Box>
    );
  }
  if (status === "NIPUN_READY" || status === "NIPUN") {
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

function SchoolCard({ schoolId, groupIds, scheduleVisitDate, monitorId }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [schoolDetail, setSchoolDetail] = useState({});
  const [schoolStatus, setSchoolStatus] = useState("");

  const getSchoolDetail = async (id) => {
    let list = [];
    const detail = await hpAssessmentRegistryService.getSchoolDetail(id);
    for (let i = 1; i < 4; i++) {
      const params = {
        limit: 1,
        page: 1,
        filters: { school_id: id, grade_number: i },
      };
      list.push(hpAssessmentRegistryService.studentSearch(params));
    }

    await Promise.all(list).then((res) => {
      const total = res.reduce((sum, item) => {
        return (
          (typeof sum !== "number" ? sum?.data?.total : sum) +
          Number(item.data.total)
        );
      });
      detail["totalStudents"] = total;
    });
    detail["assessmentStatus"] = status;
    setSchoolDetail(detail);
  };

  const getSchoolStatus = async () => {
    const reqData = {
      evaluation_date: scheduleVisitDate,
      monitorId: monitorId,
    };
    const data = await hpAssessmentRegistryService.getSchoolStatus(
      schoolId,
      reqData
    );
    setSchoolStatus(data.nipun_status);
  };

  const _handleSchoolSelect = () => {
    localStorage.setItem("hp-assessment-school", JSON.stringify(schoolDetail));
    localStorage.setItem("hp-assessment-grades", groupIds);
    navigate("/hpAssessment/school-profile");
  };

  useEffect(() => {
    getSchoolDetail(schoolId);
    getSchoolStatus();
  }, []);

  return (
    <>
      <VStack space={6}>
        <Pressable onPress={_handleSchoolSelect}>
          <CardBasedOnStatus status={schoolStatus}>
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
                  {schoolStatus === "NIPUN" && (
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
                      <Caption>{schoolDetail?.cluster}</Caption>
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
                      <Caption>{schoolDetail?.totalStudents}</Caption>
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
