import type File from 'vinyl'

import { Buffer } from 'node:buffer'
import { Transform } from 'node:stream'
import { TextDecoder } from 'node:util'

import htmlmin from 'html-minifier-next'
import PluginError from 'plugin-error'

type MinifierOptions = Parameters<typeof htmlmin.minify>[1]

/**
 * Gulp plugin for minify html files
 * @param options
 * To configure the options, you need to look at the (https://github.com/j9t/html-minifier-next) options documentation.
 */
export default function gulpHmin(options: MinifierOptions = {}): Transform {
  const stream = new Transform({ objectMode: true })

  stream._transform = async function (file: File, _enc, callback) {
    // Skip null files
    if (file.isNull()) {
      return callback(null, file)
    }

    // Reject streams
    if (file.isStream()) {
      callback(new PluginError('gulp-hmin', 'Streams are not supported'))
      return
    }

    // run compiler
    if (file.isBuffer()) {
      try {
        const contents = new TextDecoder().decode(file.contents)
        const minifyContents = await htmlmin.minify(contents, options)

        file.contents = Buffer.from(minifyContents)
        callback(null, file)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        const error = new PluginError('gulp-hmin', errorMessage, { fileName: file.path })
        callback(error)
      }
    }
  }

  return stream
}
