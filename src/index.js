/**
 * 灰度发布，支持localStorage
 */
import {
  random,
  bingo,
  extend,
  curry,
  isFunction
} from './util'
import loadScript from './loadScript'

const win = window
const doc = document
const XDomain = win.XDomainRequest
const CORS = win.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()
const noop = function() {}
const script = doc.getElementsByTagName('script')[0]

const grey = function(options) {
  /**
   * item包括
   * stable: 稳定版js
   * grey: 灰度js
   * ratio: 灰度比例
   * base: 灰度基数
   *
   * 保存在localStorage的key
   * stableKey
   * greyKey
   *
   * 加载前后执行
   * before
   * after
   *
   * hash: hash函数
   */
  options = extend({
    before: noop,
    after: noop,
    stable: '',
    stableKey: '',
    stableHash: '',
    grey: '',
    greyKey: '',
    greyHash: '',
    hash: v => v,    
    base: 100,
    ratio: 1,
    timeout: 10000
  }, options)

  let key
  let url
  let code
  // hash key
  let hash
  // hash fn
  const hashFn = options.hash
  const params = {}

  if (options.ratio >= options.base || bingo(options.ratio, options.base)) {
    key = options.greyKey
    url = options.grey
    hash = options.greyHash
    params.type = 'grey'
  } else {
    key = options.stableKey
    url = options.stable
    hash = options.stableHash
    params.type = 'stable'
  }

  params.url = url
  params.key = key
  params.hash = hash

  options.before(params)
  options.after = curry(options.after, params)

  if (key && (CORS || XDomain) && isFunction(hashFn)) {
    try {
      code = localStorage.getItem(key) || ''

      // hash校验
      if (code && hash === hashFn(code, params)) {
        parseCode(code)
        options.after({
          from: 'local'
        })
      } else {
        request(url, function (code) {
          localStorage.setItem(key, code)
          parseCode(code)
          options.after({
            from: 'cors'
          })
        }, function (e) {
          // CORS超时或出错时使用
          loadScript(url, options.after)
        }, options.timeout)
      }
    } catch (e) {
      // 不支持localStorage或解析出错
      // 用户传入的after出错 －－ 暂不考虑
      loadScript(url, options.after)
    }
  } else {
    // 不支持情况下使用script引入
    loadScript(url, options.after)
  }
}

/**
 * 解析code执行
 */
function parseCode(code) {
  if (!code) {
    return
  }

  try {
    const node = doc.createElement('script')
    node.appendChild(doc.createTextNode(code))
    script.parentNode.insertBefore(node, script)
  } catch (e) {
    (win.execScript || function (c) {
      win['eval'].call(win, c)
    })(code)
  }
}

/**
 * send CORS request
 */
function request(url, resolve, reject, timeout) {
  let xhr
  const method = 'GET'
  const onload = function () {
    resolve(xhr.responseText || '')
  }

  if (CORS) {
    xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
  } else {
    xhr = new XDomainRequest()
    xhr.open(method, url)
  }
  // xhr.withCredentials = true

  xhr.timeout = timeout
  xhr.onload = onload
  xhr.onerror = reject
  xhr.ontimeout = reject
  xhr.send()
}

module.exports = grey