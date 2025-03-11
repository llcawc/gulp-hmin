// import modules
import { deleteAsync } from 'del'
import { dest, series, src } from 'gulp'
import htmlmin from './plugin/gulp-hmin.js'

// minify html
function minify() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true, minifyCSS: true }))
    .pipe(dest('dist'))
}

//copy task
function copy() {
  return src(['src/{css,js}/*'], { base: 'src' }).pipe(dest('dist'))
}

// clean task
async function clean() {
  return await deleteAsync(['dist/**'])
}

// export
export { clean, copy, minify }
export const build = series(clean, copy, minify)
