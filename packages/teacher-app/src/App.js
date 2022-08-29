import React, { useEffect } from "react";
import "./App.css";
import {
  initializeI18n,
  AppShell,
  AppRoutesContainer,
  userRegistryService,
} from "@shiksha/common-lib";
import MyClasses from "pages/MyClasses";
import Home from "./pages/Home";

//TODO: separate out the theme related code from App
initializeI18n(["translation", "core", "attendance"]);

function App() {
  const ClassDetails = React.lazy(() => import("classes/ClassDetails"));
  const Attendance = React.lazy(() => import("attendance/Attendance"));
  const Report = React.lazy(() => import("attendance/Report"));
  const ReportDetail = React.lazy(() => import("attendance/ReportDetail"));
  const SendSMS = React.lazy(() => import("attendance/SendSMS"));
  const TeachingDetail = React.lazy(() => import("worksheet/TeachingDetail"));
  const WorksheetShare = React.lazy(() => import("worksheet/WorksheetShare"));
  const QuestionBank = React.lazy(() => import("worksheet/QuestionBank"));
  const Worksheet = React.lazy(() => import("worksheet/Worksheet"));
  const WorksheetQuestionBank = React.lazy(() =>
    import("worksheet/WorksheetQuestionBank")
  );
  const CreateWorksheet = React.lazy(() => import("worksheet/CreateWorksheet"));
  const EditWorksheet = React.lazy(() => import("worksheet/EditWorksheet"));
  const WorksheetTemplate = React.lazy(() =>
    import("worksheet/WorksheetTemplate")
  );
  const Teaching = React.lazy(() => import("worksheet/Teaching"));
  const Student = React.lazy(() => import("students/Student"));
  const StudentDetails = React.lazy(() => import("students/StudentDetails"));

  const Notification = React.lazy(() => import("notification/Notification"));
  const CreateNotification = React.lazy(() =>
    import("notification/CreateNotification")
  );
  const ScheduleNotification = React.lazy(() =>
    import("notification/ScheduleNotification")
  );
  const Outbox = React.lazy(() => import("notification/Outbox"));
  const Profile = React.lazy(() => import("profile/Profile"));
  const AttendanceReport = React.lazy(() => import("profile/AttendanceReport"));
  const SeeMore = React.lazy(() => import("profile/SeeMore"));

  const MyLearning = React.lazy(() => import("mylearning/MyLearning"));
  const CourseList = React.lazy(() => import("mylearning/CourseList"));
  const CourseDetails = React.lazy(() => import("mylearning/CourseDetails"));
  const VideoList = React.lazy(() => import("mylearning/VideoList"));
  const VideoDetails = React.lazy(() => import("mylearning/VideoDetails"));
  // Assessment Module Imports
  const Assessment = React.lazy(() => import("assessment/Assessment"));
  const ExamScores = React.lazy(() => import("assessment/ExamScores"));
  const SuccessPublicationReport = React.lazy(() =>
    import("assessment/successPublicationReport")
  );
  const ReportDetails = React.lazy(() => import("assessment/ReportDetails"));
  const SpotAssessmentResult = React.lazy(() =>
    import("assessment/SpotAssessmentResult")
  );
  const SpotAssessmentResult2 = React.lazy(() =>
    import("assessment/SpotAssessmentResult2")
  );
  const SpotAssessmentResult3 = React.lazy(() =>
    import("assessment/SpotAssessmentResult3")
  );
  const QumlTest = React.lazy(() => import("assessment/QumlTest"));
  const QuestionList2 = React.lazy(() => import("assessment/QuestionLIst2"));
  const QuestionList3 = React.lazy(() => import("assessment/QuestionLIst3"));
  const QuestionList4 = React.lazy(() => import("assessment/QuestionLIst4"));
  const QuestionList5 = React.lazy(() => import("assessment/QuestionLIst5"));
  const QuestionList6 = React.lazy(() => import("assessment/QuestionLIst6"));
  const QuestionList7 = React.lazy(() => import("assessment/QuestionLIst7"));
  const SchoolProfile = React.lazy(() => import("schools/SchoolProfile"));
  const AllTeachers = React.lazy(() => import("schools/AllTeachers"));
  const AttendanceReportDashboard = React.lazy(() =>
    import("schools/AttendanceReportDashboard")
  );
  const AttendanceSectionWiseReport = React.lazy(() =>
    import("schools/AttendanceSectionWiseReport")
  );
  const AttendanceDetailedReport = React.lazy(() =>
    import("schools/AttendanceDetailedReport")
  );
  const AssessmentReportDashboard = React.lazy(() =>
    import("schools/AssessmentReportDashboard")
  );
  const AssessmentSectionWiseReport = React.lazy(() =>
    import("schools/AssessmentSectionWiseReport")
  );
  const AssessmentDetailedReport = React.lazy(() =>
    import("schools/AssessmentDetailedReport")
  );
  const TeacherDetails = React.lazy(() => import("schools/TeacherDetails"));
  const TeacherAttendanceReport = React.lazy(() =>
    import("schools/TeacherAttendanceReport")
  );
  const NewVisitPage = React.lazy(() => import("schools/NewVisitPage"));
  const VisitSubmit = React.lazy(() => import("schools/VisitSubmit"));
  const TeacherVisitReport = React.lazy(() =>
    import("schools/TeacherVisitReport")
  );
  const Question = React.lazy(() => import("schools/Question"));
  const Myvisits = React.lazy(() => import("visits/Myvisits"));
  const Recommendedschools = React.lazy(() =>
    import("visits/Recommendedschools")
  );
  const Allocatedschools = React.lazy(() => import("visits/Allocatedschools"));

  const routes = [
    // worksheet
    {
      moduleName: "worksheet",
      path: "/worksheet/list/:state",
      component: Worksheet,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/list",
      component: Worksheet,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/:classId/view",
      component: TeachingDetail,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/:worksheetId/share",
      component: WorksheetShare,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/questionBank",
      component: QuestionBank,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/:id",
      component: WorksheetQuestionBank,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/:id/edit",
      component: EditWorksheet,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/create",
      component: CreateWorksheet,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/template/:worksheetId",
      component: WorksheetTemplate,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet",
      component: Teaching,
    },
    // classess
    {
      moduleName: "classes",
      path: "classes",
      component: MyClasses,
    },
    {
      moduleName: "classes",
      path: "/classes/:classId",
      component: ClassDetails,
    },
    {
      moduleName: "classes",
      path: "/class/students/:classId",
      component: Student,
    },
    // attendance
    {
      moduleName: "attendance",
      path: "/attendance/:classId",
      component: Attendance,
    },
    {
      moduleName: "attendance",
      path: "/attendance/report",
      component: Report,
    },
    {
      moduleName: "attendance",
      path: "/attendance/report/:classId/:view",
      component: ReportDetail,
    },
    {
      moduleName: "attendance",
      path: "/attendance/sendSms/:classId",
      component: SendSMS,
    },
    // students
    {
      moduleName: "student",
      path: "/students/:studentId",
      component: StudentDetails,
    },
    // notification
    {
      moduleName: "notification",
      path: "/notification",
      component: Notification,
    },
    {
      moduleName: "notification",
      path: "/notification/create",
      component: CreateNotification,
    },
    {
      moduleName: "notification",
      path: "/notification/schedule",
      component: ScheduleNotification,
    },
    {
      moduleName: "notification",
      path: "/notification/outbox",
      component: Outbox,
    },
    // profile
    {
      moduleName: "profile",
      path: "/profile",
      component: Profile,
    },
    {
      moduleName: "profile",
      path: "/profile/attendance",
      component: AttendanceReport,
    },
    {
      moduleName: "profile",
      path: "/profile/seemore",
      component: SeeMore,
    },
    // mylearning
    {
      moduleName: "mylearning",
      path: "/mylearning",
      component: MyLearning,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/list/:state",
      component: CourseList,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/list",
      component: CourseList,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/:id/view",
      component: CourseDetails,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/video/list/:state",
      component: VideoList,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/video/list",
      component: VideoList,
    },
    {
      moduleName: "mylearning",
      path: "/mylearning/video/:id/view",
      component: VideoDetails,
    },
    // Asessment Routes
    {
      moduleName: "assessment",
      path: "/assessment/exam-list2",
      component: QuestionList2,
    },
    {
      moduleName: "assessment",
      path: "/assessment/exam-list3",
      component: QuestionList3,
    },
    {
      moduleName: "assessment",
      path: "/assessment/exam-list4",
      component: QuestionList4,
    },
    {
      moduleName: "assessment",
      path: "/assessment/exam-list5",
      component: QuestionList5,
    },
    {
      moduleName: "assessment",
      path: "/assessment/exam-list6",
      component: QuestionList6,
    },
    {
      moduleName: "assessment",
      path: "/assessment/exam-list7",
      component: QuestionList7,
    },
    {
      moduleName: "assessment",
      path: "/assessment/examscores",
      component: ExamScores,
    },
    {
      moduleName: "assessment",
      path: "/assessment/assessment-result",
      component: SpotAssessmentResult,
    },
    {
      moduleName: "assessment",
      path: "/assessment/assessment-result2",
      component: SpotAssessmentResult2,
    },
    {
      moduleName: "assessment",
      path: "/assessment/assessment-result3",
      component: SpotAssessmentResult3,
    },
    {
      moduleName: "assessment",
      path: "/assessment/assessment-success",
      component: SuccessPublicationReport,
    },
    {
      moduleName: "assessment",
      path: "/assessment/assessment-detailed-report",
      component: ReportDetails,
    },
    {
      moduleName: "assessment",
      path: "/assessment/quml-test",
      component: QumlTest,
    },
    {
      moduleName: "assessment",
      path: "/assessment",
      component: Assessment,
    },
    // Schools Routes
    {
      moduleName: "schools",
      path: "/schools/new-visit/:schoolId",
      component: NewVisitPage,
    },
    {
      moduleName: "schools",
      path: "/schools/visit-submit",
      component: VisitSubmit,
    },
    {
      moduleName: "schools",
      path: "/schools/teacher-visit-report",
      component: TeacherVisitReport,
    },
    {
      moduleName: "schools",
      path: "/schools/assessment-report",
      component: AssessmentReportDashboard,
    },
    {
      moduleName: "schools",
      path: "/schools/assessment-section-report",
      component: AssessmentSectionWiseReport,
    },
    {
      moduleName: "schools",
      path: "/schools/assessment-detailed-report",
      component: AssessmentDetailedReport,
    },
    {
      moduleName: "schools",
      path: "/schools/attendance-report",
      component: AttendanceReportDashboard,
    },
    {
      moduleName: "schools",
      path: "/schools/attendance-section-report",
      component: AttendanceSectionWiseReport,
    },
    {
      moduleName: "schools",
      path: "/schools/attendance-detailed-report",
      component: AttendanceDetailedReport,
    },
    {
      moduleName: "schools",
      path: "/schools/teachers/:schoolId",
      component: AllTeachers,
    },
    {
      moduleName: "schools",
      path: "/schools/:id",
      component: SchoolProfile,
    },
    ,
    {
      moduleName: "schools",
      path: "/schools/teacher-details/:teacherId",
      component: TeacherDetails,
    },
    {
      moduleName: "schools",
      path: "/schools/teacher-attendance-report",
      component: TeacherAttendanceReport,
    },
    {
      moduleName: "schools",
      path: "/schools/questionnaire",
      component: Question,
    },
    // Visits Routes
    {
      moduleName: "visits",
      path: "/visits/recommended-schools",
      component: Recommendedschools,
    },
    {
      moduleName: "visits",
      path: "/visits/allocated-schools",
      component: Allocatedschools,
    },
    {
      moduleName: "visits",
      path: "/visits",
      component: Myvisits,
    },
    {
      moduleName: "app",
      path: "*",
      component: Home,
    },
  ];

  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchParams = Object.fromEntries(urlSearchParams.entries());

  useEffect(async () => {
    if (searchParams.token != undefined) {
      localStorage.setItem("token", searchParams.token);
    }
    const resultTeacher = await userRegistryService.getOne({}, {});

    if (resultTeacher.id) {
      let id = resultTeacher?.id;
      localStorage.setItem("id", id);
      localStorage.setItem(
        "fullName",
        resultTeacher.fullName
          ? resultTeacher.fullName
          : `${resultTeacher.firstName} ${resultTeacher.lastName}`
      );
      localStorage.setItem("firstName", resultTeacher.firstName);
      localStorage.setItem("lastName", resultTeacher.lastName);
      localStorage.setItem("schoolId", resultTeacher.schoolId);
      //window.location.reload();
    }
  }, []);
  const LoginComponent = React.lazy(() => import("core/Login"));
  if (
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  ) {
    return (
      <AppShell
        basename={process.env.PUBLIC_URL}
        routes={routes}
        AuthComponent={LoginComponent}
        isShowFooterLink={true}
        appName="Teacher App"
      />
    );
  } else {
    return (
      <AppRoutesContainer
        basename={process.env.PUBLIC_URL}
        routes={routes}
        AuthComponent={LoginComponent}
        isShowFooterLink={true}
        appName="Teacher App"
      />
    );
  }
}
export default App;
