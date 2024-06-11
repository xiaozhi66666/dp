const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'./',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api':{
        target: 'http://localhost:8080/', //接口域名
        changeOrigin: true,             //是否跨域
        pathRewrite: {                  //路径重置
          '^/api': ''
        }
      }
    }
  }
})