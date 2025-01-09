<template>
  <BackgroundPage>
    <div class="content">
     <div class="header">
       <div class="header-card">
        <div class="font">典藏区</div>
       </div>
     </div>
      <div @click="toCollection(collection.videos)" class="main" v-for="(collection,index) in collections" :key="index">
        <div class="card" :style="{ backgroundImage: 'url(' + getImageUrl(collection.picture.path) + ')' } ">
          <div class="fl">
          </div>
          <div class="card_content">
            <button>Entry!</button>
          </div>
        </div >
        <div class="data">
          <div class="img">
            <svg viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g stroke-linecap="butt" fill="none" stroke-width="2.00">
                <path d="M 14.06 0.00
        Q 13.33 4.09 13.93 7.52
        A 1.04 1.02 -78.7 0 0 14.37 8.19
        L 32.87 20.19" stroke="#59afb1"></path>
                <path d="M 32.87 20.19
        L 42.25 26.79" stroke="#4fa6a8"></path>
                <path d="M 42.25 26.79
        C 41.40 28.26 24.14 34.92 21.32 36.20" stroke="#69cbc0"></path>
                <path d="M 21.32 36.20
        Q 15.81 38.21 11.00 41.21" stroke="#6fcdbb"></path>
                <path d="M 11.00 41.21
        L 9.75 40.96" stroke="#5ec8ab"></path>
                <path d="M 9.75 40.96
        Q 5.99 37.71 1.71 35.19
        A 1.00 1.00 0.0 0 0 0.22 35.85
        L 0.00 36.94" stroke="#5cae9e"></path>
                <path d="M 79.95 6.12
        L 62.46 11.32" stroke="#3190a6"></path>
                <path d="M 62.46 11.32
        Q 47.42 14.67 32.87 20.19" stroke="#3a96a3"></path>
                <path d="M 80.00 11.06
        L 64.50 17.46" stroke="#22a3be"></path>
                <path d="M 64.50 17.46
        L 62.46 11.32" stroke="#28879d"></path>
                <path d="M 64.50 17.46
        L 43.00 26.96" stroke="#2ba9bb"></path>
                <path d="M 43.00 26.96
        L 42.25 26.79" stroke="#4ab2b2"></path>
                <path d="M 80.00 52.31
        Q 71.64 45.91 62.46 40.67" stroke="#45ced3"></path>
                <path d="M 62.46 40.67
        Q 62.43 36.88 58.50 36.79" stroke="#13636e"></path>
                <path d="M 58.50 36.79
        Q 50.07 32.95 43.00 26.96" stroke="#45ced3"></path>
                <path d="M 58.50 36.79
        Q 55.85 40.04 56.86 44.07
        C 57.53 46.71 60.02 47.68 61.77 45.19
        Q 61.91 44.99 61.94 44.74
        L 62.46 40.67" stroke="#326b65"></path>
                <path d="M 40.81 79.86
        Q 46.22 74.94 52.34 70.94
        A 1.00 1.00 0.0 0 0 52.39 69.30
        Q 44.74 63.65 43.10 62.62
        Q 34.11 56.98 32.50 55.79" stroke="#59d4b5"></path>
                <path d="M 32.50 55.79
        C 36.74 55.42 30.64 48.79 29.79 47.81
        C 27.54 45.21 26.34 42.09 24.05 39.44
        Q 22.66 37.82 21.32 36.20" stroke="#6ad8c5"></path>
                <path d="M 48.75 39.07
        A 2.30 2.30 0.0 0 0 46.45 36.77
        L 46.05 36.77
        A 2.30 2.30 0.0 0 0 43.75 39.07
        L 43.75 44.21
        A 2.30 2.30 0.0 0 0 46.05 46.51
        L 46.45 46.51
        A 2.30 2.30 0.0 0 0 48.75 44.21
        L 48.75 39.07" stroke="#326b65"></path>
                <path d="M 58.63 54.41
        C 54.90 57.18 50.72 56.87 46.91 54.39
        A 1.00 0.99 51.9 0 0 46.04 54.28
        C 42.37 55.52 43.88 58.13 46.28 59.41
        Q 53.38 63.20 60.15 58.94
        C 62.54 57.43 62.47 54.80 59.41 54.23
        A 1.00 1.00 0.0 0 0 58.63 54.41" stroke="#326b65"></path>
                <path d="M 9.75 40.96
        Q 5.15 43.50 0.05 44.46" stroke="#4bb793"></path>
                <path d="M 32.50 55.79
        L 11.00 41.21" stroke="#5fd6b0"></path>
                <path d="M 11.19 80.00
        Q 12.51 79.61 11.57 78.67
        Q 5.99 73.11 1.70 65.70
        C 1.28 64.97 0.74 64.76 0.00 65.19" stroke="#48d08e"></path>
              </g>
              <path d="M 0.00 0.00
        L 14.06 0.00
        Q 13.33 4.09 13.93 7.52
        A 1.04 1.02 -78.7 0 0 14.37 8.19
        L 32.87 20.19
        L 42.25 26.79
        C 41.40 28.26 24.14 34.92 21.32 36.20
        Q 15.81 38.21 11.00 41.21
        L 9.75 40.96
        Q 5.99 37.71 1.71 35.19
        A 1.00 1.00 0.0 0 0 0.22 35.85
        L 0.00 36.94
        L 0.00 0.00
        Z" fill="#6ebfb6"></path>
              <path d="M 14.06 0.00
        L 80.00 0.00
        L 79.95 6.12
        L 62.46 11.32
        Q 47.42 14.67 32.87 20.19
        L 14.37 8.19
        A 1.04 1.02 -78.7 0 1 13.93 7.52
        Q 13.33 4.09 14.06 0.00
        Z" fill="#439eac"></path>
              <path d="M 79.95 6.12
        L 80.00 11.06
        L 64.50 17.46
        L 62.46 11.32
        L 79.95 6.12
        Z" fill="#1f81a0"></path>
              <path d="M 62.46 11.32
        L 64.50 17.46
        L 43.00 26.96
        L 42.25 26.79
        L 32.87 20.19
        Q 47.42 14.67 62.46 11.32
        Z" fill="#308d99"></path>
              <path d="M 80.00 11.06
        L 80.00 52.31
        Q 71.64 45.91 62.46 40.67
        Q 62.43 36.88 58.50 36.79
        Q 50.07 32.95 43.00 26.96
        L 64.50 17.46
        L 80.00 11.06
        Z" fill="#25c5dc"></path>
              <path d="M 42.25 26.79
        L 43.00 26.96
        Q 50.07 32.95 58.50 36.79
        Q 55.85 40.04 56.86 44.07
        C 57.53 46.71 60.02 47.68 61.77 45.19
        Q 61.91 44.99 61.94 44.74
        L 62.46 40.67
        Q 71.64 45.91 80.00 52.31
        L 80.00 80.00
        L 40.81 79.86
        Q 46.22 74.94 52.34 70.94
        A 1.00 1.00 0.0 0 0 52.39 69.30
        Q 44.74 63.65 43.10 62.62
        Q 34.11 56.98 32.50 55.79
        C 36.74 55.42 30.64 48.79 29.79 47.81
        C 27.54 45.21 26.34 42.09 24.05 39.44
        Q 22.66 37.82 21.32 36.20
        C 24.14 34.92 41.40 28.26 42.25 26.79
        Z
        M 48.75 39.07
        A 2.30 2.30 0.0 0 0 46.45 36.77
        L 46.05 36.77
        A 2.30 2.30 0.0 0 0 43.75 39.07
        L 43.75 44.21
        A 2.30 2.30 0.0 0 0 46.05 46.51
        L 46.45 46.51
        A 2.30 2.30 0.0 0 0 48.75 44.21
        L 48.75 39.07
        Z
        M 58.63 54.41
        C 54.90 57.18 50.72 56.87 46.91 54.39
        A 1.00 0.99 51.9 0 0 46.04 54.28
        C 42.37 55.52 43.88 58.13 46.28 59.41
        Q 53.38 63.20 60.15 58.94
        C 62.54 57.43 62.47 54.80 59.41 54.23
        A 1.00 1.00 0.0 0 0 58.63 54.41
        Z" fill="#64d6ca"></path>
              <path d="M 9.75 40.96
        Q 5.15 43.50 0.05 44.46
        L 0.00 36.94
        L 0.22 35.85
        A 1.00 1.00 0.0 0 1 1.71 35.19
        Q 5.99 37.71 9.75 40.96
        Z" fill="#499c85"></path>
              <path d="M 21.32 36.20
        Q 22.66 37.82 24.05 39.44
        C 26.34 42.09 27.54 45.21 29.79 47.81
        C 30.64 48.79 36.74 55.42 32.50 55.79
        L 11.00 41.21
        Q 15.81 38.21 21.32 36.20
        Z" fill="#70dac0"></path>
              <rect rx="2.30" height="9.74" width="5.00" y="36.77" x="43.75" fill="#000000"></rect>
              <path d="M 58.50 36.79
        Q 62.43 36.88 62.46 40.67
        L 61.94 44.74
        Q 61.91 44.99 61.77 45.19
        C 60.02 47.68 57.53 46.71 56.86 44.07
        Q 55.85 40.04 58.50 36.79
        Z" fill="#000000"></path>
              <path d="M 9.75 40.96
        L 11.00 41.21
        L 32.50 55.79
        Q 34.11 56.98 43.10 62.62
        Q 44.74 63.65 52.39 69.30
        A 1.00 1.00 0.0 0 1 52.34 70.94
        Q 46.22 74.94 40.81 79.86
        L 11.19 80.00
        Q 12.51 79.61 11.57 78.67
        Q 5.99 73.11 1.70 65.70
        C 1.28 64.97 0.74 64.76 0.00 65.19
        L 0.05 44.46
        Q 5.15 43.50 9.75 40.96
        Z" fill="#4dd1a0"></path>
              <path d="M 46.91 54.39
        C 50.72 56.87 54.90 57.18 58.63 54.41
        A 1.00 1.00 0.0 0 1 59.41 54.23
        C 62.47 54.80 62.54 57.43 60.15 58.94
        Q 53.38 63.20 46.28 59.41
        C 43.88 58.13 42.37 55.52 46.04 54.28
        A 1.00 0.99 51.9 0 1 46.91 54.39
        Z" fill="#000000"></path>
              <path d="M 11.19 80.00
        L 0.00 80.00
        L 0.00 65.19
        C 0.74 64.76 1.28 64.97 1.70 65.70
        Q 5.99 73.11 11.57 78.67
        Q 12.51 79.61 11.19 80.00
        Z" fill="#43ce7c"></path>
            </svg>
          </div>
          <div class="text">
            <div class="text_m">{{collection.name}}</div>
            <div class="text_s">kxj</div>
          </div>
        </div>
      </div>

    </div>
  </BackgroundPage>
