const { dependencies } = require("./package.json");

module.exports = {
  name: "classes",
  exposes: {
    "./App": "./src/App",
    "./MyClassRoute": "./src/pages/MyClassRoute/index.js",
    "./ClassDetails": "./src/pages/ClassDetails/index.js",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`,
    assessment: `assessment@[window.appModules.assessment.url]/moduleEntry.js`,
    students: `students@[window.appModules.students.url]/moduleEntry.js`,
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
