import {playmode} from 'common/js/config.js'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playmode.sequence,
  currentIndex: -1 // 当前播放索引
}
export default state