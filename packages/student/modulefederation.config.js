const { dependencies } = require("./package.json");

module.exports = {
  name: "students",
  exposes: {
    "./App": "./src/App",
    "./Student": "./src/pages/students/index.js",
    "./StudentDetails": "./src/pages/StudentDetails/index.js",
    "./Card": "./src/components/students/Card.js",
    "./StudentEdit": "./src/components/students/StudentEdit.js",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`,
    attendance: `attendance@[window.appModules.attendance.url]/moduleEntry.js`,
    profile: `profile@[window.appModules.profile.url]/moduleEntry.js`,
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
