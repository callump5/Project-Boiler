import gulp from 'gulp'
import sass from 'gulp-sass'
import browserSync from 'browser-sync';

// Create server instance
const server = browserSync.create();

// Paths to Folders & Files
const paths = {
    styles: {
        src : "src/assets/scss/main.scss",
        dest: "dist/assets/css"
    }
}

// Init Server (ENTER SERVER LOCATION)
export const serve = (done) => {
    server.init({
        proxy: "http://127.0.0.1:8080"
    });
    done();
}

// Reload Server
export const reload = (done) => {
    server.reload();
    done();
}

// Convert SCSS to CSS
export const styles = () => {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream())
}


// Watch For Changes
export const watch = () => {
    gulp.watch('src/assets/**/*.scss', styles);
    gulp.watch('**/*.html', reload);
}

// Dev Function
export const dev = gulp.series( styles, serve, watch);


//Gulp Default
export default dev;

