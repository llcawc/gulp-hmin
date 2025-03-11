import htmlmin, { Options } from 'html-minifier-terser'
import { Buffer } from 'node:buffer'
import PluginError from 'plugin-error'
import through2, { TransformCallback } from 'through2'
import File from 'vinyl'

export default function gulpHmin(options: Options = {}) {
  return through2.obj(function (file: File, _enc, next) {
    // if null
    if (file.isNull()) {
      return next(null, file)
    }
    const minify = async (buf: Buffer | ReadableStream, _: BufferEncoding | null, cb: TransformCallback) => {
      try {
        const contents = Buffer.from(await htmlmin.minify(buf.toString(), options))
        if (next === cb) {
          file.contents = contents

          return cb(null, file)
        }
        cb(null, contents)
        next(null, file)
      } catch (err) {
        const opts = Object.assign({}, options, { fileName: file.path })
        const error = new PluginError('gulp-hmin', err as string, opts)
        if (next !== cb) {
          return next(error)
        }
        cb(error)
      }
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(through2(minify))
    } else {
      minify(file.contents as Buffer, null, next)
    }
  })
}
