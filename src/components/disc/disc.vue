<template>
    <transition>
    <music-list></music-list>
    </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import { getDisc } from 'api/disc'
import { ERR_OK } from 'api/config'

export default {
    components:{
        MusicList
    },
    methods(){
        _getDisc((res) =>{
            getDisc().then((res) =>{
                if(res.code === ERR_OK){
                    console.log(res)
                }
            })
        })
    },
    created(){
        this._getDisc(6941426668)
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
