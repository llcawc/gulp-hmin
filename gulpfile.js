// import modules
import { deleteAsync as del } from 'del'
import htmlmin from './gulp-hmin.js'
import gulp from 'gulp'
const { src, dest, parallel, series, watch } = gulp

// minify html
function minify() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true, minifyCSS: true }))
    .pipe(dest('dist'))
}

// clean task
function clean() {
  return del(['dist/**'])
}

// watch
function watcher() {
  watch('src/*.html', minify)
}

// export
export { clean, minify }
export const build = series(clean, minify)
export const dev = series(build, watcher)
