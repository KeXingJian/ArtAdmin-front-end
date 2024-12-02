<template>
  <BackgroundPage>
    <div class="main_wrapper">
      <div v-if="isCollection" class="form animate__animated animate__backInDown">
        <div class="container-form">
          <div class="card-form">
            <div class="p">
              <div class="card-introduce-form">
                <header class="card-header-form">
                  <span class="title">COLLECTION</span>
                  <p>
                    <select class="artist" v-model="addVideo.collections[0].id">
                      <option v-for="collection in collectionSelect.collections" :key="collection.id" :value="collection.id">{{
                          collection.name
                        }}
                      </option>
                    </select>
                  </p>
                </header>
                <div class="card checkout">
                  <div class="footer-checkout">
                    <button class="checkout-btn to-Checkout" @click="addVideoToCollection">Checkout</button>
                    <button class="checkout-btn close" @click="close">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="card-head">
          <div class="fanhui">
            <p  class="time-text">
              <i @click="back" class="iconfont icon-fanhui">
              </i>
              <span @click="back">返回</span>
            </p>
          </div>
        </div>
        <div class="tv">
          <div class="display_div">
            <video class="screen" ref="videoPlayer" controls @progress="onProgress">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="buttons_div">
            <div class="card">
              <div class="p">
                <div class="card-video" :class="{ 'highlight': video.isCurrent }" v-for="video in this.playVideos.videos" :key="video.uuid" @click="changeVideo(video)">
                    <img class="card_form" :src="'http://localhost:8080/video/image/3/'+video.picture.path" :alt="video.uuid">
                  <div class="card_data">
                    <div class="card_data-div">
                      <div class="cube text_s">
                        <label class="side top">UUID</label>
                      </div>
                      <label class="text_d"
                      >{{ video.uuid }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p">

                <div class="card-introduce">
                  <header class="card-header">
                    <span class="title">UUID</span>
                    <p>{{ this.playVideos.currentVideo.uuid }}</p>
                    <span class="title">desc</span>
                    <p>{{ this.playVideos.currentVideo.description }}</p>
                  </header>
                  <div class="card-author">
                    <div class="author-name">
                      <div class="author-name-prefix">Author</div>
                      {{ this.playVideos.currentVideo.artist.name }}
                    </div>
                  </div>
                  <div class="tags">
                  </div>
                  <div class="container" @click.prevent="isCollection=true">
                    <div class="a">
                      <div class="b" style="--i:-30">LIKE</div>
                      <div class="c" style="--i:30">LIKE</div>
                      <a href="#" class="d" @click.prevent="isCollection=true">收藏</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </BackgroundPage>


</template>

<script>
import BackgroundPage from "@/components/contentPage/content/BackgroundPage.vue";
import {addVideoToCollection, getCollectionSelect, playUserVideo} from "@/api";
import {getAccount} from "@/utils";

export default {
  name: "VideoPlayPage",
  components: {BackgroundPage},
  data() {
    return {
      showList: false,
      isCollection:false,

      playVideos:null,
      collectionSelect:null,

      addVideo:{
        account:null,
        collections:[{
          id:null,
          videos:[{
            uuid:null
          }]
        }]
      }
    }
  },
  methods:{
    close(){
      this.isCollection=false;
      this.addVideo={
        account:null,
        collections:[{
          id:null,
          videos:[{
            uuid:null
          }]
        }]
      }
    },
    back(){
      this.$router.go(-1);
    },
    async getCollections() {
      const response = await getCollectionSelect(getAccount(localStorage.getItem('token')));
      this.collectionSelect=response.data;
      console.log(this.collectionSelect);
    },
    async addVideoToCollection() {
      if (this.addVideo.collections[0].id === null) {
        alert("请选择收藏夹")
        return;
      }
      this.addVideo.account = getAccount(localStorage.getItem('token'));
      this.addVideo.collections[0].videos[0].uuid = this.playVideos.currentVideo.uuid;
      console.log(this.addVideo);

      const response = await addVideoToCollection(this.addVideo);
      if (response) {
        alert(response.data);
      }
      this.close();
    },


    updateVideo(){
      this.playVideos = this.$route.params.param1;
      if (this.playVideos==null){
        alert('页面已过期');
        this.$router.go(-1);
      }
    },
    async loadVideo() {
      if (this.playVideos == null) {
        return;
      }
      const response = await playUserVideo(this.playVideos.currentVideo.artist.name + '$' + this.playVideos.currentVideo.uuid);
      const videoUrl = URL.createObjectURL(response.data);
      this.$refs.videoPlayer.src = videoUrl;

    },
    preloadNextVideo() {
      if (this.playVideos && this.playVideos.videos.length > 0) {
        const currentIndex = this.playVideos.videos.findIndex(video => video.isCurrent);
        let nextIndex = (currentIndex + 1) % this.playVideos.videos.length;
        const nextVideo = this.playVideos.videos[nextIndex];

        if (nextVideo) {
          playUserVideo(nextVideo.artist.name + '$' + nextVideo.uuid).then(response => {
            nextVideo.preloadedSrc = URL.createObjectURL(response.data);
          });
        }
      }
    },
    changeVideo(video) {

      if (this.playVideos == null) {
        return;
      }

      this.playVideos.videos.forEach(v => v.isCurrent = false);

      video.isCurrent = true;
      this.playVideos.currentVideo = video;

      if (video.preloadedSrc) {
        this.$refs.videoPlayer.src = video.preloadedSrc;
        this.$nextTick(() => {
          this.$refs.videoPlayer.play().catch(error => {
            console.error('Error attempting to play preloaded video:', error);
          });
        });
      } else {

        this.loadVideo();

        this.$refs.videoPlayer.addEventListener('canplay', () => {
          this.$refs.videoPlayer.play().catch(error => {
            console.error('Error attempting to play video on canplay:', error);
          });
        });

        this.$refs.videoPlayer.removeEventListener('canplay', () => {});
      }

      // 预加载下一个视频
      this.preloadNextVideo();
    },

    onProgress(event) {
      console.log('Buffered:', event.target.buffered);

    },
  },
  created() {
    this.updateVideo();
    this.loadVideo();
    this.getCollections();
    this.preloadNextVideo(); // 调用预加载下一个视频
  },
  watch: {
    '$route.params': 'updateVideo',
    handler: function() {
      this.updateVideo();
      this.loadVideo();
      this.preloadNextVideo(); // 调用预加载下一个视频
    },
    immediate: true,
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.main_wrapper {
  border-radius: 10px;
  background-image: linear-gradient(
      to bottom right,
      rgba(145, 222, 254, 0.8),
      rgba(153, 192, 249, 0.8),
      rgba(189, 182, 236, 0.8),
      rgba(215, 179, 227, 0.8),
      rgba(239, 179, 213, 0.8),
      rgba(249, 188, 204, 0.8)
  );
  width: 90%;
  min-width: 1538px;
  height: 100vh;
  margin-left: 88px;
}
.main {
  width: 100%;
  height: 100vh;
}
.tv {
  width: 100%;
  height: 80%;
  border-radius: 0 0 15px 15px;
  background-color: #d36604;
  display: flex;
  border: 2px solid #1d0e01;
  box-shadow: inset 0.2em 0.2em #e69635;
}
.display_div {
  border-radius: 15px;
  box-shadow: 3.5px 3.5px 0 #e69635;
  width: 75%;
  height: 99%;
}
.screen {
  width: 100%;
  height: 100%;;
  border: 2px solid #1d0e01;
  background-blend-mode: difference;
  animation: b 0.2s infinite alternate;
  border-radius: 10px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  letter-spacing: 0.15em;
  text-align: center;
}
@keyframes b {
  100% {
    background-position: 50% 0, 60% 50%;
  }
}
.buttons_div {
  width: 25%;
  align-self: center;
  height: 99%;
  margin-left: 5px;
  background-color: #e69635;
  border: 2px solid #1d0e01;
  padding: 0.6em;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 0.75em;
  box-shadow: 3px 3px 0 #e69635;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #212121;
  display: flex;
  gap: 5px;
  padding: .4em;
}
.card .p {
  height: 100%;
  flex: 1;
  cursor: pointer;
  border-radius: 2px;
  transition: all .5s;
  background: #212121;
  border: 1px solid #ff5a91;
  overflow: auto;
}
.card .p::-webkit-scrollbar {
  display: none;
}
.card .p:hover {
  flex: 8;
}
.card-video {
  width: 297px;
  height: 100px;
  background-color: #242824;
  padding: 10px;
  border-radius: 6px;
  gap: 0.5rem;
}
.card_data-div{
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  display: inline-block;
}
.card_form {
  float: left;
  position: relative;
  width: 43%;
  min-height: 5em;
  border-radius: 4px;
  background-color: #9147ff;
  transition: 0.2s ease-in-out;
  overflow: hidden;
}
.card_data {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card_data span {
  color: #9147ff;
  margin-top: auto;
  font-size: 0.9em;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.card_data span:hover {
  color: #28aea5;
  text-decoration: underline;
}
.text_s {
  color: #9147ff;
  font-size: 0.6em;
}
.text_d {
  font-size: 5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;


}
.cube {
  width: max-content;
  height: 10px;
  transition: all 0.2s;
  transform-style: preserve-3d;
}
.card:hover .cube {
  transform: rotateX(90deg);
}
.side {
  width: max-content;
  height: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
}
.top {
  transform: rotateX(-90deg) translate3d(0, 0, 0em);
}

.card-introduce {
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1rem;
  border-radius: 16px;
  background: #17141d;
  box-shadow: -1rem 0 3rem #00000067;
  transition: .2s;
  font-family: 'Inter', sans-serif;
}
.card-introduce:hover {
  transform: translateY(-0.4rem);
}
.card-video{
  background: #17141d;
  color: #e52e71;
}

.card-author {
  position: relative;
  display: grid;
  grid-template-columns: 75px 1fr;
  align-items: center;

}
.author-name {
  color: #7a7a8c;
}
.author-name-prefix {
  color: #e52e71;
  font-weight: 600;
}
.author-avatar span {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f2f2f2;
  margin: 16px 10px;
}

.card-header {

  color: #7a7a8c;
}
.card-header p {
  font-size: 14px;
  margin: 0 0 1rem;
  color: #7a7a8c;
}
.card-header .title {
  color: #e52e71;
  font-size: 25px;
  cursor: pointer;
  font-family: 'Arial Black', sans-serif;
}
.card-header .title:hover {
  background: linear-gradient(90deg,#ff8a00,#e52e71);
  text-shadow: none;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tags {

  padding: .5rem 0 1rem;
  line-height: 2;
  margin-bottom: 0;
}
.tags a {
  font-style: normal;
  font-weight: 700;
  color: #7a7a8c;
  text-transform: uppercase;
  font-size: .66rem;
  border: 3px solid #28242f;
  border-radius: 2rem;
  padding: .2rem .85rem .25rem;
  position: relative;
}
.tags a:hover {
  background: linear-gradient(90deg,#ff8a00,#e52e71);
  text-shadow: none;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  background-clip: text;
  border-color: white;
}
.container{
  display: flex;
  justify-content: center;
}
.a{
  position: relative;
  width: 300px;
  display: flex;
  justify-content: center;
  margin: 0 30px;
}
.c,.b{
  font: 900 100px '';
  line-height: 150px;
  position: absolute;
  color: brown;
  top: 0;
  transition: .4s;
}
.c{

  clip-path: inset(49% 0 0 0);
}
.b{

  clip-path: inset(1% 0 50% 0);
}
.a:hover .b,.a:hover .c{

  top: calc(var(--i)*1px);
}
.a:hover .d{
  opacity: 1;
}
.d{
  text-decoration: none;
  color: cyan;
  font: 600 20px '';
  line-height: 150px;
  opacity: 0;
  transition: .3s;
}

.form {
  position: absolute;
  margin-left: 37%;
  z-index: 999;
  margin-top: 20%;

}
.container-form {
  margin-left: 4%;
  display: grid;
  grid-template-columns: auto;
  width: 259px;
  max-height: 600px;
  gap: 0px;
  overflow: auto;
}
.container-form::-webkit-scrollbar {
  display: none;
}
.card-form {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #212121;
  gap: 5px;
  padding: .4em;
}
.card-form .p {
  height: 100%;
  flex: 1;
  cursor: pointer;
  border-radius: 2px;
  transition: all .5s;
  background: #17141D;
  border: 1px solid #ff5a91;
  overflow: auto;
}
.card-form .p::-webkit-scrollbar {
  display: none;
}
.card-form .p:hover {
  flex: 8;
}
.card_data span {
  color: #9147ff;
  margin-top: auto;
  font-size: 0.9em;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.card_data span:hover {
  color: #28aea5;
  text-decoration: underline;
}
.card-introduce-form {
  display: flex;
  position: relative;
  flex-direction: column;
  height: auto;
  width: 100%;
  padding: 1rem;
  border-radius: 16px;
  background: #17141d;
  box-shadow: -1rem 0 3rem #00000067;
  transition: .2s;
  font-family: 'Inter', sans-serif;
}
.card-header-form {
  color: #7a7a8c;
}
.card-header-form p {
  font-size: 22px;
  margin: 0 0 1rem;
  color: #7a7a8c;
}
.card-header-form .title {
  font-size: 25px;
  margin: .25rem 0 auto;
  cursor: pointer;
  font-family: 'Arial Black', sans-serif;
}
.card-header-form .title:hover {
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  text-shadow: none;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header svg {
  height: 100px;
}
.header p {
  text-align: center;
  color: black;
}
.close {
  background: #E74D4D !important;
  margin-left: 60px;
}
.to-Checkout {
  background: green !important;
}
.footer-checkout{
  display: flex;
}

.footer-checkout button {
  width: 70px;
  height: 40px;
}

.artist {
  width: 100px;
  background: #ffffff;
  height: 27px;
}
.artist option{
  width: 100px;
  height: 20px;
}
.card-head {
  width: 100%;
  height: 100px;
  background: rgb(17, 4, 134);
  border-radius: 15px 15px 0 0 ;
  box-shadow: rgb(0,0,0,0.7) 5px 10px 50px ,rgb(0,0,0,0.7) -5px 0px 250px;
  display: flex;
  color: white;
  justify-content: center;
  position: relative;
  flex-direction: column;
  background: linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85));
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}
.time-text {
  font-size: 40px;
  margin-top: 0px;
  margin-left: 15px;
  font-weight: 600;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.iconfont{
  font-size: 40px;
}
.card-video.highlight {
  border: 2px solid #ff5a91; /* 你可以选择你喜欢的颜色 */
  box-shadow: 0 0 10px rgba(255, 90, 145, 0.5); /* 添加阴影效果 */
  background-color: #333; /* 改变背景颜色 */
}
.card-video.highlight .card_data span {
  color: #ff5a91; /* 改变文字颜色 */
}
.card-video.highlight .card_form {
  border-color: #ff5a91; /* 改变图片边框颜色 */
}

</style>