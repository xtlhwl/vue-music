import jsonp from 'common/js/jsonp'
import {commonParams, options } from './config'
import axios from 'axios'

export function getHotkey () {
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
export function getSearchSong (value, page, zhida) {
  const url = '/api/getSearchSong'
  const data = Object.assign({}, commonParams, {
    _: 1558792832943,
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    w: `${value}`,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: `${page}` | 1,
    remoteplace: 'txt.mqq.all'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}