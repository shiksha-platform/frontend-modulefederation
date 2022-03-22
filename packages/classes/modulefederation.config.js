const { dependencies } = require("./package.json");

module.exports = {
  name: "classes",
  exposes: {
    "./App": "./src/App",
    "./MyClasses": "./src/pages/MyClasses.js",
    "./ClassDetails" : "./src/pages/ClassDetails.js"
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
