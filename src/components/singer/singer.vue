<template>
    <div class="singer">
        <list-view :data="singers"></list-view>
    </div>
</template>
<script>
import {getSingerList} from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
    data() {
        return {
            singers:[],
        }
    },
    methods:{
        _getSingerList(){
            getSingerList().then((res) =>{
                if(res.code === ERR_OK){
                    this.singers = this._normalizeSinger(res.data.list)
                }
            })
        },
        //处理歌手列表，将其按照字母以及热门分类
        _normalizeSinger(list){
             let map = {
                 //热门分类
                 hot:{
                    title: HOT_NAME,
                    items:[]
                 }
             };
             list.forEach((item,index) => {
                 if(index < HOT_SINGER_LEN){
                     map.hot.items.push(new Singer({
                         id: item.Fsinger_mid,
                         name: item.Fsinger_name,
                     }))
                 }
                 //聚类,将首字母相同的放在一起
                const key = item.Findex //字母归类
                if(!map[key]){
                    map[key]=({
                        title: key,
                        items: []
                    })
                }
                map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                }))
                
                
             });
             //将map中字母分类A-Z排序
             let hot = []
             let ret = []
             for(let key in map){
                 let val = map[key];
                 if(val.title.match(/[a-zA-Z]/)){
                     ret.push(val)
                 }else if(val.title === HOT_NAME){
                     hot.push(val)
                 }
             }
             ret.sort((a,b) => {
                 return a.title.charCodeAt(0) - b.title.charCodeAt(0)
             })
             //拼接热门和字母分类，得到有序列表
             return hot.concat(ret) //将连各位数组扁平化为一个单维数组
        },
        
    },
    created(){
        this._getSingerList()
    },
    components:{
        ListView,
    }
}
</script>
<style lang="stylus" scoped>
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>
