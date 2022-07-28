const { dependencies } = require("./package.json");

module.exports = {
  name: "mylearning",
  exposes: {
    "./MyLearning": "./src/pages/MyLearning",
    "./CourseList": "./src/pages/CourseList",
    "./CourseDetails": "./src/pages/CourseDetails",
    "./VideoList": "./src/pages/VideoList",
    "./VideoDetails": "./src/pages/VideoDetails",
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
