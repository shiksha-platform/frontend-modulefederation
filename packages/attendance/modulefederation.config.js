const { dependencies } = require("./package.json");

module.exports = {
  name: "attendance",
  exposes: {
    "./App": "./src/App",
    "./Attendance": "./src/pages/Attendance",
    "./AttendanceComponent": "./src/components/AttendanceComponent",
    "./Report": "./src/pages/reports/Report",
    "./ReportDetail": "./src/pages/reports/ReportDetail",
    "./CompareReport": "./src/pages/reports/CompareReport",
    "./SendSMS": "./src/pages/sms/SendSMS",
    "./MessageHistory": "./src/pages/sms/MessageHistory",
    "./CalendarBar": "./src/components/CalendarBar/CalendarBar",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`,
    students: `students@[window.appModules.students.url]/moduleEntry.js`,
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
