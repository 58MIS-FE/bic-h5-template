var gulp = require('gulp');
var px2rem = require('gulp-px3rem');


px2rem({
  baseDpr: 2,             // base device pixel ratio (default: 2)
  threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
  remVersion: true,       // whether to generate rem version (default: true)
  remUnit: 75,            // rem unit value (default: 75)
  remPrecision: 6         // rem precision (default: 6)
})
 
gulp.task('px2rem', function() {
  gulp.src('./public/_style/*.css')
    .pipe(px2rem())
    .pipe(gulp.dest('./public/style'))
});

var watcher = gulp.watch('./public/_style/*.css', ['px2rem']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});




