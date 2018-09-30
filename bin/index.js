const Koa = require('koa')

const app = new Koa()

const logger = require('../lib/logger')
const router = require('../server/route')

app.context.logger = logger;

app.use(router())

app.listen(9527)
