<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="onQuerychange"></search-box>
        </div>
        <div class="shortcut-wrapper"  >
            <div class="shortcut" v-show="!query">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                        <ul>
                             <li class="item" v-for="(hotkey,index) in HotKey" :key="index" @click="keyclick(hotkey.k)" >
                                 <span>{{hotkey.k}}</span>
                             </li>
                         </ul>
                </div>
            </div>
        </div>
        <div class="search-result">
            <suggest :query="query" ></suggest>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import SearchBox from  'base/search-box/search-box'
import {getHotkey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from 'components/suggest/suggest'
export default {
    components:{
        SearchBox,
        Suggest
    },
    data(){
        return{
            HotKey:[],
            query:''
        }
    },
    methods:{
        keyclick(key){
            console.log(key)
            this.$refs.searchBox.setQuery(key)
        },
        _getHotkey(){
            getHotkey().then((res) => {
                if(res.code === ERR_OK){
                    this.HotKey = res.data.hotkey.slice(0,10)
                }
            }).catch((err) => {
                console.log("未获取到搜索热词")
            })
        },
        onQuerychange(query){
           return this.query = query
            
        },   
    },
    
    created(){
        this._getHotkey()
    },
    watch:{
        
    }
}
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            z-index: 80
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: inherit
      width: 100%
      top: 178px
      bottom: 0
</style>
