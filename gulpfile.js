var gulp = require('gulp'),
    px2rem = require('gulp-px3rem'),
    connect = require('gulp-connect')
    less = require('gulp-less')
    sass = require('gulp-sass')
    cleanCSS = require('gulp-clean-css')
    autoprefix = require('gulp-autoprefixer') //css3补全
    concat = require('gulp-concat')
    spritesmith=require('gulp.spritesmith') //合成雪碧图
    uglify = require('gulp-uglify')
    chokidar = require('chokidar')
    fs = require('fs')
    inject = require('gulp-inject') //注入
    Util = require('./config/util') //公共工具
    App = require('./config');
    
 
px2rem({
  baseDpr: 2,             // base device pixel ratio (default: 2)
  threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
  remVersion: true,       // whether to generate rem version (default: true)
  remUnit: 75,            // rem unit value (default: 75)
  remPrecision: 6         // rem precision (default: 6)
})

//px转换rem
gulp.task('px2rem', () => {
  gulp.src(Util.path('_style/*.css'))
    .pipe(px2rem())
    .pipe(autoprefix('last 2 versions'))
    .pipe(connect.reload())
    .pipe(gulp.dest(Util.path('style')))
});

//less文件
gulp.task('less', () => {
   gulp.src(Util.path('_less/index.less'))
    .pipe(less())
    .pipe(autoprefix('last 2 versions'))
    .pipe(connect.reload())
    .pipe(gulp.dest(Util.path('_style')))
})

//sass文件
gulp.task('sass', () => {
  gulp.src(Util.path('_scss/index.scss'))
   .pipe(cleanCSS())
   .pipe(autoprefix('last 2 versions'))
   .pipe(connect.reload())
   .pipe(gulp.dest(Util.path('_style')))
})

//压缩css 
gulp.task('cssUglify',() => {
  gulp.src(Util.path('style/*.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(concat('index.debug.css'))
    .pipe(App.uglifyMap ? cleanCSS({compatibility: 'ie8'}) : gulp.dest(Util.path('../dist/style')))
    .pipe(gulp.dest(Util.path('../dist/style')))
})

//压缩js 
gulp.task('jsUglify',() => {
  gulp.src(Util.path('js/*.js'))
    .pipe(App.uglifyMap ? uglify({ mangle: false }): gulp.dest(Util.path('../dist/js')))
    .pipe(gulp.dest(Util.path('../dist/js')))
})

//html输出
gulp.task('htmlUglify', ()=>{
  gulp.src(Util.path('*.html'))
    .pipe(gulp.dest(Util.path('../dist')))
})

//图片输出
gulp.task('imagesUglify', ()=>{
  gulp.src(Util.path('images/*.png'))
    .pipe(gulp.dest(Util.path('../dist/images')))
})

//font输出
gulp.task('fontUglify', ()=>{
  gulp.src(Util.path('font/*.css'))
    .pipe(gulp.dest(Util.path('../dist/font')))
})

//修改html页面
gulp.task('html', () => {
  gulp.src(Util.path('*.html'))
    .pipe(connect.reload());
});

//雪碧图
gulp.task('spritesmith',function(){
  gulp.src(Util.path('images/_sprite/*.png'))
      .pipe(spritesmith({
          imgName:'sprite.png',//保存合并后的名称
          cssName:'../font/icon.css',//保存合并后css样式的地址
          padding:15,//合并时两个图片的间距
          algorithm:'top-down',//注释1
          //cssTemplate:'dest/css/handlebarsStr.css'//注释2
          cssTemplate:function(data){ //如果是函数的话，这可以这样写
             var arr=[];
              　　data.sprites.forEach(function (sprite) {
                  arr.push(
                    `.icon-${sprite.name}  
                    {
                      background-image: url('../images/sprite.png');
                      background-position: ${sprite.px.offset_x}  ${sprite.px.offset_y};
                      width:${sprite.px.width};
                      height:${sprite.px.height};
                     }\n`
                  );
                });
              return arr.join("");
          }
      }))
      .pipe(gulp.dest(Util.path('images')));
})
//服务
gulp.task('server', () => {
  connect.server({
    root: App.srcPath,
    port: App.port,
    host: App.host || '127.0.0.1',
    livereload: true //实时刷新
  })
});

fs.watch(Util.path('images/_sprite'), { encoding: 'utf-8' }, (eventType, filename) => {
  if (filename) {
    fs.writeFile(Util.path('../bin/text.txt'), filename, 'utf8', ()=>{
       console.log('ok')
    })
  }
});
//监控任务
gulp.task('watch',function(){
    gulp.watch(Util.path('_less/*.less'), ['less','px2rem'])
    gulp.watch(Util.path('_scss/*.scss'), ['sass', 'px2rem'])
    gulp.watch(Util.path('_style/*.css'), ['px2rem'])
    // gulp.watch(Util.path('images/_sprite/*.png'), function(event){
    //   console.log(event.path,'-------------------'); //变化的文件的路径
    // }) 
    gulp.watch(Util.path('../bin/text.txt'),['spritesmith'])

    gulp.watch(Util.path('*.html'),['html']);
}) 
//压缩css-all   
var type = App.cssStyle || 'px2rem' ;
gulp.task('cssUglifyAll', [type,'cssUglify'])

//上线 build 压缩all.css js 
gulp.task('build',['cssUglifyAll','jsUglify','htmlUglify','imagesUglify','fontUglify'])

//开发环境
gulp.task('default', ['server','watch']);




