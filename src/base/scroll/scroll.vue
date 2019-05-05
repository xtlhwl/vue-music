<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    props:{
        //类型：Number
//  默认值：0
//可选值：1、2、3
// 作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间  后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事  件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实  时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。 
        probeType:{
            type:Number,
            default:1
        },
        click:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            default:null
        }
    },
    mounted(){
        setTimeout(() =>{
            this._initScroll()
        },20)
    },
    methods:{
        _initScroll(){
            if(!this.$refs.wrapper){
                return 
            }
            //把叫wrapper的ref传入，创建一个新的滚动
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                click: this.click, 
            })
            // console.log(this.scroll,'你好')
        },
        enable(){
            this.scroll && this.scroll.enable()
        },
        disable(){
            this.scroll && this.scroll.disable()
        },
        //刷新scroll，重新计算他的高度
        refresh(){
            this.scroll && this.scroll.refresh()
        }
    },
    watch:{
        //当数据发生改变的时候，scroll会refresh更新一下
        data(){
            setTimeout(() =>{
                this.refresh()
            },20)
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>

