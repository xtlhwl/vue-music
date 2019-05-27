import jsonp from 'common/js/jsonp'
import {commonParams, options } from './config'
import axios from 'axios'

// export function getSingerList () {
//   const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
//   const data = Object.assign({}, commonParams, {
//     g_tk:1664029744, //195219765
//     jsonpCallback:MusicJsonCallback004680169373158849,
//     loginUin:1297716249, //可以传空值
//     hostUin:0,
//     format:'json',
//     platform:'yqq',
//     needNewCode:0,
//     cid:205361747,
//     callback:MusicJsonCallback004680169373158849,
//     uin:1297716249, //可以传空值
//     songmid:001Qu4I30eVFYb,
//     filename:C400001Qu4I30eVFYb.m4a,
//     guid:2723418030,
//   })
//   return jsonp(url, data, options)
// }
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
  const url = '/api/getVkey'
  const data = Object.assign({}, commonParams, {
    format: 'json',
    cid: 205361747,
    uin: 0,
    songmid: songmid,
    filename: `C400${songmid}.m4a`,
    guid: 328569683,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// export function getSongPlay (songmid, vkey) {
//   const url = `http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a`
//   const data = Object.assign({}, commonParams, {
//     guid: 2723418030,
//     vkey: vkey,
//     uin: 0,
//     fromtag: 38
//   })
//   return jsonp(url, data, options)
// }