</template>

<script>
import BackgroundPage from "@/components/contentPage/content/BackgroundPage.vue";
import {getPublicCollection} from "@/api";
import {getURL} from "@/utils";

export default {
  name: "ArtDictionary",
  components: {BackgroundPage},
  data(){
    return {
     collections:null,
      videos:null
    }
  },
  methods:{
    getImageUrl(uuid) {
      return getURL()+`video/image/3/${uuid}`;
    },
    toCollection(videos) {
      if (videos.length === 0){
        alert('未收录作品')
        return;
      }
      this.videos = videos.map(video => ({
        ...video, // 拷贝原有的属性
        isCurrent: false // 添加新的 isCurrent 属性
      }));
      this.videos[0].isCurrent = true;
      const playVideos = {
        currentVideo: this.videos[0],
        videos: this.videos
      }
      this.$router.push({
        name:"VideoPlayPage",
        params:{
          param1: playVideos
        }
      })
    }
  },
  async mounted() {
    const response = await getPublicCollection()
    this.collections = response.data
  }
}
</script>
<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content {

  border-radius: 10px;
  margin-left: 88px;
  height: 100vh;
  width: 90%;
  background-image: var(--shell-color-low);
}

.main{
  margin: 30px;
  float: left;
}

.header-card {

  justify-content: center;
  align-items: center;
  float: left;
  width: 100%;
  height: 150px;
  background: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 15px 15px 30px #bebebe,
  -15px -15px 30px #ffffff;
  transition: 0.2s ease-in-out;
  background: var(--shell-color-high);
}
.font{
  margin-top: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 35px;
}
.card {
  width: 15em;
  height: 10em;
  background-size: cover;
  -webkit-animation: AnimationName 3s ease infinite;
  -moz-animation: AnimationName 3s ease infinite;
  animation: AnimationName 3s ease infinite;
  transition: .4s ease-in-out;
  border-radius: 7px;
  cursor: pointer;
}

