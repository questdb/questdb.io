const ManifestPlugin = require("webpack-manifest-plugin")

module.exports = () => ({
  name: "manifest",
  configureWebpack: (config, isServer) => {
    return {
      plugins: isServer
        ? []
        : [new ManifestPlugin({ fileName: "asset-manifest.json" })],
    }
  },
})
