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