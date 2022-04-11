const { dependencies } = require("./package.json");

module.exports = {
  name: "students",
  exposes: {
    "./App": "./src/App",
    "./Student": "./src/pages/students/Student.js",
    "./StudentDetails": "./src/pages/students/StudentDetails.js",
    "./Card": "./src/components/students/Card.js",
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
