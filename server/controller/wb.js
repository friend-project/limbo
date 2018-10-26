const appRoot = require('app-root-path')

/**
 * @brief 项目日志文件解析（pm2，app）
 *
 * @param ctx
 * @param next
 *
 * @return JSON
 */
const wb = async (ctx, next) => {
  try {
    ctx.body = {
      code: 0,
      msg: '',
      data: ''
    }
  } catch (e) {
    ctx.logger.error(e.toString())
  }
}

module.exports = {
  'GET /wb': wb,
}

