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
export function createSong (musicData, songVkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filtername(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    url: `http://223.111.154.143/amobile.music.tc.qq.com/${songVkey}`,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg`
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

export class DiscSong {
  constructor (songmid, singer, singermid, name, ablum) {
    this.songmid = songmid,
    this.singer = singer,
    this.singermid = singermid,
    this.name = name,
    this.ablum = ablum
  }
}
export function createDiscSong (songmid, singer, singermid, name, ablum) {
  return new DiscSong(
    songmid,
    singer,
    singermid,
    name,
    ablum
  )
}
export function getSongUrl (songmid, vkey) {
  const url = `http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=2723418030&vkey=${vkey}&uin=0&fromtag=38`
  return url
}