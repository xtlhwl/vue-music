import {playmode} from 'common/js/config.js'

const state = {
  singer: {},
  playing: false,
  fullScreen: true,
  playlist: [],
  sequenceList: [],
  mode: playmode.sequence,
  currentIndex: -1 // 当前播放索引
}
export default state