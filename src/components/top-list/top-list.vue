<template>
    <transition name="slide">
        <music-list :bg-image="imageurl" :title="title"></music-list>
    </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
export default {
    components:{
        MusicList,
    },
    data(){
        return{
            
        }
    },
    methods(){
        
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
    }
}
</script>
<style lang="stylus" scoped>
    .slide-enter-active,.slide-leave-active
        transition: all 0.3s ease 
    .slide-enter, .slide-leave-to
        transform: translate3d(100%,0,0)

</style>
