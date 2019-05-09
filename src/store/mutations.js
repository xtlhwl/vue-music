import * as type from './mutation-types'
// mutation是唯一可以更改vuex的store的地方
const matutaions = {
  // 将singer写入state当中
  [type.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default matutaions