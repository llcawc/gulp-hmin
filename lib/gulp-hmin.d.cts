import { Transform } from "node:stream";
import htmlmin from "html-minifier-next";

//#region src/gulp-hmin.d.ts
type MinifierOptions = Parameters<typeof htmlmin.minify>[1];
/**
 * Gulp plugin for minify html files
 * @param options
 * To configure the options, you need to look at the (https://github.com/j9t/html-minifier-next) options documentation.
 */
declare function gulpHmin(options?: MinifierOptions): Transform;
export = gulpHmin;