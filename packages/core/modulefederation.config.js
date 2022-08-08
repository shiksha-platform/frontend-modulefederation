const { dependencies } = require("./package.json");

module.exports = {
  name: "core",
  exposes: {
    "./App": "./src/App",
    "./AppShell": "./src/components/AppShell",
    "./Login": "./src/pages/Login",
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
