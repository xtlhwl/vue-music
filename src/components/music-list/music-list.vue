<template>
  <div class="music-list">
    <div class="back">
        <i class="icon-back" @click="backpage"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="play-wrapper" >
          <div class="play" v-show="songs.length > 0" ref="palyShow" @click="randomPlay">
            <i class="icon-play"></i>
            <span class="text">随机播放</span>
          </div>
        </div>
        <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :data="songs" class="list" ref="list"  :probe-type="probeType" :listen-scroll="listenScroll" >
      <div class="song-list-wrapper">
          <song-list  @select="selectItem" :songs="songs" :rank="rank"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
      <loading></loading> 
      </div>
    </scroll>
    
  </div>
</template>

<script type="text/ecmascript-6">
 import Scroll from 'base/scroll/scroll'
 import SongList from 'base/song-list/song-list'
 import {prefixStyle} from 'common/js/dom'
 import Loading from 'base/loading/loading'
 import {mapActions} from 'vuex'
 import {getVkey} from 'api/song'
 import {ERR_OK} from 'api/config'
 import {getSongUrl} from 'common/js/song'

 let transform = prefixStyle('transform')
 let filter = prefixStyle('backdrop-filter')

  let RESEAVE_HEIGHT = 40
  export default {
    props:{
          bgImage: {
          type: String,
          default: ''
      },
        songs: {
          type: Array,
          default: []
      },
        title: {
          type: String,
          default: ''
      },
        rank: {
          type:Boolean,
          default:true
        }
    },
    methods:{
      //返回上一页
        backpage(){
          window.history.go(-1)
        },
        //scroll组件传递到当前的y值当中
        scroll(pos){
          this.scrollY = pos.y
        },
        //点击歌曲列表，将歌曲数据传入vuex中的actions中，并将fullscreen
        selectItem(item,index){
          // const Item = item.mid
          // this._getVkey(Item)
            this.selectPlay({
              list:this.songs,
              index
              }) 
              console.log(this.songs)
        },
        //获取Vkey
        // _getVkey(item){
        //   getVkey(item).then((res) =>{
        //     if(res.code === ERR_OK){
        //        this.PlayAddress = res.data.items[0].vkey
               
        //     }
        //   }).then((re) =>{
        //       this.URL = getSongUrl(item,this.PlayAddress)
        //   })
        // },
        randomPlay(){

        },
        //获取vuex中selectPlay事件
        ...mapActions([
          'selectPlay'
        ])
      },
      watch:{
        //滑动事件
        scrollY(newY){
          let translateY = Math.max(this.minHeight,newY)
          let zindex = 0
          let scale = 1
          let blur = 0
          this.$refs.layer.style[transform] =`translate3d(0,${translateY}px,0)`
          const parect = Math.abs(newY / this.bgHeight)
          if(newY > 0){
            scale = 1 + parect
            zindex = 10
          }else{
            blur = Math.min(20 * parect,20)
            // this.$refs.bgImage.style.width = "100%"
          }
          //
          this.$refs.filter.style[filter] = `blur(${blur}px)`
          if(newY < this.minHeight){
            zindex = 10
            //当上滑动到top-bar时
            this.$refs.bgImage.style.paddingTop = 0
            this.$refs.bgImage.style.height = `${RESEAVE_HEIGHT}px`
            this.$refs.palyShow.style.display = 'none'
          }else{
            //恢复原来状态
            this.$refs.bgImage.style.paddingTop = "70% "
            this.$refs.bgImage.style.height = 0
            this.$refs.palyShow.style.display = 'inherit'
          }
          this.$refs.bgImage.style.zIndex = zindex
          this.$refs.bgImage.style[transform] =`scale(${scale})`
        }
      },
      created(){
            this.listenScroll= true, //监听滚动
            this.probeType = 3
      },
      data(){
        return{
          scrollY:0,
          PlayAddress:'',
        }
      },
      computed:{
        bgStyle(){
          return `background-image:url(${this.bgImage})`
        }
      },
      components:{
        Scroll,
        SongList,
        Loading
      },
      mounted(){
        this.bgHeight = this.$refs.bgImage.clientHeight
        this.minHeight = -this.bgHeight + RESEAVE_HEIGHT
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100% 
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>