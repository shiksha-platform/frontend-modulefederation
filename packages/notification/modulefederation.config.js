const { dependencies } = require("./package.json");

module.exports = {
  name: "notification",
  exposes: {
    "./App": "./src/App",
    "./Notification": "./src/pages/Notification",
    "./CreateNotification": "./src/pages/CreateNotification",
    "./ScheduleNotification": "./src/pages/ScheduleNotification",
    "./Outbox": "./src/pages/Outbox",
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
