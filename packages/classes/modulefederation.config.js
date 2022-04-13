const { dependencies } = require("./package.json");

module.exports = {
  name: "classes",
  exposes: {
    "./App": "./src/App",
    "./MyClassRoute": "./src/pages/MyClassRoute.js",
    "./ClassDetails": "./src/pages/ClassDetails.js",
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
