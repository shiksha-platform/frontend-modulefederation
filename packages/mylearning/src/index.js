//const moduleConfig = require('./modules.json')
fetch(`${process.env.PUBLIC_URL}/modules.json`).then(async (res) => {
  const moduleConfig = await res.json();
  window.appModules = moduleConfig;
  import("./bootstrap");
});
