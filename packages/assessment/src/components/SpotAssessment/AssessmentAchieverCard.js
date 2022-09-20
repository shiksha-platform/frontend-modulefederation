import React from "react";
import { Box, VStack, HStack, Avatar } from "native-base";
import { H2, Caption, H3, Subtitle } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

function AssessmentAchieverCard({ students }) {
  const { t } = useTranslation();

  return (
    <Box bg={"assessment.white"} p={5}>
      <Box bg={"assessment.achiverBoxBg"} rounded={10} p="4">
        <VStack space={5}>
          <H2 mb={3}>100% Achievers</H2>
          <HStack space={2} justifyContent="space-around">
            {students.map((student, index) => (
              <VStack space={1} alignItems={"center"} key={index}>
                <Avatar size="48px" borderRadius="md" bg="assessment.primary">
                  <H2 color="assessment.white">
                    {`${student.firstName} ${student.lastName}`
                      .toUpperCase()
                      .substr(0, 2)}
                  </H2>
                </Avatar>
                <VStack alignItems={"center"}>
                  <Subtitle>{`${student.firstName} ${student.lastName}`}</Subtitle>
                  <Caption color={"assessment.gray"}>
                    {t("Roll No. ") + student.admissionNo}
                  </Caption>
                </VStack>
              </VStack>
            ))}
            {students?.length <= 0 ? (
              <Caption textTransform="inherit">
                {t("NO_STUDENT_HAS_ACHIEVED")}
              </Caption>
            ) : (
              <React.Fragment />
            )}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
export default AssessmentAchieverCard;
