const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const onerror = require('koa-onerror')
const webpackMiddleware = require('koa-webpack');
const Webpack = require('webpack');

const appConfig = require('../config/app.js')
const webpackConfig = require('../build/dev.config')
const logger = require('../library/logger')
const router = require('../server/route')
const render = require('../library/render')

const app = new Koa()
const port = process.env.PORT || appConfig.port || 9527

if (process.env.NODE_ENV === 'development') {
  webpackMiddleware({
    compiler: Webpack(webpackConfig),
    config: webpackConfig
  })
  .then((middleware) => {
    app.use(middleware)
  })
}

app.context.logger = logger
app.use(serve(path.resolve(__dirname, './../asset')))
app.use(async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    return await router()(ctx, next)
  }
  // 过滤开发过程中 js 文件
  // 有静态真事文件走静态文件设置，没有走路由
  // 开发过程中为缓存文件，没有真实文件
  if (!ctx.path.match(/^\/app\./)) {
    return await render(ctx, next)
  }

  await next()
})

app.on('error', (err, ctx) => {
  ctx.logger.error(err)
})

if (process.env.NODE_ENV === 'development') {
  onerror(app)
}

app.listen(port, () => {
  console.log('Server run on: http://0.0.0.0:%d', port)
})

