import htmlmin from 'html-minifier-terser';
import { Buffer } from 'node:buffer';
import PluginError from 'plugin-error';
import through2 from 'through2';
export default function gulpHmin(options = {}) {
    return through2.obj(function (file, _enc, next) {
        // if null
        if (file.isNull()) {
            return next(null, file);
        }
        const minify = async (buf, _, cb) => {
            try {
                const contents = Buffer.from(await htmlmin.minify(buf.toString(), options));
                if (next === cb) {
                    file.contents = contents;
                    return cb(null, file);
                }
                cb(null, contents);
                next(null, file);
            }
            catch (err) {
                const opts = Object.assign({}, options, { fileName: file.path });
                const error = new PluginError('gulp-hmin', err, opts);
                if (next !== cb) {
                    return next(error);
                }
                cb(error);
            }
        };
        if (file.isStream()) {
            file.contents = file.contents.pipe(through2(minify));
        }
        else {
            minify(file.contents, null, next);
        }
    });
}
