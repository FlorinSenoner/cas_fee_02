/** @format */

const { resolve } = require('path')
const pullAll = require('lodash/fp/pullAll')
const uniq = require('lodash/fp/uniq')

const Wettemer = {
  version: '1.0.0',

  // The DLL Plugin provides a dramatic speed increase to webpack build
  // and hot module reloading by caching the module metadata for all
  // the npm dependencies.
  // To disable the DLL Plugin, set this value to false.
  dllPlugin: {
    defaults: {
      // exclude dependencies which are not intended for the browser
      exclude: ['chalk', 'compression', 'cross-env', 'express', 'ip', 'minimist', 'sanitize.css', 'mongoose'],

      // Specify any additional dependencies (e.g. lodash, babel-polyfill) since
      // a lot of dependencies depend  on them and they get picked up by webpack
      include: ['babel-polyfill', 'lodash'],

      // The path where the DLL manifest and bundle will get built
      path: resolve('../node_modules/wettemer-dlls'),
    },

    entry(pkg) {
      const dependencyNames = Object.keys(pkg.dependencies)
      const exclude = pkg.dllPlugin.exclude || Wettemer.dllPlugin.defaults.exclude
      const include = pkg.dllPlugin.include || Wettemer.dllPlugin.defaults.include
      const includeDependencies = uniq(dependencyNames.concat(include))

      return {
        wettemerDeps: pullAll(exclude)(includeDependencies),
      }
    },
  },
}

module.exports = Wettemer
