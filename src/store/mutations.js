import * as type from './mutation-types'
// mutation是唯一可以更改vuex的store的地方
const matutaions = {
  // 将singer写入state当中
  [type.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [type.SET_PLAYING_STATE] (state, flag) {
    state.play = flag
  },
  [type.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [type.SET_FULL_SCREEN] (state, flag) {
    state.fullScroll = flag
  },
  [type.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [type.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [type.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}

export default matutaions