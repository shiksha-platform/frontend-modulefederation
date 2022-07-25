const { dependencies } = require("./package.json");

module.exports = {
  name: "teacherapp",
  exposes: {
    "./App": "./src/App",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`,
    attendance: `attendance@[window.appModules.attendance.url]/moduleEntry.js`,
    assessment: `assessment@[window.appModules.assessment.url]/moduleEntry.js`,
    classes: `classes@[window.appModules.classes.url]/moduleEntry.js`,
    worksheet: `worksheet@[window.appModules.worksheet.url]/moduleEntry.js`,
    calendar: `calendar@[window.appModules.calendar.url]/moduleEntry.js`,
    students: `students@[window.appModules.students.url]/moduleEntry.js`,
    notification: `notification@[window.appModules.notification.url]/moduleEntry.js`,
    profile: `profile@[window.appModules.profile.url]/moduleEntry.js`,
    mylearning: `mylearning@[window.appModules.mylearning.url]/moduleEntry.js`,
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
