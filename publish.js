#!/usr/bin/env node

'use strict'

const files = require('./tools/files')
const tools = require('./tools/tools')

const directoryBase = process.cwd()

// PACKAGE JSON
const packageJson = JSON.parse(files.readFileSync(directoryBase + '/package.json', 'utf8'))
const changePackage = async (name, registry) => {
    packageJson.name = name
    if (registry) {
        packageJson.publishConfig = {}
        packageJson.publishConfig.registry = registry
    }
    if (!registry && packageJson.publishConfig) delete packageJson.publishConfig
    return await files.appendFile(directoryBase + '/package.json', JSON.stringify(packageJson, null, 2), true)
}

changePackage('@NicolasBoyer/wapitis', 'https://npm.pkg.github.com/').then(async () => {
    try {
        tools.runCommandSync('npm publish')
        await changePackage('wapitis')
        tools.runCommandSync('npm publish')
    } catch (error) {
        changePackage('wapitis')
    }
})
