var path = require('path')

module.exports = {
   port : 9090,
   host : '',  //默认是localhost
   srcPath : path.join(__dirname, '../src'),
   cssStyle: '' , //less sass  默认 " " 为_style
   uglifyMap: false    //是否压缩
}
