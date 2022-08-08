import Home from "./pages/Home";
import React from "react";
import MyClasses from "pages/MyClasses";

const classDetails = React.lazy(() => import("classes/ClassDetails"));
const attendance = React.lazy(() => import("attendance/Attendance"));
const report = React.lazy(() => import("attendance/Report"));
const reportDetail = React.lazy(() => import("attendance/ReportDetail"));
const sendSMS = React.lazy(() => import("attendance/SendSMS"));
const teachingDetail = React.lazy(() => import("worksheet/TeachingDetail"));
const worksheetShare = React.lazy(() => import("worksheet/WorksheetShare"));
const questionBank = React.lazy(() => import("worksheet/QuestionBank"));
const worksheet = React.lazy(() => import("worksheet/Worksheet"));
const worksheetQuestionBank = React.lazy(() =>
  import("worksheet/WorksheetQuestionBank")
);
const createWorksheet = React.lazy(() => import("worksheet/CreateWorksheet"));
const editWorksheet = React.lazy(() => import("worksheet/EditWorksheet"));
const worksheetTemplate = React.lazy(() =>
  import("worksheet/WorksheetTemplate")
);
const teaching = React.lazy(() => import("worksheet/Teaching"));
const student = React.lazy(() => import("students/Student"));
const studentDetails = React.lazy(() => import("students/StudentDetails"));

const notification = React.lazy(() => import("notification/Notification"));
const createNotification = React.lazy(() =>
  import("notification/CreateNotification")
);
const scheduleNotification = React.lazy(() =>
  import("notification/ScheduleNotification")
);
const outbox = React.lazy(() => import("notification/Outbox"));
const profile = React.lazy(() => import("profile/Profile"));
const attendanceReport = React.lazy(() => import("profile/AttendanceReport"));

const myLearning = React.lazy(() => import("mylearning/MyLearning"));
const courseList = React.lazy(() => import("mylearning/CourseList"));
const courseDetails = React.lazy(() => import("mylearning/CourseDetails"));
const videoList = React.lazy(() => import("mylearning/VideoList"));
const videoDetails = React.lazy(() => import("mylearning/VideoDetails"));
// Assessment Module Imports
const assessment = React.lazy(() => import("assessment/Assessment"));
const examScores = React.lazy(() => import("assessment/ExamScores"));
const successPublicationReport = React.lazy(() =>
  import("assessment/successPublicationReport")
);
const reportDetails = React.lazy(() => import("assessment/ReportDetails"));
const spotAssessmentResult = React.lazy(() =>
  import("assessment/SpotAssessmentResult")
);
const spotAssessmentResult2 = React.lazy(() =>
  import("assessment/SpotAssessmentResult2")
);
const spotAssessmentResult3 = React.lazy(() =>
  import("assessment/SpotAssessmentResult3")
);
const qumlTest = React.lazy(() => import("assessment/QumlTest"));
const questionList2 = React.lazy(() => import("assessment/QuestionLIst2"));
const questionList3 = React.lazy(() => import("assessment/QuestionLIst3"));
const questionList4 = React.lazy(() => import("assessment/QuestionLIst4"));
const questionList5 = React.lazy(() => import("assessment/QuestionLIst5"));
const questionList6 = React.lazy(() => import("assessment/QuestionLIst6"));
const questionList7 = React.lazy(() => import("assessment/QuestionLIst7"));

export const routes = [
  {
    path: "/worksheet/list/:state",
    component: worksheet,
  },
  {
    path: "/worksheet/list",
    component: worksheet,
  },
  {
    path: "/worksheet/:classId/view",
    component: teachingDetail,
  },
  {
    path: "/worksheet/:worksheetId/share",
    component: worksheetShare,
  },
  {
    path: "/worksheet/questionBank",
    component: questionBank,
  },
  {
    path: "/worksheet/:id",
    component: worksheetQuestionBank,
  },
  {
    path: "/worksheet/:id/edit",
    component: editWorksheet,
  },
  {
    path: "/worksheet/create",
    component: createWorksheet,
  },
  {
    path: "/worksheet/template/:worksheetId",
    component: worksheetTemplate,
  },
  {
    path: "/worksheet",
    component: teaching,
  },
  {
    path: "classes",
    component: MyClasses,
  },
  {
    path: "/classes/:classId",
    component: classDetails,
  },
  { path: "/class/students/:classId", component: student },
  { path: "/attendance/:classId", component: attendance },
  { path: "/attendance/report", component: report },
  { path: "/class/students/:classId", component: student },
  {
    path: "/attendance/report/:classId/:view",
    component: reportDetail,
  },
  { path: "/attendance/sendSms/:classId", component: sendSMS },
  { path: "/students/:studentId", component: studentDetails },
  { path: "/notification", component: notification },
  { path: "/notification/create", component: createNotification },
  { path: "/notification/schedule", component: scheduleNotification },
  { path: "/notification/outbox", component: outbox },
  { path: "/profile", component: profile },
  { path: "/profile/attendance", component: attendanceReport },

  { path: "/mylearning", component: myLearning },
  {
    path: "/mylearning/list/:state",
    component: courseList,
  },
  {
    path: "/mylearning/list",
    component: courseList,
  },
  {
    path: "/mylearning/:id/view",
    component: courseDetails,
  },
  {
    path: "/mylearning/video/list/:state",
    component: videoList,
  },
  {
    path: "/mylearning/video/list",
    component: videoList,
  },
  {
    path: "/mylearning/video/:id/view",
    component: videoDetails,
  },
  // Asessment Routes
  {
    path: "/assessment/exam-list2",
    component: questionList2,
  },
  {
    path: "/assessment/exam-list3",
    component: questionList3,
  },
  {
    path: "/assessment/exam-list4",
    component: questionList4,
  },
  {
    path: "/assessment/exam-list5",
    component: questionList5,
  },
  {
    path: "/assessment/exam-list6",
    component: questionList6,
  },
  {
    path: "/assessment/exam-list7",
    component: questionList7,
  },
  {
    path: "/assessment/examscores",
    component: examScores,
  },
  {
    path: "/assessment/assessment-result",
    component: spotAssessmentResult,
  },
  {
    path: "/assessment/assessment-result2",
    component: spotAssessmentResult2,
  },
  {
    path: "/assessment/assessment-result3",
    component: spotAssessmentResult3,
  },
  {
    path: "/assessment/assessment-success",
    component: successPublicationReport,
  },
  {
    path: "/assessment/assessment-detailed-report",
    component: reportDetails,
  },
  {
    path: "/assessment/quml-test",
    component: qumlTest,
  },
  {
    path: "/assessment",
    component: assessment,
  },
  { path: "*", component: Home },
];