.fl {
  height: 50px;
}



.data {
  display: flex;
  flex-direction: row;
  margin-top: 1em;
}

.img {
  width: 2.25em;
  height: 2.25em;
  background-color: #252525;
  border-radius: 5px;
  overflow: hidden;
}

.text {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 0.5em;
  font-family: Montserrat;
  color: white;
}

.text_m {
  font-weight: bold;
  font-size: 0.9em;
}

.text_s {
  font-size: 0.7em;
}

.card_content {
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  padding: 0.8em;
  width: 14em;
  border-radius: 10px;
  font-family: Montserrat;
  font-size: 0.8em;
  align-self: center;
  outline: none;
  font-weight: bold;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  transition: .4s ease-in-out;
}

button::after {
  content: "(Hold Me)";
  opacity: 0;
  position: absolute;
}

button::before {
  content: "∞";
  font-size: 3.5em;
  position: absolute;
  opacity: 0;
  left: 1.6em;
  top: -0.36em;
  transition: .4s ease-in-out;
}

button:hover {
  cursor: pointer;
  color: black;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

button:hover::after {
  position: relative;
  opacity: 1;
  font-size: 0.7em;
}

@keyframes AnimationName {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0% 50%
  }
}

button:active {
  scale: 1.1;
  opacity: 1;
  color: transparent;
  background: linear-gradient(90deg, #ce68d9, #45c6db, #45db79, #9f45b0, #e54ed0, #ffe4f2);
  background-size: 800% 800%;
  -webkit-animation: AnimationName 1s ease infinite;
  -moz-animation: AnimationName 1s ease infinite;
  animation: AnimationName 1s ease infinite;
}

button:active::before {
  color: white;
  opacity: 1;
}
</style>