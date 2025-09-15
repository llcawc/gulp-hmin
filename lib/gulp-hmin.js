import htmlmin from 'html-minifier-next';
import { Buffer } from 'node:buffer';
import { Transform } from 'node:stream';
import { TextDecoder } from 'node:util';
import PluginError from 'plugin-error';
/**
 * Gulp plugin for minify html files
 * @param options
 * To configure the options, you need to look at the (https://github.com/j9t/html-minifier-next) options documentation.
 */
export default function gulpHmin(options = {}) {
    const stream = new Transform({ objectMode: true });
    stream._transform = async function (file, _enc, callback) {
        // Skip null files
        if (file.isNull()) {
            return callback(null, file);
        }
        // Reject streams
        if (file.isStream()) {
            callback(new PluginError('gulp-hmin', 'Streams are not supported'));
            return;
        }
        // run compiler
        if (file.isBuffer()) {
            try {
                const contents = new TextDecoder().decode(file.contents);
                const minifyContents = await htmlmin.minify(contents, options);
                file.contents = Buffer.from(minifyContents);
                callback(null, file);
            }
            catch (err) {
                const opts = Object.assign({}, options, { fileName: file.path });
                const error = new PluginError('gulp-hmin', err, opts);
                callback(error);
            }
        }
    };
    return stream;
}
