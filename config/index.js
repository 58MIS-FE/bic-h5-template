var path = require('path')

module.exports = {
   port : 9091,
   host : '',  //默认是localhost
   srcPath : path.join(__dirname, '../src'),
   uglifyMap: false,    //是否压缩 
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
