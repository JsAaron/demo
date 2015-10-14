var gulp = require('gulp');
var sass = require('gulp-sass');
//实时保存刷新
var livereload = require('gulp-livereload');
//web测试服务器
var connect = require('gulp-connect');

var webserver = require('gulp-webserver');
//自动加前缀
var autoprefixer = require('gulp-autoprefixer');
//压缩css
var minifycss = require('gulp-minify-css');
//图片快取，只有更改过得图片会进行压缩
var cache = require('gulp-cache');
//更动通知
var notify = require('gulp-notify');
//JSHint 错误
var jshint = require('gulp-jshint');
//将一系列的 stream 合并成一个
var combiner = require('stream-combiner2');
// 丑化(Uglify)
var uglify = require('gulp-uglify');
// 合并JS
var concat = require('gulp-concat');
//改名
var rename = require('gulp-rename');
//插件命名空间
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

//浏览器同步监听变化
var browserSync = require('browser-sync');

//清除目录
var clean = require('gulp-clean');

//减少编译打包
var watchify = require('watchify');
var browserify = require('browserify');


//监听浏览器的刷新
gulp.task('watch-brower', function() {
    livereload.listen();
});


// 注册任务
gulp.task('webserver', function() {
    gulp.src('./') // 服务器目录（./代表根目录）
        .pipe(webserver({ // 运行gulp-webserver
            livereload: true, // 启用LiveReload
            open: true // 服务器启动时自动打开网页
        }));
});

// 监听任务
gulp.task('watch', function() {
    gulp.watch('*.html', ['html']) // 监听根目录下所有.html文件
});

// 编译sass
gulp.task('style-sass', function() {

    // gulp.src('style/sass/index.scss')
    //    .pipe(plugins.sass())
    //    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //    .pipe(plugins.rename({
    //        suffix: '.min'
    //    }))
    //    .pipe(plugins.minifyCss())
    //    .pipe(gulp.dest('style/css'))
    //    .pipe(notify({
    //        message: 'Styles task complete'
    //    }));

    var combined = combiner.obj([
        gulp.src('style/sass/index.scss'),
        plugins.sass(),
        plugins.rename({
            suffix: '.min'
        }),
        plugins.minifyCss(),
        gulp.dest('style/css')
    ]);
    // 任何在上面的 stream 中发生的错误，都不会抛出，
    // 而是会被监听器捕获
    combined.on('error', console.error.bind(console));

    return combined;
});

//运行之前清除
//不想要读取已经被删除的档案，我们可以加入read: false选项来防止gulp读取档案内容–让它快一些
gulp.task('clean', function() {
    return gulp.src(['style/css/*', 'style/sass/*'], {
            read: false
        })
        .pipe(clean());
})

//兼容sass的变化
gulp.watch('style/sass/*.scss', function() {
    gulp.start('style-sass');
});


// 默认任务
gulp.task('default', ['clean'], function() {
    gulp.start('watch');
})
