<template>
    <div class="rank">
            <scroll class="toplist" :data="topList">
            <ul>
                <li class="item" v-for="(toplist,index) in topList" :key="index">
                    <div class="icon">
                        <img width="100" height="100" v-lazy="toplist.picUrl">
                    </div>
                    <ul class="songlist" >
                        <li class="song" v-for="(song,songindex) in toplist.songList" :key="songindex" >
                            <span >{{songindex+1}}</span>
                            <span >{{song.songname}}-{{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="loading-container" v-show="!topList.length">
                <loading></loading>
                </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>
<script>
import {getTopList} from 'api/rank'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
    methods:{
        _getTopList(){
            getTopList().then((res) =>{
                if(res.code === 0){
                    this.topList = res.data.topList
                    console.log(this.topList)
                }
            })
        }
    },
    data(){
        return{
            topList:[]
        }
    },
    created(){
        // setTimeout(() =>{
            this._getTopList()
        // },1000)
    },
    components:{
        Scroll,
        Loading
    }
}
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

.rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)

</style>
