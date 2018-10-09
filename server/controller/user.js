const getUserInfo = (ctx, next) => {
  try {
    const query = ctx.query
    ctx.body = 'Hello World'
  } catch (err) {
    ctx.logger.error(err)
  }
}

module.exports = {
  'GET /user': getUserInfo,
}

