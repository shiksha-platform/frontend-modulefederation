const cracoModuleFederation = require("craco-module-federation");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = {
  devServer: {
    port: 3002,
  },
  webpack: {
    plugins: [new ExternalTemplateRemotesPlugin()],
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
