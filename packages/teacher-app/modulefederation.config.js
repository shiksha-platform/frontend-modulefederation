const { dependencies } = require("./package.json");

module.exports = {
  name: "teacherapp",
  exposes: {
    "./App": "./src/App",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`,
    attendance: `attendance@[window.appModules.attendance.url]/moduleEntry.js`,
    classes: `classes@[window.appModules.classes.url]/moduleEntry.js`,
    worksheet: `worksheet@[window.appModules.worksheet.url]/moduleEntry.js`,
    timetable: `timetable@[window.appModules.timetable.url]/moduleEntry.js`
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
