/**
 * 生成min-max的随机整数，包括min和max
 */
export function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

// 是否命中
// 用于控制比例
export function bingo(val, base) {
  return random(1, base) <= val
}

export function extend(target, source) {
  for (let prop in source) {
    if (source.hasOwnProperty(prop)) {
      target[prop] = source[prop]
    }
  }
  return target
}

export function curry(fn, params) {
  return function(params2) {
    return fn.call(null, extend(params2 || {}, params))
  }
}

export const isArray = Array.isArray || isType("Array")
export const isFunction = isType('Function')

function isType(type) {
  return function (obj) {
    return {}.toString.call(obj) == "[object " + type + "]"
  }
}