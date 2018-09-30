const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const onerror = require('koa-onerror')

const logger = require('../lib/logger')
const router = require('../server/route')

const app = new Koa()

app.context.logger = logger

app.use(serve(path.resolve(__dirname, './../assets/')))
app.use(router())

if (process.env.NODE_ENV === 'development') {
  onerror(app)
}

app.on('error', (err, ctx) => {
  ctx.logger.error(err)
})

app.listen(9527)
