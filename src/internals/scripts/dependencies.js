/* eslint-disable */
// No need to build DLL in production
if (process.env.NODE_ENV === 'production') {
  process.exit(0)
}

require('shelljs/global')

const path = require('path')
const fs = require('fs')
const exists = fs.existsSync
const writeFile = fs.writeFileSync

const defaults = require('lodash/fp/defaultsDeep')
const pkg = require(path.join(process.cwd(), 'package.json'))
const config = require('../config')
const dllConfig = defaults(config.dllPlugin.defaults)(pkg.dllPlugin)
const outputPath = path.join(process.cwd(), dllConfig.path)
const dllManifestPath = path.join(outputPath, 'package.json')

/**
 * Use node_modules/wettemer-dlls by default
 * -> no version control and babel will not parse it.
 */
mkdir('-p', outputPath)

echo('Building the Webpack DLL...')

// Create a manifest, otherwise npm install will create an errors
if (!exists(dllManifestPath)) {
  writeFile(
    dllManifestPath,
    JSON.stringify(
      defaults({
        name: 'wettemer-dlls',
        private: true,
        author: pkg.author,
        repository: pkg.repository,
        version: pkg.version,
      }),
      null,
      2,
    ),
    'utf8',
  )
}

// set BUILDING_DLL env var, to avoid confusing the development environment
exec(
  'cross-env BUILDING_DLL=true webpack --display-chunks --color --config src/internals/webpack/webpack.dll.babel.js --hide-modules',
)
