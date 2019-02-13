const path = require('path')
const fs = require('fs')
const { ncp } = require('ncp')
const chalk = require('chalk')
const _ = require('lodash')
const yaml = require('node-yaml')
const JavaScriptObfuscator = require('javascript-obfuscator')

const root = path.join(__dirname, '../../..')
const package = require('../../../package.json')
const basePackage = require('./files/package.json')

module.exports = stats => {
  if (!fs.existsSync(path.join(root, './dist/widgetbot.js'))) {
    console.error(chalk.redBright('Build failed!'))
    return
  }

  const newPackage = {
    ...basePackage,
    author: package.author,
    dependencies: {
      ..._.pickBy(
        package.dependencies,
        (_, package) => !package.startsWith('@types')
      ),
      ...basePackage.dependencies
    }
  }

  // Obfuscate the source code
  const obfuscated = JavaScriptObfuscator.obfuscate(
    fs.readFileSync(path.join(root, './dist/widgetbot.js'))
  )

  fs.writeFileSync(
    path.join(root, './dist/widgetbot.min.js'),
    obfuscated.getObfuscatedCode()
  )

  ncp(path.join(__dirname, './files'), path.join(root, './dist'), err => {
    if (err) throw err

    // Write the new package
    fs.writeFileSync(
      path.join(root, './dist/package.json'),
      JSON.stringify(newPackage, null, 2)
    )

    // Copy over config template
    ncp(
      path.join(root, './data/config.template.yml'),
      path.join(root, './dist/data/config.template.yml')
    )

    fs.writeFileSync(
      path.join(root, './dist/data/config.template.js'),
      `
/**
 * Find detailed documentation over at ↓
 * https://docs.widgetbot.io/self-hosted/config/
 */

module.exports = ${JSON.stringify(
        yaml.readSync(path.join(root, './data/config.template.yml')),
        null,
        2
      )}`
    )
  })
}
