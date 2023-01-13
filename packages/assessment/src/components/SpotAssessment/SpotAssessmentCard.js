import React from "react";
import {
  BodyLarge,
  Subtitle,
  assessmentRegistryService,
  studentRegistryService,
} from "@shiksha/common-lib";
import { VStack, Box, Button, Divider } from "native-base";
import { useTranslation } from "react-i18next";
import ReportCard from "components/ReportCard";
import report from "utils/report";

const ORAL_ASSESSMENT = "Oral Assessment";
const WRITTEN_ASSESSMENT = "Written Assessment";

const SpotAssessmentCard = ({
  students,
  subject,
  classId,
  setAlert,
  _handleSpotAssessmentStart,
  _viewPastAssessment,
}) => {
  const { t } = useTranslation();

  const [progressAssessmentWritten, setProgressAssessmentWritten] =
    React.useState([]);
  const [progressAssessmentOral, setProgressAssessmentOral] = React.useState(
    []
  );

  React.useEffect(async () => {
    const data = await assessmentRegistryService
      .getAllAssessment({
        groupId: classId,
        subject,
      })
      .catch((e) => setAlert(e.message));
    let studentData = students;
    if (!students) {
      studentData = await studentRegistryService.getAll({
        classId,
      });
    }
    setProgressAssessmentWritten(report(studentData, data, WRITTEN_ASSESSMENT));
    setProgressAssessmentOral(report(studentData, data, ORAL_ASSESSMENT));
  }, []);

  return (
    <>
      {/*========= box1 =============*/}
      <VStack space={4}>
        <BodyLarge>Spot Assessment</BodyLarge>
        <ReportCard
          {...{
            writtenData: progressAssessmentWritten,
            oralData: progressAssessmentOral,
          }}
        />

        <Divider mx="4" w="90%"></Divider>
        <Box p="4" pt="4px">
          <Button
            py={3}
            // colorScheme="button"
            _text={{ color: "assessment.white" }}
            onPress={_handleSpotAssessmentStart}
          >
            {t("Continue")}
          </Button>
        </Box>
        <Subtitle
          my={2}
          textAlign={"center"}
          color={"assessment.primary"}
          {..._viewPastAssessment}
        >
          {t("VIEW PAST ASSESSMENTS")}
        </Subtitle>
      </VStack>
    </>
  );
};

export default SpotAssessmentCard;
