const util = require("util")
const path = require("path")

const fs = require("graceful-fs")
const imagemin = require("imagemin")
const imageminGifsicle = require("imagemin-gifsicle")
const imageminMozJpeg = require("imagemin-mozjpeg")
const imageminPngquant = require("imagemin-pngquant")
const imageminSvgo = require("imagemin-svgo")
const makeDir = require("make-dir")

const writeFile = util.promisify(fs.writeFile)
const src = "static/img"
const dist = src

if (process.env.NETLIFY === "true") {
  imagemin([`${src}/**/*.{gif,svg,jpg,jpeg,png}`], {
    plugins: [
      imageminGifsicle({
        interlaced: true,
        optimizationLevel: 2,
      }),
      imageminMozJpeg({
        quality: 75,
      }),
      imageminPngquant({
        quality: [0.65, 0.8],
      }),
      imageminSvgo({
        plugins: [
          {
            removeViewBox: false,
          },
          {
            cleanupIDs: false,
          },
          {
            removeUnknownsAndDefaults: false,
          },
        ],
      }),
    ],
  }).then((files) =>
    files.forEach(async (file) => {
      let source = path.parse(file.sourcePath)

      file.destinationPath = `${source.dir.replace(src, dist)}/${source.name}${
        source.ext
      }`

      await makeDir(path.dirname(file.destinationPath))
      await writeFile(file.destinationPath, file.data)
    }),
  )
}
