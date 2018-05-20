<template>
  <div>
    <h1>{{ msg }}</h1>
    <audio id="audioId"
           controls :src="currentUrl">
    </audio>

    <div>
        <input type="button" value="上一首" @click="beforeFn" />
        <input type="button" value="播放" @click="playFn" />
        <input type="button" value="暂停" @click="offFn" />
        <input type="button" value="下一首" @click="nextFn" />
    </div>

    <div>
        <img :class="ifPlay ? 'Rotation' : ''" :src="currentItem.img"/>
        <p>{{currentItem.name}}</p>
    </div>

    <div @click="showListFn">折叠</div>

    <transition name="list">
      <ul v-show="showList">
        <li v-for="(item,index) in musicList" @click="tagMusic(item)">
          <label><img :src="item.img"/></label>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'player',
  data () {
    return {
      msg: 'xx播放器',
      musicList:'',
      currentUrl:'',
      clickNum:1,
      showList:false,
      currentItem:{},
      ifPlay:false
    }
  },
  watch:{
    'clickNum':'playFn'
  },
  created(){
    this.getData();

  },
  methods:{
    getData(){
        axios.get('http://localhost:3698/musicList')
        .then((_data)=>{
          this.musicList=_data.data.music;
          this.currentItem=this.musicList[0];
        })
    },
    //播放按钮
    playFn () {
        let _audioId=document.getElementById("audioId");
        _audioId.setAttribute('src',this.musicList[this.clickNum].url)
        _audioId.play();
        this.ifPlay=true;
    },
    //暂停按钮
    offFn () {
         let _audioId=document.getElementById("audioId");
         _audioId.pause();
         this.ifPlay=false;
    },
    //切换音乐
    tagMusic(item){
        this.clickNum=item.id;
        this.currentUrl=item.url;
        this.currentItem=item;
    },
    //音乐列表折叠展示
    showListFn(){
        this.showList=!this.showList
    },
    //上一首
    beforeFn(){
        this.clickNum--;

        if(this.clickNum<0){
            this.clickNum=this.musicList.length-1
        }

    },
    //上一首
    nextFn(){
       this.clickNum++;

       if(this.clickNum>=this.musicList.length){
           this.clickNum=0
       }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img{
  width:100px;
  height:100px;
  border-radius:100%;
}
@-webkit-keyframes rotation{
from {-webkit-transform: rotate(0deg);}
to {-webkit-transform: rotate(360deg);}
}
.Rotation{
  -webkit-transform: rotate(360deg);
  animation: rotation 10s linear infinite paused;
  -moz-animation: rotation 10s linear infinite;
  -webkit-animation: rotation 10s linear infinite;
  -o-animation: rotation 10s linear infinite;
}
Rotation-runing{
  animation: rotation 10s linear infinite running;
}
.list-item {
  display: inline-block;
  margin-right: 20px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(10px);
}

</style>
