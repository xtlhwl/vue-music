import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getTopList () {
  const url = '/api/getTopList'

  const data = Object.assign({}, commonParams, {
    _: 1558603618828,
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getTopListSong (topId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: topId,
    _: '1492910996732'
  })
  return jsonp(url, data, options)
}
// url:https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?

//     uin=0
//     format=json
//     inCharset=utf-8
//     outCharset=utf-8&notice=
//     platform=h5
//     needNewCode=1
//     tpl=3
//     page=detail
//     type=top
//     topid：在排行榜获取的ID
//     _=1492910996732
//     参数可以适当删节
//     jsonp:jsonpCallback

//     https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=26&_=1492910996732&jsonpCallback=_jsonpfj49erzlw6g

// jsonpCallback: _jsonpfj49erzlw6g