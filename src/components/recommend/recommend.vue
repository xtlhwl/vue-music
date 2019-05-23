<template>
    <div class="recommend">
        <!-- 传入data数据，在scroll中有watch事件监听data数据，data发生改变，会执行refresh()-->
        <scroll ref="scroll" class="recommend-content" :data="disclist">
            <div>
                <div v-if="recommends.length" class="slider-wrapper"> 
                    <slider>
                        <div v-for="(item,index) in recommends" :key="index" >
                            <a :href="item.linkUrl">
                                <img class="needsclick" @load="loadimage" :src="item.picUrl" >
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul >
                        <li  @click="selectItem(item)" v-for="(item,index) in disclist" :key="index" class="item">
                            <div class="icon">
                                <!-- 用懒加载加载图片 -->
                                <img v-lazy="item.imgurl" width="60px" height="60px"> 
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!disclist.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
    
</template>
<script>
// import  { getRecommend } from 'api/recommend'
import { getDiscList, getRecommend } from 'api/recommend'
import { ERR_OK }  from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
// import { getDisc } from 'api/disc'
import {mapMutations} from 'vuex'


export default {
    data(){
        return {
            recommends: [],
            disclist: [],
            songerlist:[],
        }
    },
    methods:{
        _getRecommend() {
            getRecommend().then((res) =>{
                if(res.code === ERR_OK){
                    this.recommends = res.data.slider;
                    // console.log('this.recommend', this.recommends)
                }
            })
        },
       _getDiscList() {
           getDiscList().then((res) =>{
               if(res.code === ERR_OK){
                   this.disclist = res.data.list
                   console.log(this.disclist)
               }
           })
       },
       selectItem(item){
           this.$router.push({
               path: `/recommend/${item.dissid}`
           })
           this.setDisc(item)
       },
       
       loadimage(){//如果轮播图撑开的话，重新加载滚动scroll事件
           if(!this.checkloaded){
               this.$refs.scroll.refresh();
               console.log('tag', '撑开')
               this.checkloaded = true;
           }
       },
       ...mapMutations({
           setDisc:'SET_DISC'
       })

    },
    created() {
        this._getRecommend()
        this._getDiscList()
        // setTimeout(() => {
        //     this._getDiscList()   //加载图标测试
        // }, 1000);
    },

    components:{
        Slider,
        Scroll,
        Loading,
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>