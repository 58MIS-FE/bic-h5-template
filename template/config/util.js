var path = require('path'),
    App = require('./index.js')

exports.path = (src) => {
    return path.join(App.srcPath , src)
}