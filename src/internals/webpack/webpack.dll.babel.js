/**
 * Cache webpack's module contexts for 3rd party
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 *
 * @format
 */

const { join } = require('path')
const defaults = require('lodash/fp/defaultsDeep')
const webpack = require('webpack')
const pkg = require(join(process.cwd(), 'package.json'))
const { dllPlugin } = require('../config')

if (!pkg.dllPlugin) {
  process.exit(0)
}

const dllConfig = defaults(dllPlugin.defaults)(pkg.dllPlugin)
const outputPath = join(process.cwd(), dllConfig.path)

module.exports = require('./webpack.base.babel')({
  context: process.cwd(),
  entry: dllConfig.dlls ? dllConfig.dlls : dllPlugin.entry(pkg),
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json'),
    }),
  ],
  performance: {
    hints: false,
  },
})
