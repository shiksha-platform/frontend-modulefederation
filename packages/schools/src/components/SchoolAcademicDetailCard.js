import React, { useState } from "react";
import { Box, VStack, HStack, Divider, Actionsheet, Stack } from "native-base";
import {
  H2,
  IconByName,
  Collapsible,
  H3,
  BodyMedium,
  classRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SchoolAcademicDetailCard({ schoolId, configReport }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [classId, setClassId] = React.useState();

  // It will contain the class data of fetched id
  const [classData, setClassData] = useState([]);

  React.useEffect(async () => {
    const classResult = await classRegistryService.getAllData({
      schoolId: { eq: schoolId },
      type: { eq: "Parent class" },
      coreData: "getStudents",
    });
    setClassData(() => classResult);
  }, [schoolId]);

  return (
    <>
      <Collapsible
        defaultCollapse={true}
        header={
          <Box py={4}>
            <H2>{t("ACADEMIC_DETAILS")}</H2>
          </Box>
        }
      >
        <>
          <Divider mb={4} />
          <VStack space={6}>
            {classData?.length > 0 ? (
              classData?.map((item, index) => (
                <Box
                  key={index}
                  p={6}
                  borderColor={"schools.lightGray3"}
                  bg={"schools.lightGray5"}
                  borderWidth={1}
                  rounded={10}
                >
                  <HStack alignItems="center" justifyContent="space-between">
                    <Box>
                      <VStack>
                        <H3 color={"schools.bodyText"}>{item?.name}</H3>
                        <BodyMedium color={"schools.gray"}>
                          {item?.studentData?.length} Students
                        </BodyMedium>
                      </VStack>
                    </Box>
                    <IconByName
                      name="ArrowRightSLineIcon"
                      onPress={() => setClassId(item?.id)}
                      color={"schools.lightGray"}
                    />
                  </HStack>
                </Box>
              ))
            ) : (
              <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
                {t("NO_CLASSES_AVAILABLE")}
              </Box>
            )}
          </VStack>
        </>
      </Collapsible>
      <Actionsheet isOpen={classId} onClose={() => setClassId(false)}>
        <Actionsheet.Content alignItems={"left"} bg={"schools.cardBg"}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("Select Academic Details")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"schools.darkGray"}
              onPress={() => setClassId(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={"schools.white"}>
          {configReport && configReport?.length > 0
            ? configReport?.map((config) => (
                <>
                  {config === "attendance" && (
                    <Actionsheet.Item
                      onPress={() =>
                        navigate(`/schools/attendance-report/${classId}`)
                      }
                    >
                      {t("ATTENDANCE_REPORTS")}
                    </Actionsheet.Item>
                  )}
                  {config === "assessment" && (
                    <Actionsheet.Item
                      onPress={() =>
                        navigate(`/schools/assessment-report/${classId}`)
                      }
                    >
                      {t("ASSESSMENT_REPORTS")}
                    </Actionsheet.Item>
                  )}
                </>
              ))
            : "No Reports found"}
        </Box>
      </Actionsheet>
    </>
  );
}
