import manifest from "../manifest.json";

const tryRequire = (path) => {
  try {
    return require(`${path}`);
  } catch (err) {
    return {};
  }
};
let resources = {};
if (manifest.languages) {
  manifest.languages.forEach((e) => {
    resources = {
      ...resources,
      [e.code]: {
        translation: { ...tryRequire(e.path), ...tryRequire(e.overridePath) },
      },
    };
  });
}

const init = {
  resources: resources,
  lng: localStorage.getItem("lang"),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
};

export default init;
