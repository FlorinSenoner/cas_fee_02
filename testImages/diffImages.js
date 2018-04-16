import pixelmatch from 'pixelmatch'
import fs from 'fs'
import { PNG } from 'pngjs'

exports.compareScreenshots = (fileName, testFileName) =>
  new Promise(resolve => {
    const doneReading = () => {
      expect(img1.width).toBe(img2.width)
      expect(img1.height).toBe(img2.height)

      const numDiffPixels = pixelmatch(img1.data, img2.data, null, img1.width, img1.height, { threshold: 0.1 })
      expect(numDiffPixels).toBe(0)
      resolve()
    }
    const img1 = fs.createReadStream(testFileName).pipe(new PNG())
    const img2 = fs
      .createReadStream(fileName)
      .pipe(new PNG())
      .on('parsed', doneReading)
  })
