var path = require('path')

module.exports = {
   port : 9091,
   host : '',  //默认是localhost
   srcPath : path.join(__dirname, '../src'),
   uglifyMap: { //是否压缩
     css: false,
     js: false
   },
   resourcePath: { // 修改资源路径
     css: 'https://c.58cdn.com.cn/fanglearning/app',
     js: '',
     image: 'https://img.58cdn.com.cn/fanglearning/app'
   },
   proxy: {
    '/api': {
        target: 'http://10.48.210.13:11083',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }
  },
}
