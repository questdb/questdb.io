module.exports = () => ({
  name: "optimize",
  configureWebpack: (_, isServer) => {
    return {
      optimization: {
        runtimeChunk: false,
        splitChunks: isServer
          ? false
          : {
              // name: true, // Does not exist anymore, see https://webpack.js.org/blog/2020-10-10-webpack-5-release/
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
    }
  },
})
