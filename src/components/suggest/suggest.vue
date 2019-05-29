<template>
    <scroll  class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore">
        <ul class="suggest-list" v-show="result.length">
            <li class="suggest-item" v-for="(item,index) in result" :key="index" @click="getSongOrSing(item)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name" >
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
    </scroll>
</template>
<script>
import {getSearchSong} from "api/search"
import {ERR_OK} from "api/config"
import {createSong} from 'common/js/song'
import Scroll from "base/scroll/scroll"
 import Loading from 'base/loading/loading'
import Singe from 'common/js/singer'
import {mapMutations} from 'vuex'

export default {
    components:{
        Scroll,
        Loading
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
        //获取搜索内容
        Search(){
            this.page = 1
            this.hasMore = true
            getSearchSong(this.query,this.page,this.showSinger).then((res) => {
                
                if(res.code === ERR_OK){
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
        },
        getSongOrSing(item){
            if(item.type === "singer"){
                const singer = new Singe({id:item.singermid,name:item.singername})
                this.$router.push({
                    path:`/search/${singer.id}`
                })
                this.setSinger(singer)
            }else{
                
            }
        },
        //引入mapMutations，提交歌手数据
        ...mapMutations({
            setSinger:'SET_SINGER'
        })
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
