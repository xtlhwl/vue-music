import * as type from './mutation-types'
import { stat } from 'fs'
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
    state.fullScreen = flag
  },
  [type.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [type.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [type.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [type.SET_DISC] (state, disc) {
    state.disc = disc
  },
  [type.SET_TOP_LIST] (state, toplist) {
    state.toplist = toplist
  },
  [type.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  }
}

export default matutaions