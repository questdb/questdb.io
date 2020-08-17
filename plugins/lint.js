const path = require("path")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

module.exports = () => ({
  name: "lint",
  configureWebpack: (config, isServer) => {
    return {
      optimization: {
        // Keep the runtime chunk separated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        runtimeChunk: false,
        splitChunks: false,
      },
      plugins: isServer
        ? []
        : [
            new ForkTsCheckerWebpackPlugin({
              eslint: {
                enabled: true,
                files: "./src/**/*.ts[x]",
              },
              typescript: { configFile: path.resolve("./tsconfig.json") },
            }),
          ],
    }
  },
})
