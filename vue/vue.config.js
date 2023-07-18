const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../electron/app',
  publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/'
})
