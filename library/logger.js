const {
  createLogger,
  transports,
  format: {
    colorize,
    combine,
    json,
    label,
    printf,
    simple,
    timestamp,
  }
} = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file');
var appRoot = require('app-root-path')

// 错误信息日志
const ERROR_LOG_NAME = `${appRoot}/log/app-error.log`

// 所有运行日志
const APP_LOG_NAME = `${appRoot}/log/app-%DATE%.log`

// 保存天数
const SAVE_DAYS = '49d'

// 日志级别
const levels = {
  error: 0,       // 错误
  warn: 1,        // 提示
  info: 2,        // 信息
  verbose: 3,     // 长的
  debug: 4,       // 调试
  silly: 5,       // 普通
}

// 格式化输出内容
const formatter = combine(
  json(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
  printf(info => {
    const showInfo = {
      time: info.timestamp,
      pid: process.pid,
      level: info.level,
      message: info.message
    }
    return JSON.stringify(showInfo)
  })
)

let logger
if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'front'
) {
  logger = createLogger({
    transports: [
      // 控制台输出
      new transports.Console({
        format: combine(
          timestamp(),
          colorize(),
          printf(info => {
            if (info.level == 'error') {
              return `${info.level} ${info.timestamp} ${info.message}`
            } else {
              return `${info.level} ${info.timestamp} ${JSON.stringify(info.message)}`
            }
          })
        )
      })
    ],
    // 异常不会退出进程
    exitOnError: false
  })
} else {
  logger = createLogger({
    levels: levels,
    format: formatter,
    transports: [
      // 'error'级别的日志处理
      new transports.File({
        handleExceptions: true,
        level: 'error',
        filename: ERROR_LOG_NAME
      }),
      /* 所有的日志处理,
       * maxFiles是回滚时间，超时会删除旧文件，如果不设置，则不会删除
       */
      new (transports.DailyRotateFile)({
        handleExceptions: true,
        filename: APP_LOG_NAME,
        zippedArchive: true,
        maxFiles: SAVE_DAYS,
      }),
    ],
    // 异常不会退出进程
    exitOnError: false
  })
}

module.exports = logger

