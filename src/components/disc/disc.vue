<template>
    <transition>
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import { ERR_OK } from 'api/config'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {createDiscSong } from 'common/js/song'
import {getVkey} from 'api/song'
import {getSongUrl,createSong} from 'common/js/song'

export default {
    components:{
        MusicList
    },
    data(){
        return{
            songs:[],
            vkey:'',
            url:''
        }
    },
    methods:{
        _getSongList(){
            if(this.disc.dissid !== undefined){
                getSongList(this.disc.dissid).then((res) =>{
                if(res.code === ERR_OK){
                    this.songs=this._normalsizeSongs(res.cdlist[0].songlist)
                }
            })
            }else{
                this.$router.push({
                    path: `/recommend`
                })
            }
        },
        _normalsizeSongs(list){
            let ret = []
            list.forEach((item) => {
                let musicData = item
                if(musicData.mid){
                    getVkey(musicData.mid).then((res) =>{
                        if(res.code === ERR_OK){
                            this.vkey = res.data.items[0].vkey
                            this.url = getSongUrl(musicData.mid,this.vkey)
                        }
                    }).then(() =>{
                        ret.push(createDiscSong(musicData,this.url))
                    })
                }
                
            })
            return ret
        }
       
    },
    computed:{
        ...mapGetters([
            'disc'
        ]),
        title(){
           return this.disc.dissname
        },
        bgImage(){
           return this.disc.imgurl
        }
    },
    created(){
        this._getSongList()
    }
    
}
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    .slide-enter-active, .slide-leave-active
        transition: all 0.4s,color 1s;

    .slide-enter, .slide-leave-to
        transform: translate3d(100%,0,0)

</style>
