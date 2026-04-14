import { Buffer } from "node:buffer";
import { Transform } from "node:stream";
import { TextDecoder } from "node:util";
import htmlmin from "html-minifier-next";
import PluginError from "plugin-error";
//#region src/gulp-hmin.ts
/**
* Gulp plugin for minify html files
* @param options MinifierOptions: To configure the options, you need to look at the (https://github.com/j9t/html-minifier-next) options documentation.
* @returns Transforn stream
*/
function gulpHmin(options = {}) {
	const stream = new Transform({ objectMode: true });
	stream._transform = async function(file, _enc, callback) {
		if (file.isNull()) return callback(null, file);
		if (file.isStream()) {
			callback(new PluginError("gulp-hmin", "Streams are not supported"));
			return;
		}
		if (file.isBuffer()) try {
			const contents = new TextDecoder().decode(file.contents);
			const minifyContents = await htmlmin.minify(contents, options);
			file.contents = Buffer.from(minifyContents);
			callback(null, file);
		} catch (err) {
			callback(new PluginError("gulp-hmin", err instanceof Error ? err.message : String(err), { fileName: file.path }));
		}
	};
	return stream;
}
//#endregion
export { gulpHmin as default };
