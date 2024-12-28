import { Buffer } from 'node:buffer';
import PluginError from 'plugin-error';
import htmlmin from 'html-minifier-terser';
import through2 from 'through2';
export default function gulpHmin(options = {}) {
    return through2.obj(function (file, _enc, next) {
        if (file.isNull()) {
            next(null, file);
            return;
        }
        const minify = async (buf, _, cb) => {
            try {
                const contents = Buffer.from(await htmlmin.minify(buf.toString(), options));
                if (next === cb) {
                    file.contents = contents;
                    cb(null, file);
                    return;
                }
                cb(null, contents);
                next(null, file);
            }
            catch (err) {
                const opts = Object.assign({}, options, { fileName: file.path });
                const error = new PluginError('gulp-hmin', err, opts);
                if (next !== cb) {
                    next(error);
                    return;
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
