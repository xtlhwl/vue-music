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
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  const data = Object.assign({}, commonParams, {
    '-': 'getUCGI3240088262216596',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'detail': {'module': 'musicToplist.ToplistInfoServer', 'method': 'GetDetail', 'param': {'topId': topId, 'offset': 0, 'num': 20, 'period': '2019_20'}}, 'comm': {'ct': 24, 'cv': 0}}

  })
  return jsonp()
}
