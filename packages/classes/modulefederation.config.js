const { dependencies } = require("./package.json");

module.exports = {
  name: "classes",
  exposes: {
    "./App": "./src/App",
    "./MyClassRoute": "./src/pages/MyClassRoute.js",
    "./ClassDetails": "./src/pages/ClassDetails.js",
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
