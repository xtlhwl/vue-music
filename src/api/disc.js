import jsonp from 'common/js/jsonp'
import {commonParams, options } from './config'

export function getDisc (disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0, // `${disstid}`
    hostUin: 0,
    new_format: 1,
    platform: 'yqq.json',
    needNewCode: 0,
    loginUin: 0,
    hostUin: 0,
    format: 'json'
  })
  return jsonp(url, data, options)
}
