const { src, dest, task, series, watch, parallel } = require( "gulp");
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;


sass.compiler = require('node-sass');

task( 'clean', () => {
    return src( "dist/**/*", { read: false }).pipe(rm());
});

task( "copy:html", () => {
     return src("src/*.html")
       .pipe(dest("dist"))
       .pipe(reload({stream:true}));
});

task( "copy:css", () => {
    return src("src/css/**/*")
    .pipe(dest("dist/css"))
    .pipe(reload({stream:true}));
});

task( "copy:img", () => {
    return src("src/img/**/*")
    .pipe(dest("dist/img"))
    .pipe(reload({stream:true}));
});



task( 'scripts', () => {
    return src("src/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest("dist"))
    .pipe(reload({stream:true}));
});

task( "copy:svg", () => {
    return src("src/*.svg")
    .pipe(dest("dist"))
    .pipe(reload({stream:true}));
});

task( "copy:mp4", () => {
    return src("src/*.mp4")
    .pipe(dest("dist"))
    .pipe(reload({stream:true}));
});


const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/css/main.scss'
]

task( "styles", () => {
    return src(styles)
     .pipe(gulpif(env === "dev", sourcemaps.init()))
     .pipe(concat('main.scss'))
     .pipe(sass().on('error', sass.logError))
     .pipe(gulpif(env === "prod", cleanCSS()))
     .pipe(gulpif(env === "dev", sourcemaps.write()))
     .pipe(dest('dist/css'))
     .pipe(reload({stream:true}));
    
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

task("watch", () => {
    watch("./src/css/**/*", series("styles"));
    watch("./src/*.html", series("copy:html"));
    watch("./src/img/**/*", series("copy:img"));
    watch("./src/*.js", series("scripts"));
    watch("./src/*.svg", series("copy:svg"));
    watch("./src/*.mp4", series("copy:mp4"));
});


task(
    "default",
    series(
        "clean",
         parallel("copy:html", "copy:img", "scripts", "copy:svg", "copy:mp4", "styles"),
         parallel("watch", "server")
          )
 );

 task(
    "build",
    series( "clean", parallel("copy:html", "copy:img", "scripts", "copy:svg", "copy:mp4", "styles"))
 );

