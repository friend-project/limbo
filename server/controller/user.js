const getUserInfo = (ctx, next) => {
  const query = ctx.query
  ctx.logger.error(query)
  ctx.body = 'Hello World'
}

module.exports = {
  'GET /user': getUserInfo,
}
