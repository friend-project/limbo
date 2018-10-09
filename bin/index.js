const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const onerror = require('koa-onerror')

const logger = require('../library/logger')
const router = require('../server/route')

const app = new Koa()
const port = process.env.PORT || 9527

app.context.logger = logger

app.use(serve(path.resolve(__dirname, './../assets/')))
app.use(router())

if (process.env.NODE_ENV === 'development') {
  onerror(app)
}

app.on('error', (err, ctx) => {
  ctx.logger.error(err)
})

app.listen(port, () => {
  console.log('Server run on: http://0.0.0.0:%d', port)
})

