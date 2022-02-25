const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  devServer: {
    port: 3001,
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
