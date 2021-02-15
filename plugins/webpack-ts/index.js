const path = require("path")

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

module.exports = () => ({
  name: "webpack-ts",
  configureWebpack: (_, isServer) => {
    return {
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
