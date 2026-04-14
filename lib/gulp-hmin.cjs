//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let node_buffer = require("node:buffer");
let node_stream = require("node:stream");
let node_util = require("node:util");
let html_minifier_next = require("html-minifier-next");
html_minifier_next = __toESM(html_minifier_next, 1);
let plugin_error = require("plugin-error");
plugin_error = __toESM(plugin_error, 1);
//#region src/gulp-hmin.ts
/**
* Gulp plugin for minify html files
* @param options
* To configure the options, you need to look at the (https://github.com/j9t/html-minifier-next) options documentation.
*/
function gulpHmin(options = {}) {
	const stream = new node_stream.Transform({ objectMode: true });
	stream._transform = async function(file, _enc, callback) {
		if (file.isNull()) return callback(null, file);
		if (file.isStream()) {
			callback(new plugin_error.default("gulp-hmin", "Streams are not supported"));
			return;
		}
		if (file.isBuffer()) try {
			const contents = new node_util.TextDecoder().decode(file.contents);
			const minifyContents = await html_minifier_next.default.minify(contents, options);
			file.contents = node_buffer.Buffer.from(minifyContents);
			callback(null, file);
		} catch (err) {
			callback(new plugin_error.default("gulp-hmin", err instanceof Error ? err.message : String(err), { fileName: file.path }));
		}
	};
	return stream;
}
//#endregion
module.exports = gulpHmin;
