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
   * key: 保存在localStorage的key
   * url: js地址
   * hash: js哈希值
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
    stable: {
      url: '',
      key: '',
      hash: ''
    },
    grey: {
      url: '',
      key: '',
      hash: ''
    },
    hash: v => v,    
    base: 100,
    ratio: 1,
    timeout: 10000
  }, options)

  
  let params
  if (options.ratio >= options.base || bingo(options.ratio, options.base)) {
    params = extend({
      type: 'grey'
    }, options.grey)
  } else {
    params = extend({
      type: 'stable'
    }, options.stable)
  }

  let code  
  let hashFn = options.hash
  let after = curry(options.after, params)
  let { key, url, hash } = params  

  // before hook
  options.before(params)

  if (key && (CORS || XDomain) && isFunction(hashFn)) {
    try {
      code = localStorage.getItem(key) || ''

      // hash校验
      if (code && hash === hashFn(code, params)) {
        parseCode(code)
        after({
          from: 'local'
        })
      } else {
        request(url, function(code) {
          localStorage.setItem(key, code)
          parseCode(code)
          after({
            from: 'cors'
          })
        }, function() {
          // CORS超时或出错时使用
          loadScript(url, after)
        }, options.timeout)
      }
    } catch(err) {
      // 不支持localStorage或解析出错
      // 用户传入的after出错 －－ 暂不考虑
      loadScript(url, after)
    }
  } else {
    // 不支持情况下使用script引入
    loadScript(url, after)
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
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || xhr.status === 1223) {
      resolve(xhr.responseText || '')
    } else {
      reject()
    }
  }

  if (CORS) {
    xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
  } else {
    xhr = new XDomainRequest()
    xhr.open(method, url)
  }

  // if ('withCredentials' in xhr) {
  //   xhr.withCredentials = true
  // }

  if ('onload' in xhr) {
    xhr.onload = onload
  } else {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        onload()
      }
    }
  }

  if ('onerror' in xhr) {
    xhr.onerror = reject
  }

  try {
    xhr.timeout = timeout  
    xhr.ontimeout = reject
  } catch(err) {
    setTimeout(reject, timeout)
  }
  
  xhr.send()
}

module.exports = grey