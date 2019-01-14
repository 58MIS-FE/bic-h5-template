let gulp = require('gulp'),
  px2rem = require('gulp-px3rem'),
  connect = require('gulp-connect'),
  less = require('gulp-less'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  autoprefix = require('gulp-autoprefixer'), //css3补全
  concat = require('gulp-concat'),
  spritesmith = require('gulp.spritesmith'), //合成雪碧图
  uglify = require('gulp-uglify'),
  chokidar = require('chokidar'),
  fs = require('fs'),
  inject = require('gulp-inject'), //注入
  Util = require('./config/util'), //公共工具
  App = require('./config'),
  proxy = require('http-proxy-middleware'),
  runSequence = require('run-sequence'),
  imagemin = require('gulp-imagemin'),
  babel = require("gulp-babel"), // 用于ES6转化ES5
  clean = require('gulp-clean'),
  replace = require('gulp-string-replace'),
  nop = require('gulp-nop'),
  px2remConfig = {
    baseDpr: 2, // base device pixel ratio (default: 2)
    threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
    remVersion: true, // whether to generate rem version (default: true)
    remUnit: 20, // rem unit value (default: 75)
    remPrecision: 6 // rem precision (default: 6)
  };

//px转换rem
gulp.task('px2rem', () => {
  gulp.src(Util.path('style_tmp/**/*.css'))
    .pipe(px2rem(px2remConfig))
    .pipe(autoprefix('last 2 versions'))
    .pipe(connect.reload())
    .pipe(gulp.dest(Util.path('style')))
});

//less文件
gulp.task('less', () => {
  gulp.src(Util.path('_less/**/*.less'))
    .pipe(less())
    .pipe(autoprefix('last 2 versions'))
    .pipe(connect.reload())
    .pipe(gulp.dest(Util.path('style_tmp')))
});

//sass文件
gulp.task('sass', () => {
  gulp.src(Util.path('_scss/**/*.scss'))
    .pipe(cleanCSS())
    .pipe(autoprefix('last 2 versions'))
    .pipe(connect.reload())
    .pipe(gulp.dest(Util.path('style_tmp')))
});

//压缩css
gulp.task('cssUglify', () => {
  return gulp.src(Util.path('style/**/*.css'))
    .pipe(autoprefix('last 2 versions'))
    // .pipe(concat('index.debug.css')) // css文件合并
    .pipe(App.resourcePath.image ? replace(/[\.]{2}.*image/g, App.resourcePath.image) : nop())
    .pipe(App.uglifyMap.css ? cleanCSS({
      compatibility: 'ie8'
    }) : nop())
    .pipe(gulp.dest(Util.path('../dist/style')))
});

//压缩js
gulp.task('jsUglify', () => {
  return gulp.src(Util.path('js/**/*.js'))
    .pipe(babel())
    .pipe(App.uglifyMap.js ? uglify({
      mangle: false
    }) : nop())
    .pipe(gulp.dest(Util.path('../dist/js')))
});

//html输出
gulp.task('htmlUglify', () => {
  gulp.src(Util.path('/views/**/*.html'))
    .pipe(App.resourcePath.css ? replace(/[\.]{2}.*style/g, App.resourcePath.css) : nop())
    .pipe(App.resourcePath.js ? replace(/[\.]{2}.*js/g, App.resourcePath.js) : nop())
    .pipe(gulp.dest(Util.path('../dist/views/')))
});

//图片压缩并输出
gulp.task('imagesUglify', () => {
  return gulp.src(Util.path('image/**/*.*'))
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      })
    ]))
    .pipe(gulp.dest(Util.path('../dist/image')))
});

//font输出
gulp.task('fontUglify', () => {
  return gulp.src(Util.path('font/**/*.css'))
    .pipe(App.resourcePath.image ? replace(/[\.]{2}.*image/g, App.resourcePath.image) : nop())
    .pipe(App.uglifyMap.css ? cleanCSS({
      compatibility: 'ie8'
    }) : nop())
    .pipe(gulp.dest(Util.path('../dist/font')))
});

//修改html页面
gulp.task('htmlReload', () => {
  gulp.src(Util.path('/views/**/*.html'))
    .pipe(connect.reload());
});

// 清空dist
gulp.task("cleanDist", () => {
  var stream = gulp.src('./dist')
    .pipe(clean());
  return stream;
})

//雪碧图
gulp.task('spritesmith', function() {
  gulp.src(Util.path('image/sprite/*.png'))
    .pipe(spritesmith({
      imgName: 'sprite.png', //保存合并后的名称
      cssName: '../font/icon.css', //保存合并后css样式的地址
      padding: 15, //合并时两个图片的间距
      algorithm: 'top-down', //注释1
      //cssTemplate:'dest/css/handlebarsStr.css'//注释2
      cssTemplate: function(data) { //如果是函数的话，这可以这样写
        var arr = [];
        data.sprites.forEach(function(sprite) {
          arr.push(
            `.icon-${sprite.name}
                    {
                      background-image: url('../image/sprite.png');
                      background-position: ${sprite.px.offset_x}  ${sprite.px.offset_y};
                      width:${sprite.px.width};
                      height:${sprite.px.height};
                     }\n`
          );
        });
        return arr.join("");
      }
    }))
    .pipe(gulp.dest(Util.path('image')));
});


fs.watch(Util.path('image/sprite'), {
  encoding: 'utf-8'
}, (eventType, filename) => {
  if (filename) {
    fs.writeFile(Util.path('../bin/text.txt'), filename, 'utf8', () => {
      console.log('ok')
    })
  }
});
//监控任务
gulp.task('watch', function() {
  // gulp.watch(Util.path('_less/*.less'), ['less','px2rem'])
  // gulp.watch(Util.path('_scss/*.scss'), ['sass', 'px2rem'])
  gulp.watch(Util.path('style_tmp/**/*.css'), ['px2rem'])
  // gulp.watch(Util.path('images/sprite/*.png'), function(event){
  //   console.log(event.path,'-------------------'); //变化的文件的路径
  // })
  gulp.watch(Util.path('../bin/text.txt'), ['spritesmith'])
  gulp.watch(Util.path('/views/**/*.html'), ['htmlReload']);
});
//压缩css-all
let type = App.cssStyle || 'px2rem';

gulp.task('cssUglifyAll', [type, 'cssUglify']);

//服务
gulp.task('server', () => {
  connect.server({
    root: App.srcPath,
    port: App.port,
    host: App.host || '127.0.0.1',
    livereload: true, //实时刷新,
    middleware: function(connect, opt) {
      let proxyList = [];
      for (let key in App.proxy) {
        let value = App.proxy[key];
        proxyList.push(proxy(key, value))
      }
      return proxyList
    }
  })
});

//上线 build 压缩all.css js
// gulp.task('build',['cleanDist'],function(){
//   gulp.start('cssUglifyAll','jsUglify','htmlUglify','imagesUglify','fontUglify')
// })

gulp.task('build', function(callback) {
  runSequence('cleanDist',
    ['cssUglifyAll', 'jsUglify', 'imagesUglify', 'fontUglify', 'htmlUglify'],
    callback);
});


//开发环境
gulp.task('default', ['server', 'watch']);
