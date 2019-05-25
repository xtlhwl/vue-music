# vue-music

### 音乐播放器
>立个flag，2019年四月17日，五月底完成。

>API用的是qq音乐的

>有一些API需要跨域才能获取，需要在/build/webpack.dev.conf.js中进行代理配置

>5月25日:预计26日完成

>
***

## 目录结构

<pre>
.
├── README.md 
├── build
│   ├── build.js  
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html
├── package-lock.json
├── package.json
├── src
│   ├── App.vue
│   ├── api         //api目录
│   │   ├── config.js
│   │   ├── rank.js
│   │   ├── recommend.js
│   │   ├── singer.js  //歌手api
│   │   └── song.js
│   ├── assets
│   │   └── logo.png
│   ├── base     //基本组件
│   │   ├── listview
│   │   │   └── listview.vue
│   │   ├── loading
│   │   │   ├── loading.gif
│   │   │   └── loading.vue
│   │   ├── scroll
│   │   │   └── scroll.vue
│   │   ├── slider
│   │   │   └── slider.vue
│   │   └── song-list
│   │       ├── first@2x.png
│   │       ├── first@3x.png
│   │       ├── second@2x.png
│   │       ├── second@3x.png
│   │       ├── song-list.vue
│   │       ├── third@2x.png
│   │       └── third@3x.png
│   ├── common
│   │   ├── fonts
│   │   │   ├── music-icon.eot
│   │   │   ├── music-icon.svg
│   │   │   ├── music-icon.ttf
│   │   │   └── music-icon.woff
│   │   ├── image
│   │   │   ├── default.png
|   |   |
│   │   ├── js
│   │   │   ├── config.js
│   │   │   ├── dom.js
│   │   │   ├── jsonp.js
│   │   │   ├── singer.js
│   │   │   └── song.js
│   │   └── stylus
│   │       ├── base.styl
│   │       ├── icon.styl
│   │       ├── index.styl
│   │       ├── mixin.styl
│   │       ├── reset.styl
│   │       └── variable.styl
│   ├── components
│   │   ├── disc
│   │   │   └── disc.vue
│   │   ├── m-header
│   │   │   ├── logo@2x.png
│   │   │   ├── logo@3x.png
│   │   │   └── m-header.vue
│   │   ├── music-list
│   │   │   └── music-list.vue
│   │   ├── player
│   │   │   └── player.vue
│   │   ├── rank
│   │   │   └── rank.vue
│   │   ├── recommend
│   │   │   └── recommend.vue
│   │   ├── search
│   │   │   └── search.vue
│   │   ├── singer
│   │   │   └── singer.vue
│   │   ├── singer-detail
│   │   │   └── singer-detail.vue
│   │   ├── tab
│   │   │   └── tab.vue
│   │   └── top-list
│   │       └── top-list.vue
│   ├── js
│   │   └── jsonp.js
│   ├── main.js
│   ├── router
│   │   └── index.js
│   └── store
│       ├── actions.js
│       ├── getters.js
│       ├── index.js
│       ├── mutation-types.js
│       ├── mutations.js
│       └── state.js
├── static
└── tree.text

32 directories, 79 files
</pre>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```
### 已经实现功能
- [x] 首页轮播图
- [x] 竖直滚动
- [x] 排行榜
- [x] 歌手页
- [x] loading
- [x] 播放页面
### 尚未实现功能
- [ ] 播放器播放功能
- [ ] 进度条
- [ ] 下一曲
- [ ] 歌词
- [ ] 评论
- [ ] 歌手首字母跳转

