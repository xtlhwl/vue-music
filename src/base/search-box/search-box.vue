<template>
    <div class="search-box">
        <i class="icon-search"></i>
            <input class="box"  :placeholder="placeholder" v-model="query">
        <i class="icon-dismiss" v-show="query" @click="clear"></i>
    </div>
</template>
<script>
import {ERR_OK} from 'api/config'
import {getSearchSong} from 'api/search'

export default {

    props:{
        placeholder:{
            type:String,
            default:"搜索歌曲、歌手"
        }
    },
    data(){
        return{
            query:''
        }
    },
    methods:{
        clear(){
            this.query = ''
        },
        setQuery(query){
            this.query = query
        },
        // _getSearchSong(){
        //     getSearchSong(this.query).then((res) =>{
        //         console.log(res)
        //     })
        // }
    },
    created(){
        this.$watch('query',(newQueary)=>{
            this.$emit('query',newQueary) //一开始便监听query属性，并将属性放入中央事件总线emit
        })
        // this._getSearchSong()
    },
    watch:{
        // query(){
        //     this._getSearchSong(this.query)
        // }
    }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
