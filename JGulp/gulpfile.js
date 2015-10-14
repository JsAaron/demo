var lr = require('tiny-lr'),
     server     = lr(),
     gulp       = require('gulp'),
     sass       = require('gulp-sass'),
     livereload = require('gulp-livereload'),
     uglify     = require('gulp-uglify'), //js压缩
     minifycss  = require('gulp-minify-css'), //css压缩
     plumber    = require('gulp-plumber'),
     webserver  = require('gulp-webserver'),
     opn        = require('opn'),
     concat     = require('gulp-concat'),//合并文件
     clean      = require('gulp-clean'), //清空文件夹
     imagemin   = require('gulp-imagemin'),
     pngquant   = require('imagemin-pngquant'),
     rename     = require("gulp-rename"),
     zip        = require('gulp-zip'),
     copy       = require("gulp-copy"),
     tinypng    = require('gulp-tinypng'),
     sftp       = require('gulp-sftp'),
     connect    = require('gulp-connect'),
     config     = require('./config.json');


//压缩JS
gulp.task('minifyjs', function() {
    gulp.src('lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/temp_js'))
});

//合并JS  
gulp.task('alljs', function() {
    return gulp.src('build/temp_js/*.js')
        .pipe(concat('xxtppt.min.js'))
        .pipe(gulp.dest('build'))
        .pipe(livereload());
});

//重命名project.md 文件
gulp.task('rename', function() {
    return gulp.src("./Project.md")
        .pipe(rename("README.md"))
        .pipe(gulp.dest("./build"));
});

//开启本地 Web 服务器功能
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(
            webserver({
                host: config.localserver.host,
                port: config.localserver.port,
                livereload: true,
                open:false, //开打浏览器
                directoryListing: false //显示目录
            })
        );
});

//通过浏览器打开本地 Web服务器 路径
gulp.task('openbrowser', function() {
    opn('http://' + config.localserver.host + ':' + config.localserver.port);
});

//SASS编译
gulp.task('sass', function() {
    gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/temp_css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('build'))
});

//多余文件删除
gulp.task('clean', function() {
    return gulp.src(['build/temp_js/*','build/temp_css/*'],{read:false})
        .pipe(clean({
            force: true
        }))
});

//压缩图片
gulp.task('imagemin', function() {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/images'));
});

//压缩图片 - tinypng
gulp.task('tinypng', function() {
    gulp.src('images/*.{png,jpg,jpeg}')
        .pipe(tinypng(config.tinypngapi))
        .pipe(gulp.dest('./build/images'));
});

//将相关项目文件复制到build 文件夹下
gulp.task('buildfiles', function() {
    //根目录文件
    gulp.src('./*.{php,html,css,png}')
        .pipe(gulp.dest('./build'));
    //CSS文件
    gulp.src('./css/*')
        .pipe(gulp.dest('./build/css'));
    //压缩后的js文件
    gulp.src('./js/min/*')
        .pipe(gulp.dest('./build/js'));
});


// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {

    // 监听css
    gulp.watch('sass/**', function(){
        gulp.run('sass');
    });


    // gulp.watch('./sass/*.scss', function(e) {
    //     gulp.run('sass');
    //     server.changed({
    //         body: {
    //             files: [e.path]
    //         }
    //     });
    // });

    // gulp.watch(['./sass/*.scss', './*.html', './*.php', './*.css', './js/*.js'], function(e) {
    //     server.changed({
    //         body: {
    //             files: [e.path]
    //         }
    //     });
    // });

});

//默认任务
gulp.task('default', function() {
    console.log('Starting Gulp tasks, enjoy coding!');
    // gulp.run('sass');
    gulp.run('watch');
    gulp.run('webserver');
    // gulp.run('openbrowser');
});


//项目完成提交任务
gulp.task('build', function() {
    gulp.run('imagemin');
    gulp.run('sass');
    gulp.run('minifyjs');
    gulp.run('alljs');
    gulp.run('buildfiles');
    gulp.run('rename');
    //gulp.run('clean');
});

//项目完成提交任务
gulp.task('build2', function() {
    gulp.run('tinypng');
    gulp.run('sass');
    gulp.run('minifyjs');
    gulp.run('alljs');
    gulp.run('buildfiles');
    gulp.run('rename');
    //gulp.run('clean');
});

//打包主体build 文件夹并按照时间重命名
gulp.task('zip', function() {
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }

    var d = new Date();
    var year = d.getFullYear();
    var month = checkTime(d.getMonth() + 1);
    var day = checkTime(d.getDate());
    var hour = checkTime(d.getHours());
    var minute = checkTime(d.getMinutes());

    return gulp.src('./build/**')
        .pipe(zip(config.project + '-' + year + month + day + hour + minute + '.zip'))
        .pipe(gulp.dest('./'));
});

//上传到远程服务器任务
gulp.task('upload', function() {
    return gulp.src('./build/**')
        .pipe(sftp({
            host: config.sftp.host,
            user: config.sftp.user,
            port: config.sftp.port,
            key: config.sftp.key,
            remotePath: config.sftp.remotePath
        }));
});
