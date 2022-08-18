import {
  classRegistryService,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
  useWindowSize,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Avatar, VStack, Box, Button, HStack, Text } from "native-base";
import StudentListCard from "../components/StudentListCard";
import colorTheme from "../colorTheme";
import { useNavigate } from "react-router-dom";

const colors = overrideColorTheme(colorTheme);

export default function OralAssessmentSuccessPage({
  classId,
  setPageName,
  handleBackButton,
  chooseAssessmentTypeModal,
  handleSelectedStudent,
  selectedStudent,
  handleStudentPageNext,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [width, height] = useWindowSize();

  return (
    <Layout isDisabledAppBar={true}>
      <Box
        p={4}
        h={height - 85}
        bg={"#ECF7EB"}
        alignItems="center"
        justifyContent="center"
      >
        <VStack space={4} maxW="200px" mx="auto" textAlign="center">
          <IconByName
            alignSelf="center"
            name="CheckboxCircleFillIcon"
            color={colors.success}
            _icon={{ size: 50 }}
          />
          <Text>
            Your ORF assessment is complete. Click next to continue the
            assessment.
          </Text>
          <Button
            colorScheme="button"
            variant="outline"
            onPress={() => {
              navigate("/final-assessment-success");
            }}
          >
            {t("Next")}
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
}
