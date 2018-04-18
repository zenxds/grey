const fs = require('fs')
const path = require('path')
const { URL } = require('url')
const request = require('request-promise-native')
const moment = require('moment')
const UglifyJS = require('uglify-es')

module.exports = async function(options) {
  // cdn + repository + version + file
  options = Object.assign({
    cdn: '',
    repository: '',
    stableVersion: '',
    greyVersion: '',
    greyRatio: 10,
    greyBase: 100,
    file: 'index.js',
    minify: false
  }, options || {})

  const { greyVersion, stableVersion, greyRatio, greyBase } = options
  const greyContent = await getScriptContent(options, greyVersion)
  const stableContent = await getScriptContent(options, stableVersion)
  const template = fs.readFileSync(path.join(__dirname, 'template.js'), "utf-8")
  const header = `/* ${options.repository} ${stableVersion}-${greyVersion} ${greyRatio}/${greyBase} ${options.file} ${moment().format("YYYY-MM-DD HH:mm:ss")}  */\n`  

  if (greyRatio >= greyBase) {
    return header + greyContent
  }

  let code = substitute(template, {
    BASE: greyBase,
    RATIO: greyRatio,
    // 灰度100%的时候 灰度代码变为空，稳定代码变为灰度代码
    GREY_CODE: greyRatio >= greyBase ? "" : greyContent,
    STABLE_CODE: greyRatio >= greyBase ? greyContent : stableContent
  })

  if (options.minify) {
    code = UglifyJS.minify(code, {
      ie8: true,
      warnings: true,
      output: {
        ascii_only: true,
        quote_keys: true
      },
      compress: {
        drop_console: true,
        properties: false
      }
    }).code
  }

  return header + code
}

function getScriptUrl(options, version) {
  return new URL(path.join(options.repository, version, options.file), options.cdn)
}

async function getScriptContent(options, version) {
  const url = getScriptUrl(options, version)
  const content = await request(url.href)
  
  return content
}

function substitute(str, o) {
  return str.replace(/\\?\{\{\s*([^{}\s]+)\s*\}\}/g, function(match, name) {
    return o[name] == null ? "" : o[name]
  })
}
