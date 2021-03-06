import jsonp from 'common/js/jsonp'
import {commonParams, options } from './config'

export function getSingerList () {
  const url = 'https://szc.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    g_tk: 1664029744,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  })
  return jsonp(url, data, options)
}

export function getVkey (songmid) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    callback: 'getplaysongvkey05512360090100232',
    g_tk: 1907351394,
    jsonpCallback: 'getplaysongvkey05512360090100232',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: JSON.stringify({
      'req': {'module': 'CDN.SrfCdnDispatchServer'},
      'req_0': {
        'module': 'vkey.GetVkeyServer',
        'method': 'CgiGetVkey',
        'param': {
          'guid': '3806016700',
          'songmid': [songmid],
          'songtype': [0],
          'uin': '0',
          'loginflag': 1,
          'platform': '20'
        }
      },
      'comm': {'uin': 0, 'format': 'json', 'ct': 20, 'cv': 0}
    })
  })
  return jsonp(url, data, options)
}