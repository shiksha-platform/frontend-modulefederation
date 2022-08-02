const { dependencies } = require("./package.json");

module.exports = {
  name: "schools",
  exposes: {
    "./SchoolProfile": "./src/pages/SchoolProfile",
    "./MyVisitsPage": "./src/pages/MyVisitsPage",
    "./AttendanceReportDashboard":
      "./src/pages/reports/AttendanceReportDashboard",
    "./AttendanceSectionWiseReport":
      "./src/pages/reports/AttendanceSectionWiseReport",
    "./AttendanceDetailedReport":
      "./src/pages/reports/AttendanceDetailedReport",
    "./AssessmentReportDashboard":
      "./src/pages/reports/AssessmentReportDashboard",
    "./AssessmentSectionWiseReport":
      "./src/pages/reports/AssessmentSectionWiseReport",
    "./AssessmentDetailedReport":
      "./src/pages/reports/AssessmentDetailedReport",
    "./TeacherDetails": "./src/pages/TeacherDetails",
    "./TeacherAttendanceReport": "./src/pages/TeacherAttendanceReport",
    "./NewVisitPage": "./src/pages/visit/NewVisitPage",
    "./VisitSubmit": "./src/pages/visit/VisitSubmit",
    "./TeacherVisitReport": "./src/pages/TeacherVisitReport",
    "./Question": "./src/pages/Question",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`,
  },
  filename: "moduleEntry.js",
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};
