const path = require("path")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

module.exports = () => ({
  name: "lint",
  configureWebpack: (config, isServer) => {
    return {
      optimization: {
        runtimeChunk: false,
        splitChunks: isServer
          ? false
          : {
              name: true,
              cacheGroups: {
                common: {
                  name: "common",
                  minChunks: 2,
                  priority: -30,
                  reuseExistingChunk: true,
                },
                vendors: false,
              },
            },
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
