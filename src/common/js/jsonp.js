import originJSONP from 'jsonp'

export default function jsonp (url, data, options) {
  // 如果存在?则直接加params(data), 否则先加?再加 params(data)
  url += (url.indexOf('?') < 0 ? '?' : '') + params(data)
  // 结果返回一个Promise对象
  return new Promise((resolve, reject) => {
    originJSONP(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function params (data) {
  let params = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    // url += '&' + k + '=' + encodeURIComponent(value) ES5
    params += `&${k}=${encodeURIComponent(value)}` // ES6
  }
  // 去掉首个参数的&, 因为jsonp方法中参数自带&
  return params ? params.substring(1) : ''
}
