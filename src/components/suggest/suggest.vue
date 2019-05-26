<template>
    <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore">
        <ul class="suggest-list">
            <li class="suggest-item" v-for="(item,index) in result" :key="index">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
        </ul>
    </scroll>
</template>
<script>
import {getSearchSong} from "api/search"
import {ERR_OK} from "api/config"
import {createSong} from 'common/js/song'
import Scroll from "base/scroll/scroll"

export default {
    components:{
        Scroll
    },
    props:{
        query:{
            type:String,
            default:''
        },
        showSinger:{
            type:Boolean,
            default:true
        },
    },
    data(){
        return{
            page:1,
            result:[],
            pullup:true,
            hasMore:true
        }
    },
    methods:{
        Search(){
            getSearchSong(this.query,this.page,this.showSinger).then((res) => {
                
                if(res.code === ERR_OK){
                    this.hasMore = true
                    this.result = this._resultSong(res.data)
                    this._checkSong(res.data)
                }
            }).catch((err) => {
                console.log("获取错误")
            });
        },
        _resultSong(data){
            let ret = []
            if(data.zhida && data.zhida.singerid){
                ret.push({...data.zhida,...{type:"singer"}})
            }
            if(data.song){
                ret = ret.concat(this._normalsizeSongs(data.song.list))
            }
            return ret
        },
        _checkSong(data){
            const song =data.song
            if(!song.list.length || (song.curnum+song.curpage * 20) > song.totalnum){
                this.hasMore = false
            }
        },
        getIconCls(item){
            if(item.type === 'songer'){
                 return "icon-main"
            }else{
                return "icon-music"
            }
        },
        getDisplayName(item){
            if(item.type === 'singer'){
                return item.singername
            }else{
                return `${item.name}-${item.singer}`
            }
        },
        _normalsizeSongs(list){
            let ret = []
            list.forEach((item) => {
                let musicData = item
                 if(musicData.songid && musicData.albummid){
                    ret.push(createSong(musicData))
                 }
                
            })
            return ret
        },
        searchMore(){
             if(!this.hasMore){
                 return
             }
             this.page++
             getSearchSong(this.query,this.page,this.showSinger).then((res) =>{
                 if(res.code === ERR_OK){
                    this.result = this.result.concat(this._resultSong(res.data))
                    this._checkSong(res.data)
                }
             })
        }
    },
    watch:{
        query(){
            this.Search()
        }       
    }
}
</script>
<style lang="stylus" scoped>
   @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
