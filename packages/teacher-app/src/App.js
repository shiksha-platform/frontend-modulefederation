import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, initializeI18n, AppShell } from "@shiksha/common-lib";
import MyClasses from "pages/MyClasses";
import Home from "./pages/Home";

//TODO: separate out the theme related code from App
initializeI18n(["translation", "core", "attendance"]);

function App() {
  const theme = extendTheme(DEFAULT_THEME);
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

  const MyLearning = React.lazy(() => import("mylearning/MyLearning"));
  const CourseList = React.lazy(() => import("mylearning/CourseList"));
  const CourseDetails = React.lazy(() => import("mylearning/CourseDetails"));
  const VideoList = React.lazy(() => import("mylearning/VideoList"));
  const VideoDetails = React.lazy(() => import("mylearning/VideoDetails"));

  const routes = [
    {
      path: "/worksheet/list/:state",
      component: Worksheet,
    },
    {
      path: "/worksheet/list",
      component: Worksheet,
    },
    {
      path: "/worksheet/:classId/view",
      component: TeachingDetail,
    },
    {
      path: "/worksheet/:worksheetId/share",
      component: WorksheetShare,
    },
    {
      path: "/worksheet/questionBank",
      component: QuestionBank,
    },
    {
      path: "/worksheet/:id",
      component: WorksheetQuestionBank,
    },
    {
      path: "/worksheet/:id/edit",
      component: EditWorksheet,
    },
    {
      path: "/worksheet/create",
      component: CreateWorksheet,
    },
    {
      path: "/worksheet/template",
      component: WorksheetTemplate,
    },
    {
      path: "/worksheet",
      component: Teaching,
    },
    {
      path: "classes",
      component: MyClasses,
    },
    {
      path: "/classes/:classId",
      component: ClassDetails,
    },
    { path: "/class/students/:classId", component: Student },
    { path: "/attendance/:classId", component: Attendance },
    { path: "/attendance/report", component: Report },
    { path: "/class/students/:classId", component: Student },
    {
      path: "/attendance/report/:classId/:view",
      component: ReportDetail,
    },
    { path: "/attendance/sendSms/:classId", component: SendSMS },
    { path: "/students/:studentId", component: StudentDetails },
    { path: "/notification", component: Notification },
    { path: "/notification/create", component: CreateNotification },
    { path: "/notification/schedule", component: ScheduleNotification },
    { path: "/notification/outbox", component: Outbox },
    { path: "/profile", component: Profile },
    { path: "/profile/attendance", component: AttendanceReport },

    { path: "/mylearning", component: MyLearning },
    {
      path: "/mylearning/list/:state",
      component: CourseList,
    },
    {
      path: "/mylearning/list",
      component: CourseList,
    },
    {
      path: "/mylearning/:id/view",
      component: CourseDetails,
    },
    {
      path: "/mylearning/video/list/:state",
      component: VideoList,
    },
    {
      path: "/mylearning/video/list",
      component: VideoList,
    },
    {
      path: "/mylearning/video/:id/view",
      component: VideoDetails,
    },
    { path: "*", component: Home },
  ];

  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      theme={theme}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      isShowFooterLink={true}
      appName="Teacher App"
    />
  );
}
export default App;
