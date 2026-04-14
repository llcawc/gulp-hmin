import { describe, it, expect } from 'vitest'
import { Readable } from 'node:stream'
import { Buffer } from 'node:buffer'
import File from 'vinyl'
import gulpHmin from '../src/gulp-hmin.ts'

describe('gulp-hmin', () => {
  it('should minify HTML buffer', async () => {
    const plugin = gulpHmin({
      collapseWhitespace: true,
      removeComments: true,
    })

    const file = new File({
      path: 'test.html',
      contents: Buffer.from('  <div>  <!-- comment -->  </div>  '),
    })

    const transformed = await new Promise<File>((resolve, reject) => {
      plugin._transform(file, 'utf8', (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

    expect(transformed.contents?.toString()).toBe('<div></div>')
  })

  it('should skip null files', async () => {
    const plugin = gulpHmin()
    const file = new File({ path: 'test.html', contents: null })

    const transformed = await new Promise<File>((resolve, reject) => {
      plugin._transform(file, 'utf8', (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

    expect(transformed).toBe(file)
    expect(transformed.contents).toBeNull()
  })

  it('should reject streams', async () => {
    const plugin = gulpHmin()
    const file = new File({
      path: 'test.html',
      contents: new Readable({
        read() {
          this.push(Buffer.from('<div>test</div>'))
          this.push(null)
        },
      }),
    })

    await expect(
      new Promise((resolve, reject) => {
        plugin._transform(file, 'utf8', (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      }),
    ).rejects.toThrow('Streams are not supported')
  })

  it('should handle minification errors gracefully', async () => {
    const plugin = gulpHmin({})
    // Invalid HTML that may cause error (depending on minifier)
    const file = new File({
      path: 'test.html',
      contents: Buffer.from('<<<'),
    })

    await expect(
      new Promise((resolve, reject) => {
        plugin._transform(file, 'utf8', (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      }),
    ).rejects.toBeDefined()
  })
})
