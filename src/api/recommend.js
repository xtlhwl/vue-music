import jsonp from 'common/js/jsonp'
import {commonParams, options } from './config'
import axios from 'axios'

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    format: 'jsonp'
  })
  return jsonp(url, data, options)
}

export function getDiscList () {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    // 以下参数自行参考源json文件的Query String Parameters
    picmid: 1,
    rnd: Math.random(),
    needNewCode: 0,
    loginUin: 0,
    platform: 'yqq.json',
    hostUin: 0,
    sin: 0,
    ein: 19,
    sortId: 5,
    categoryId: 10000000,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList (disstid) {
  const url = '/api/getSongList'
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1, // https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg
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
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}