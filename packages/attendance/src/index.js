//const moduleConfig = require('./modules.json')
fetch("/modules.json").then(async (res) => {
    const moduleConfig = await res.json();
    console.log(moduleConfig);
    window.appModules = moduleConfig;
    console.log(window.appModules);
    import("./bootstrap");
});