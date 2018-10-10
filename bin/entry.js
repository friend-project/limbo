// regeneratorRuntime
require('@babel/polyfill')

// import for node
require('@babel/register')({
  ignore: [ /(node_modules)/ ],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'syntax-dynamic-import',
    'dynamic-import-node',
    'react-loadable/babel'
  ]
})

require('./app')

