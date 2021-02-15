module.exports = () => ({
  name: "optimize",
  configureWebpack: (_, isServer) => {
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
    }
  },
})
