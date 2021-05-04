const { WebpackManifestPlugin } = require("webpack-manifest-plugin")

module.exports = () => ({
  name: "manifest",
  configureWebpack: (_, isServer) => {
    return {
      plugins: isServer
        ? []
        : [new WebpackManifestPlugin ({ fileName: "asset-manifest.json" })],
    }
  },
})
