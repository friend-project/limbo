const fs = require('fs')

let file = {}

file.isFile = async (ctx, path) => {
  try {
    return new Promise(async (resolve, reject) => {
      fs.stat(path, (e, stat) => {
        if (e) {
          ctx.logger.error(e.toString())
          resolve(false)
        }
        if (!stat || !stat.isFile()) {
          ctx.logger.error(path + ' 文件格式错误')
          resolve(false)
        }
        resolve(true)
      })
    })
  } catch (e) {
    ctx.logger.error(e)
  }
}


file.read = async (ctx, path) => {
  return new Promise(async (resolve, reject) => {
    const isFile = await file.isFile(ctx, path)
    if (isFile) {
      fs.readFile(path, (e, stat) => {
        if (e) {
          ctx.logger.error(e.toString())
          resolve(false)
        }
        resolve(stat.toString())
      })
    } else {
      resolve(false)
    }
  })
}


module.exports = file

