import { assessmentRegistryService } from "@shiksha/common-lib";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import report from "utils/report";

const ORAL_ASSESSMENT = "Oral Assessment";
const WRITTEN_ASSESSMENT = "Written Assessment";

function ClassWiseSubjectProgress({ students, classId, subject }) {
  const { t } = useTranslation();
  const ReportCard = React.lazy(() => import("assessment/ReportCard"));
  const [progressAssessmentWritten, setProgressAssessmentWritten] =
    React.useState([]);
  const [progressAssessmentOral, setProgressAssessmentOral] = React.useState(
    []
  );

  React.useEffect(async () => {
    const assessmentData = await assessmentRegistryService
      .getAllAssessment({
        groupId: classId,
        subject: subject,
      })
      .catch((e) => console.log(e.message));
    setProgressAssessmentWritten(
      report(students, assessmentData, WRITTEN_ASSESSMENT)
    );
    setProgressAssessmentOral(
      report(students, assessmentData, ORAL_ASSESSMENT)
    );
  }, [classId, subject]);

  return (
    <React.Fragment>
      <Suspense fallback="loading...">
        <ReportCard
          {...{
            writtenData: progressAssessmentWritten,
            oralData: progressAssessmentOral,
          }}
        />
      </Suspense>
    </React.Fragment>
  );
}
export default ClassWiseSubjectProgress;
