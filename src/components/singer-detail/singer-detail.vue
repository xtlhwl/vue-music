<template>
    <transition name="slide">
        <music-list  :title="title" :bg-image="bgImage" :songs="songs" ></music-list>
    </transition>
</template>
<script>
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSingerDetail,getVkey}  from 'api/singer'
import {ERR_OK} from 'api/config'


export default {
    data(){
        return{
            songs:[]
        }
    },
    computed:{
        title(){
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        },
        ...mapGetters([
            'singer'   //这个是store中getter里面的singer
        ])
        
    },
    methods:{
        _getDetaill(){
            if(!this.singer.id){
                this.$router.push('/singer')
                return 
            }
            getSingerDetail(this.singer.id).then((res) =>{
                if(res.code === ERR_OK){
                    this.songs = this._normalsizeSongs(res.data.list)
                    console.log(this.songs)
                }
            })
        },
        _normalsizeSongs(list){
            let ret = []
            list.forEach((item) => {
                let {musicData} = item
                 if(musicData.songid && musicData.albummid){
                    // getVkey(musicData.songmid).then((res) =>{
                    //      if(res.code === ERR_OK){
                    //          const svkey = res.req_0.data.midurlinfo
                    //          const songVkey = svkey[0].purl
                    //          const newSong = createSong(musicData,songVkey)
                    //          ret.push(newSong)
                    //      }
                    //  })
                    ret.push(createSong(musicData))
                 }
                
            })
            return ret
        },
        

    },
    created(){
        //  
        this._getDetaill()
        
    },
    components:{
        MusicList
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
