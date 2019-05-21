<template>
    <transition>
    <music-list :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import { ERR_OK } from 'api/config'
import {mapGetters} from 'vuex'
export default {
    components:{
        MusicList
    },
    methods:{
        
       
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
    
}
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    .slide-enter-active, .slide-leave-active
        transition: all 0.4s,color 1s;

    .slide-enter, .slide-leave-to
        transform: translate3d(100%,0,0)

</style>
