# gulp-hmin

Gulp plugin for minify ".html" files - used [html-minifier-terser](https://github.com/terser/html-minifier-terser) fork.

Added types. Fork from [github:pioug/gulp-html-minifier-terser](https://github.com/pioug/gulp-html-minifier-terser)

install:

```
npm add -D gulp-hmin
```

sample application:

```js
// import modules
import { deleteAsync } from "del";
import { dest, series, src } from "gulp";
import htmlmin from "gulp-hmin";

// minify html
function minify() {
  return src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true, minifyCSS: true }))
    .pipe(dest("dist"));
}

//copy task
function copy() {
  return src(["src/{css,js}/*"], { base: "src" }).pipe(dest("dist"));
}

// clean task
async function clean() {
  return await deleteAsync(["dist/*"]);
}

// export
export { clean, copy, minify };
export const build = series(clean, copy, minify);
```

To configure the options, you need to look at the [html-minifier-terser](https://github.com/terser/html-minifier-terser?tab=readme-ov-file#options-quick-reference) options documentation.

---

MIT License. ©2025 pasmurno by [llcawc](https://github.com/llcawc). Made with <span style="color:red;">❤</span> to beautiful architecture
