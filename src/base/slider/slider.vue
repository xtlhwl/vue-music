<template >
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup" >
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex === index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from  'better-scroll'
    import {addClass} from 'common/js/dom'

    export default {
        data(){
            return {
              dots:[],
              currentPageIndex: 0  
            }
        },
        props:{
            loop:{  //是否是轮播图
                type: Boolean,
                default: true
            },
            autoPlay:{  //自动轮播开关
                type: Boolean,
                default: true
            },
            interval:{  //轮播定时器
                type: Number,
                default: 4000
            }
        },
        mounted() {  //初始化
            setTimeout(() => {
                this._setSliderWidth()
                this._initDots()
                this._initSlider()

                if(this.autoPlay){
                    this._play()
                }
                
            }, 20);

            //当页面宽度发生变化
            window.addEventListener('resize',()=>{
                if(!this.slider){
                    return
                }
                this._setSliderWidth(true)
                this.slider.refresh()
            })
        },
        methods:{
            _play() {
                let pageIndex  = this.currentPageIndex + 1
                if (this.loop) {  //如果他是轮播图，则再加1，因为我们在后面的轮播图加了两个图
                    pageIndex  +=1
                }
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex,0,400)   //去向的页面，位置x,y方向的值
                },this.interval)
            },

                //初始化slider的宽度
            _setSliderWidth(isResize) {   //设置轮播图的宽度
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
                if(this.loop && !isResize){
                    width += 2 *  sliderWidth   //这里分别加长了width，是因为better-scroll在this.children的基础上前面和后面重复再加了两个轮播图，为了可以无缝连接
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },

            //初始化slider 轮播器
            _initSlider() { 
                this.slider = new BScroll(this.$refs.slider,{
                    scrollX:true,
                    scrollY:false,
                    momentum:false,  // 惯性
                    snap:true,
                    snapLoop:this.loop, //循环
                    snapThreshold:0.3,
                    snapSpeed:400
                })
                //slider绑定事件，滚动完毕事件
                this.slider.on('scrollEnd',() => {
                    //Current 现在的
                    let pageIndex = this.slider.getCurrentPage().pageX  //获取当前页面栈的实例
                    if(this.loop){
                        pageIndex -= 1
                    }
                    this.currentPageIndex = pageIndex

                    //清除定时器轮播图滚动，之后再执行轮播器自动滚动
                    if(this.autoPlay){
                        clearTimeout(this.timer)
                        this._play()
                    }

                })
            },

            //初始化点
            _initDots(){
                // console.log(this.children,"长度")
                this.dots = new Array(this.children.length)
            },
        },
        //销毁
       destroyed() {
            clearTimeout(this.timer)
        },

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
        width: 6px
        height: 6px
        border-radius: 50%
        background: $color-text-ll
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll

</style>
