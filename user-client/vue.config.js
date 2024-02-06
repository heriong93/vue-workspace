const { defineConfig } = require('@vue/cli-service')
// 대체될 서버 측 오리진: 고정되지 않음(변수)
// 오리진 : 프로토콜~IP
const target = "http://localhost:3000";

module.exports = defineConfig({
  transpileDependencies: true,
  devServer : {
    proxy : {
      '^/api' : {// 'api'로 시작하는 프로토콜
        target,
        changeOrigin: true, // target으로 오리진을 변경
        ws : false, // 웹소켓 : 안씀
        pathRewrite: {'^/api' : '/'} // 오리진 말고 뒤에 붙은 경로에 대해 다시 씀 (replace)
      }  
    }
  }
})