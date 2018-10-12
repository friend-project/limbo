const appRoot = require('app-root-path')
const iconv = require('iconv-lite')
const file = require('../../library/file')

/**
 * @brief
 *
 * @param str
 *
 * @return
 */
function isJsonString(str) {
  try {
    if (typeof JSON.parse(str) == "object") {
      return true;
    }
  } catch(e) {
  }
  return false;
}

/**
 * @brief
 *
 * @param ctx
 * @param timestamp
 *
 * @return yyyy-mm-dd
 */
const formatYMD = (ctx, timestamp) => {
  try {
    const date = new Date(parseInt(timestamp))
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month > 9 ? month : `0${month}`
    let day = date.getDate()
    day = day > 9 ? day : `0${day}`

    return `${year}-${month}-${day}`
  } catch (e) {
    ctx.logger.error(e.toString())
  }
}

/**
 * @brief
 *
 * @param ctx
 *
 * @return files array
 */
const getAllLogFiles = (ctx) => {
  try {
    const {log, level, start, end} = ctx.query
    if (log === 'pm2' && level === 'error') {
      return [`${appRoot}/log/pm2-error.log`]
    }
    if (log === 'pm2') {
      return [`${appRoot}/log/pm2.log`]
    }
    if (log === 'app' && level === 'error') {
      return [`${appRoot}/log/app-error.log`]
    }

    let allFile = []
    let k = parseInt(start)
    for (; k <= parseInt(end);) {
      const filePath = `${appRoot}/log/${log}-${formatYMD(ctx, k)}.log`
      allFile.push(filePath)
      k = k + 24 * 60 * 60 * 1000
    }

    return allFile
  } catch (e) {
    ctx.logger.error(e.toString())
  }
}

/**
 * @brief
 *
 * @param ctx
 * @param files
 *
 * @return json logs array
 */
const getAllLogs = async (ctx, files) => {
  try {
    let allLogs = []
    for (let i = files.length - 1; i >= 0; i--) {
      const fileLogs = await file.read(ctx, files[i])
      if (fileLogs) {
        const log = fileLogs.split(/[\n]/)
        for (let j = log.length - 1; j >= 0; j--) {
          if (isJsonString(log[j])) {
            const jsonLog = JSON.parse(log[j])
            if (log[j]) allLogs.push({
              time: jsonLog.time,
              pid: jsonLog.pid,
              level: jsonLog.level,
              message: jsonLog.message
            })
          } else {
            if (log[j]) allLogs.push({
              time: log[j].slice(0, 23),
              pid: null,
              level: null,
              message: log[j].slice(24, log[j].length)
            })
          }
        }
      }
    }
    return allLogs
  } catch (e) {
    ctx.logger.error(e.toString())
  }
}

/**
 * @brief
 *
 * @param ctx
 *
 * @return
 */
const filterLogByWord = (ctx, logs) => {
  if (!ctx.query.word) {
    return logs
  }

  let word = []
  word = word.concat(ctx.query.word)
  if(!word.length) {
    return logs
  }

  let rst = []
  for (let i = logs.length - 1; i >= 0; i--) {
    for (let j = word.length - 1; j >= 0; j--) {
      if (logs[i].message.match(word[j])) rst.push(logs[i])
    }
  }

  return rst
}
/**
 * @brief 项目日志文件解析（pm2，app）
 *
 * @param ctx
 * @param next
 *
 * @return JSON
 */
const log = async (ctx, next) => {
  try {
    const allFiles = getAllLogFiles(ctx)
    const allLogs = await getAllLogs(ctx, allFiles)
    const filterLogs = filterLogByWord(ctx, allLogs)

    ctx.body = {
      code: 0,
      msg: '',
      data: filterLogs
    }
  } catch (e) {
    ctx.logger.error(e.toString())
  }
}

module.exports = {
  'GET /log': log,
}

