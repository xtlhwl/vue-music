<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from  'better-scroll'
    import {addClass} from 'common/js/dom'

    export default {
        data(){
            return {
                
            }
        },
        props:{
            loop:{
                type: Boolean,
                default: true
            },
            autoPlay:{
                type: Boolean,
                default: true
            },
            interval:{
                type: Number,
                default: 4000
            }
        },
        mounted() {
            setTimeout(() => {
                this._setSliderWidth()
                this._initSlider()
            }, 20);
        },
        methods:{
                //初始化slider的宽度
            _setSliderWidth(){
                //获取slider,也就是轮播图的for循环div子容器
                this.children = this.$refs.sliderGroup.children 

                let width = 0
                //获取slider宽度
                let sliderWidth = this.$refs.slider.clientWidth
                const childernLength = this.children.length
                console.log('轮播图数量为:'+childernLength)
                for(let i=0; i< this.children.length; i++){
                    
                    let child = this.children[i]
                    addClass(child,'slider-item')  //将样式分别加入每个轮播图
                   
                    child.style.width = sliderWidth + 'px'  //令单个轮播图的宽度等于slider的宽度
                    width += sliderWidth  //轮播图的总长度，各个轮播图长度相加
                }
                if(this.loop){
                    width += 2 *  sliderWidth   //这里分别加长了width，是因为better-scroll在this.children的基础上前面和后面重复再加了两个轮播图，为了可以无缝连接
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            //初始化slider
            _initSlider(){ 
                this.slider = new BScroll(this.$refs.slider,{
                    scrollX:true,
                    scrollY:false,
                    momentum:false,
                    snap:true,
                    snapLoop:this.loop,
                    snapThreshold:0.3,
                    snapSpeed:400,
                    click:true
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    .slider
     min-height: 1px
     .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
     .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll

</style>
