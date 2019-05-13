export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.ablum = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

// 工厂方法
export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filtername(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    url: `http://tsmusic24.tc.qq.com/${musicData.songid}mp3`,
    image: `https:y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jsp?max_age=2592000`

  })
}
function filtername (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}