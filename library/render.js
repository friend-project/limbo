import React from 'react'
import { StaticRouter as Router, matchPath } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import serialize from 'serialize-javascript'

import rootReducer from './../client/reducers'
import App from './../client/app'

const temp = (content, initialState) => {
  let scripts = '<script src="/script/app.js"></script>'
  if (process.env.NODE_ENV === 'development') {
    scripts = '<script src="app.js"></script>'
  }
  return (
    `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>loseyear</title>
          <meta content="yes" name="apple-touch-fullscreen">
          <meta name="format-detection" content="telephone=no">
          <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
          <link rel="stylesheet" href="/styles/app.css">
        </head>
        <body>
          <div id="app">${content}</div>
          <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
          <script src="/library/react.js"></script>
          ${scripts}
        </body>
      </html>
    `
  )
}

// render 404
const notFound = status => (
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>服务端渲染页面</title>
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<meta content="yes" name="apple-touch-fullscreen">
<meta name="format-detection" content="telephone=no">
<link rel="stylesheet" href="../styles/app.css">
</head>
<body>
<div id="app">服务器端${status}</div>
</body>
</html>`
)

// 声明路由
const routes = [
  '/',
  '/about',
  '/topics',
  '/count',
  '/topics/*',
  '/async',
]

module.exports = async (ctx, next) => {
  const match = routes.reduce(
    (acc, route) =>
    matchPath(ctx.url, route, { exact: true }) || acc, null
  );

  if (!match.isExact) {
    ctx.status = 404;
    ctx.body = notFound(404);
    return;
  }

  const middleware = [thunk]
  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
  ) || null
  const context = {}
  const content = renderToString(
    <Provider store={store}>
      <Router
        location={ctx.url}
        context={context}
      >
        <App />
      </Router>
    </Provider>
    )

  ctx.body = temp(content, store.getState())

  await next()
}

