const { dependencies } = require("./package.json");

module.exports = {
  name: "profile",
  exposes: {
    "./App": "./src/App.js",
    "./Profile": "./src/pages/Profile.js",
    "./AttendanceReport": "./src/pages/AttendanceReport.js",
    "./SelfAttendanceSheet": "./src/components/SelfAttendanceSheet.js",
    "./SeeMore": "./src/pages/SeeMore.js",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`,
    attendance: `attendance@[window.appModules.attendance.url]/moduleEntry.js`,
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
