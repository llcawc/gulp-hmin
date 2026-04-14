# gulp-hmin

[![npm version](https://img.shields.io/npm/v/gulp-hmin.svg)](https://www.npmjs.com/package/gulp-hmin)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-✓-007ACC.svg)](https://www.typescriptlang.org/)

Gulp plugin for minifying HTML files using [html-minifier-next](https://github.com/j9t/html-minifier-next).

## Description

`gulp-hmin` is a lightweight Gulp plugin that minifies HTML files with the powerful [html-minifier-next](https://github.com/j9t/html-minifier-next) library. It supports all standard minification options: collapsing whitespace, removing comments, minifying inline CSS and JavaScript, and many more.

## Installation

```bash
npm install --save-dev gulp-hmin
```

Or using yarn:

```bash
yarn add -D gulp-hmin
```

Or using pnpm:

```bash
pnpm add -D gulp-hmin
```

## Usage

### ES Modules (recommended)

```js
import { src, dest } from "gulp";
import htmlmin from "gulp-hmin";

function minifyHTML() {
  return src("src/**/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        // ... other options
      }),
    )
    .pipe(dest("dist"));
}

export default minifyHTML;
```

### CommonJS

```js
const { src, dest } = require("gulp");
const htmlmin = require("gulp-hmin");

function minifyHTML() {
  return src("src/**/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      }),
    )
    .pipe(dest("dist"));
}

exports.minify = minifyHTML;
```

### Complete Gulpfile example

```js
import { deleteAsync } from "del";
import { series, src, dest } from "gulp";
import htmlmin from "gulp-hmin";

// Clean output directory
async function clean() {
  await deleteAsync(["dist/*"]);
}

// Copy static assets (CSS, JS, images)
function copy() {
  return src(["src/{css,js,images}/**/*"], { base: "src" }).pipe(dest("dist"));
}

// Minify HTML
function minify() {
  return src("src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      }),
    )
    .pipe(dest("dist"));
}

// Export tasks
export { clean, copy, minify };
export const build = series(clean, copy, minify);
```

## API

### htmlmin(options)

- `options` (Object) – configuration passed directly to [html-minifier-next](https://github.com/j9t/html-minifier-next#options). All options are optional.

Common options:

| Option                      | Type    | Default | Description                         |
| --------------------------- | ------- | ------- | ----------------------------------- |
| `collapseWhitespace`        | boolean | `false` | Collapse whitespace between tags    |
| `removeComments`            | boolean | `false` | Remove HTML comments                |
| `minifyJS`                  | boolean | `false` | Minify inline JavaScript            |
| `minifyCSS`                 | boolean | `false` | Minify inline CSS                   |
| `removeEmptyAttributes`     | boolean | `false` | Remove attributes with empty values |
| `removeRedundantAttributes` | boolean | `false` | Remove redundant attributes         |
| `useShortDoctype`           | boolean | `false` | Use short doctype                   |

Refer to the [html-minifier-next documentation](https://github.com/j9t/html-minifier-next#options) for the full list of available options.

## Development

The project uses TypeScript, Vitest for testing, and oxlint/oxfmt for linting and formatting.

### Scripts

- `npm test` – run tests with Vitest
- `npm run lint` – lint source code with oxlint
- `npm run fix` – auto‑fix lint issues
- `npm run check` – check formatting with oxfmt
- `npm run fmt` – format code with oxfmt
- `npm run typecheck` – run TypeScript type checking
- `npm run validate` – run lint and typecheck together
- `npm run build` – compile TypeScript to CommonJS and ES modules

## License

MIT License. © 2025–2026 [llcawc](https://github.com/llcawc). Made with <span style="color:red;">❤</span> to beautiful architecture.
