import {playmode} from 'common/js/config.js'

const state = {
  singer: {}, // 歌手
  playing: false, // 正在播放
  fullScreen: true, // 全屏播放
  playlist: [], // 播放列表
  sequenceList: [], //
  mode: playmode.sequence,
  currentIndex: -1, // 当前播放索引
  disc: {},
  toplist: {}
}
export default state