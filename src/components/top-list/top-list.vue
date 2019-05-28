<template>
    <transition name="slide">
        <music-list :bg-image="imageurl" :title="title" :songs="songs" ></music-list>
    </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getTopListSong} from 'api/rank'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song.js'
import {getVkey} from 'api/song'
import {getSongUrl} from 'common/js/song'
export default {
    components:{
        MusicList,
    },
    data(){
        return{
            songs:[],
            URL: '',
            PlayAddress:'',
            Url:''
        }
    },
    methods:{
        _getTopListSong(){
            //如果没有获取到这个榜单的ID时，返回上一页
            if(!this.toplist.id){
                this.$router.push('/rank')
                return 
            }
            getTopListSong(this.toplist.id).then((res) =>{
                if(res.code === ERR_OK){
                    this.songs= this._normalsizeSongs(res.songlist)
                }
            })
        },
        _normalsizeSongs(list){
            let ret = []
            list.forEach((item) => {
                let musicData = item.data
                 if(musicData.songid && musicData.albummid){
                    getVkey(musicData['songmid']).then((res) =>{
                        if(res.code === ERR_OK){
                            this.PlayAddress = res.data.items[0].vkey
                            this.Url = getSongUrl(musicData['songmid'],this.PlayAddress)
                            
                        }
                    }).then(() =>{
                        console.log(this.Url)
                        ret.push(createSong(musicData,this.Url)) 
                    })
                    
                    
                 }
                
            })
            return ret
        },
    },
    computed:{
        imageurl(){
            return this.toplist.picUrl
        },
        title(){
            return this.toplist.topTitle
        },
        ...mapGetters([
            'toplist'
        ])
    },
    created(){
        this._getTopListSong()
    }
}
</script>
<style lang="stylus" scoped>
    .slide-enter-active,.slide-leave-active
        transition: all 0.3s ease 
    .slide-enter, .slide-leave-to
        transform: translate3d(100%,0,0)

</style>
