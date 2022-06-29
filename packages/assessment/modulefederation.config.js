// import AssessmentComponent from "./src/components/AssessmentComponent";

const { dependencies } = require("./package.json");

module.exports = {
  name: "assessment",
  exposes: {
    "./App": "./src/App",
    // "./AssessmentComponent": "./src/components/AssessmentComponent",
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
