import Attendance from "pages/Attendance";
import Report from "pages/reports/Report";
import ReportDetail from "pages/reports/ReportDetail";
import SendSMS from "pages/sms/SendSMS";
import { navigationRoute } from "./services/routes";

export const routes = [
  {
    path: navigationRoute.attendance,
    component: Attendance,
  },
  {
    path: navigationRoute.report,
    component: Report,
  },
  {
    path: navigationRoute.attendanceReport,
    component: ReportDetail,
  },
  {
    path: navigationRoute.sendSms,
    component: SendSMS,
  },
  {
    path: navigationRoute.fourOfour,
    component: Attendance,
  },
];
