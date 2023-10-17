const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/api/v2": {
        target: process.env.VUE_APP_API_URL,
        secure: true,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
