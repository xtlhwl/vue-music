import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiscList () {
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    // 以下参数自行参考源json文件的Query String Parameters
    platform: 'yqq',
    uin: 0,
    needNewCode: 0,
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    rnd: Math.random(),
    categoryId: 10000000,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}