import jsonp from 'common/js/jsonp'
import {commonParams, options } from './config'
import axios from 'axios'

export function getSearch () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    _: 1558830436449,
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1

  })
  return jsonp(url, data, options)
}