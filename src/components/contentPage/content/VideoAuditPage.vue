<template>
  <BackgroundPage>
    <div class="main_wrapper">

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
            <video class="screen" ref="videoPlayer" controls>
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="buttons_div">
            <div class="card">
              <div class="p">
                <div class="card-introduce">
                  <header class="card-header">
                    <span class="title">UUID</span>
                    <p>{{ videoEdit.uuid }}</p>
                    <span class="title">DESC</span>
                    <p><input class="desc" type="text" v-model="videoEdit.description"></p>
                    <span class="title">ARTIST</span>
                    <p>
                      <select class="artist" v-model="videoEdit.artist">
                        <option v-for="artist in artistSelect" :key="artist.id" :value="artist">{{
                            artist.name
                          }}
                        </option>
                      </select>
                    </p>
                    <div>
                      <span class="title">LABEL</span>
                    </div>

                    <div class="customCheckBoxHolder" v-for="parent in selectTree" :key="parent.id">
                      <span class="option-box"><p>{{ parent.description }}</p></span>
                      <div class="option-box" v-for="child in parent.childDictionaries" :key="child.id">
                        <input class="customCheckBoxInput" :id="child.id" type="checkbox"
                               v-model="videoEdit.dictionaries"
                               :value="child.id">
                        <label class="customCheckBoxWrapper" :for="child.id">
                          <div class="customCheckBox">
                            <div class="inner">{{ child.description }}</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </header>
                  <div class="container-cover">
                    <div class="header">
                      <div class="preview" v-if="selectedFile">
                        <img :src="previewImage" alt="Preview"/>
                      </div>
                      <svg v-if="!isSelected" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                              d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                              stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                      </svg>
                      <p>Browse File to upload!</p>
                    </div>
                    <label for="file" class="footer">
                      <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                          <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
                        </g>
                      </svg>
                      <p>{{ selectedFileName || 'Not selected file' }}</p>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                              d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                              stroke="#000000" stroke-width="2"></path>
                          <path d="M19.5 5H4.5" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                          <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                                stroke="#000000"
                                stroke-width="2"></path>
                        </g>
                      </svg>
                    </label>
                    <input id="file" type="file" accept="image/*" @change="onFileSelected">
                  </div>
                  <div class="container">
                    <div class="a" @click.prevent="changeStatus('WAIT_PUBLIC')">
                      <div class="b" style="--i:-30">YES</div>
                      <div class="c" style="--i:30">YES</div>
                      <a href="#" class="d" >通过</a>
                    </div>
                    <div class="a" @click.prevent="changeStatus('SCRAP')">
                      <div class="b" style="--i:-30">NO</div>
                      <div class="c" style="--i:30">NO</div>
                      <a href="#" class="d" >不通过</a>
                    </div>
                    <div class="a" @click.prevent="changeStatus('REPEAT')">
                      <div class="b" style="--i:-30">REP</div>
                      <div class="c" style="--i:30">REP</div>
                      <a href="#" class="d" >重复</a>
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
import {changeVideoStatus, editVideo, getAristSelect, getDictionaryTree, getTempPass} from "@/api";
import {getURL} from "@/utils";

export default {
  name: "VideoAuditPage",
  components: {BackgroundPage},
  data() {
    return {
      previewImage: null,
      selectedFile: null,
      selectedFileName: '',
      isSelected: false,
      value: -1,

      artistSelect: null,
      selectTree: null,
      videoEdit: {
        uuid: null,
        description: "",
        artist: {
          id: null,
          name:null
        },
        picture: {
          id: null,
          path: null,
          type: "COVER"
        },
        dictionaries: [],

      },

      url:getURL(),
      currentPass: null,
    };
  },
  computed: {
    currentVideoUrl() {
      return `${this.url}video/playVideo/${this.videoEdit?.uuid}/${this.currentPass}`;
    }
  },
  methods: {
    async toSelect() {
      const response = await getAristSelect();
      this.artistSelect = response.data;
    },
    async getTree() {
      const response = await getDictionaryTree();
      this.selectTree = response.data;
    },
    //用户上传校验
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = this.selectedFile ? this.selectedFile.name : '';
      const maxSize = 1000 * 1024; // 500KB
      if (this.selectedFile && this.selectedFile.size > maxSize) {
        alert('File size exceeds the maximum limit of 1000KB.');
        this.selectedFile = null;
        this.selectedFileName = '';
        return;
      }

      if (this.selectedFile) {
        this.isSelected = true;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }

    },

    changeStatus(status) {
      if (!this.videoEdit.artist.id) {
        alert('请选择艺术家');
        return
      }
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      // 将 dictionaries 转换为对象数组
      const dictionaries = this.videoEdit.dictionaries.map(id => ({id}));

      const videoEditDto = {
        ...this.videoEdit,
        dictionaries
      };
      formData.append('editVideo', JSON.stringify(videoEditDto));

      editVideo(formData);
      alert("编辑成功");


      // 构建 StatusVideoInput 对象
      const input = {
        uuid: this.videoEdit.uuid,
        status: status,
        artist: {
          name: this.videoEdit.artist.name
        },
        picture: {
          id: this.videoEdit.picture.id
        }
      };

      changeVideoStatus(input);

      this.$router.go(-1);

    },

    updateVideo() {
      const video = this.$route.params.param1;
      this.videoEdit.uuid = video.uuid;
      this.videoEdit.description = video.description;
      this.videoEdit.artist.id = video.artist ? video.artist.id : null;
      this.videoEdit.artist.name = video.artist ? video.artist.name : null;
      this.videoEdit.picture.path = video.picture ? video.picture.path : null;
      this.videoEdit.picture.id = video.picture ? video.picture.id : null;
      this.videoEdit.dictionaries = video.dictionaries ? video.dictionaries.map(d => d.id) : [];
    },

    back(){
      this.$router.go(-1);
    },

    loadVideo() {
      const videoPlayer = this.$refs.videoPlayer;
      videoPlayer.src = this.currentVideoUrl;
      videoPlayer.load();
    },

    async getPass() {
      const response = await getTempPass(this.videoEdit.uuid);
      if (response.data) {
        this.currentPass = response.data;
      }
    }

  },
  async created() {
    this.updateVideo();
    await this.getPass()
    this.loadVideo();
    await this.toSelect();
    await this.getTree()

    this.$nextTick(() => {
      this.$refs.videoPlayer.load(); // 强制重新加载新的视频源
      this.$refs.videoPlayer.play().catch(error => {
        console.error('Error attempting to play video:', error);
      });
    });
  },
  watch: {
    '$route.params': 'updateVideo',
    handler: function() {
      this.updateVideo();
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
  box-shadow: rgb(0,0,0,0.7) 5px 10px 50px ,rgb(0,0,0,0.7) -5px 0px 250px;
  border-radius: 10px;
  background-image: var(--shell-color-low);
  width: 90%;
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
  border-radius: 15px;
  display: flex;
  background: var(--tv-color);
}

.display_div {
  margin-top: 3px;
  padding: 5px;
  display: flex;
  border-radius: 15px;
  width: 75%;
  height: 99%;
  background: var(--tv-inner-color);
}


.screen {
  width: 100%;
  height: 100%;;
  background-blend-mode: difference;
  border-radius: 10px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  letter-spacing: 0.15em;
  text-align: center;
}


.buttons_div {
  width: 25%;
  align-self: center;
  height: 99%;
  margin-left: 5px;
  background: var(--tv-inner-color);
  padding: 5px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 0.75em;
  box-shadow: 3px 3px 0px #e69635;
}


.iconfont {
  position: absolute;
  margin-top: 60px;
  color: #3d405b;
  font-size: 30px;
  transition: .2s;
}

.iconfont:active {
  color: #FFF;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #212121;

  gap: 5px;
  padding: .4em;
}

.card .p {
  height: 100%;
  flex: 1;
  cursor: pointer;
  border-radius: 2px;
  transition: all .5s;
  background: #17141D;
  border: 1px solid #ff5a91;
  overflow: auto;
}

.card .p::-webkit-scrollbar {
  display: none;
}

.card .p:hover {
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

.card-introduce {
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

.card-header {
  color: #7a7a8c;
}

.card-header p {
  font-size: 14px;
  margin: 0 0 1rem;
  color: #7a7a8c;
}

.card-header .title {
  font-size: 25px;
  margin: .25rem 0 auto;
  cursor: pointer;
  font-family: 'Arial Black', sans-serif;
}

.card-header .title:hover {
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  text-shadow: none;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  text-shadow: none;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  background-clip: text;
  border-color: white;
}

.container {
  display: flex;
  justify-content: center;
}

.a {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 30px;

}

.c, .b {
  font: 900 50px '';
  line-height: 150px;
  position: absolute;
  color: brown;
  top: 0;
  transition: .4s;
}

.c {

  clip-path: inset(49% 0 0 0);
}

.b {

  clip-path: inset(1% 0 50% 0);
}

.a:hover .b, .a:hover .c {

  top: calc(var(--i) * 1px);
}

.a:hover .d {
  opacity: 1;
}

.d {
  text-decoration: none;
  color: cyan;
  font: 600 25px '';
  line-height: 150px;
  opacity: 0;
  transition: .3s;
}

.desc {
  background: #1B1F23;
  color: #FFFFFF;
}

.artist {
  width: 70px;
  background: #1B1F23;
}

.container-cover {
  margin-left: 10%;
  height: 300px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 5px;
  background-color: rgba(0, 110, 255, 0.041);
}

.header {
  flex: 1;
  width: 100%;
  border: 2px dashed royalblue;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.header svg {
  height: 100px;
}

.header p {
  text-align: center;
  color: black;
}

.footer {
  background-color: rgba(0, 110, 255, 0.075);
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: black;
  border: none;
}
.footer svg {
  height: 130%;
  fill: royalblue;
  background-color: rgba(70, 66, 66, 0.103);
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
}
.footer p {
  flex: 1;
  text-align: center;
}
#file {
  display: none;
}
.customCheckBoxHolder {
  margin: 5px;
  float: left;
}
.option-box {
  float: left;
}
.option-box p {
  font-size: 20px;
  margin-right: 10px;
  line-height: 33px;
}
.customCheckBox {
  float: left;
  width: fit-content;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  padding: 2px 8px;
  background-color: rgba(0, 0, 0, 0.16);
  border-radius: 0px;
  color: rgba(255, 255, 255, 0.7);
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 300ms;
  transition-property: color, background-color, box-shadow;
  height: 32px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px 1px 1px 0px;
  outline: none;
  min-width: 55px;
}
.customCheckBox:hover {
  background-color: #2c2c2c;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.23) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, rgba(0, 0, 0, 0.17) 0px 2px 4px 1px;
}
.customCheckBox .inner {
  font-size: 18px;
  font-weight: 900;
  pointer-events: none;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 300ms;
  transition-property: transform;
  transform: translateY(0px);
}
.customCheckBox:hover .inner {
  transform: translateY(-2px);
}
.customCheckBoxWrapper:first-of-type .customCheckBox {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-right: 0px;
}
.customCheckBoxWrapper:last-of-type .customCheckBox {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  border-left: 0px;
}
.customCheckBoxInput {
  display: none;
}
.customCheckBoxInput:checked + .customCheckBoxWrapper .customCheckBox {
  background-color: #2d6737;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.23) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, rgba(0, 0, 0, 0.17) 0px 2px 4px 1px;
}
.customCheckBoxInput:checked + .customCheckBoxWrapper .customCheckBox .inner {
  transform: translateY(-2px);
}
.customCheckBoxInput:checked + .customCheckBoxWrapper .customCheckBox:hover {
  background-color: #34723f;
  box-shadow: rgba(0, 0, 0, 0.26) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, rgba(0, 0, 0, 0.15) 0px 3px 6px 2px;
}
.customCheckBoxWrapper .customCheckBox:hover .inner {
  transform: translateY(-2px);
}
.preview {
  width: 100%;
  margin-top: 10px;
  text-align: center;
}
.preview img {
  width: 100%;
  border: 1px solid #ccc;
  padding: 5px;
}

.card-head {
  width: 100%;
  height: 100px;

  border-radius: 15px 15px 0 0 ;

  display: flex;
  color: white;
  justify-content: center;
  position: relative;
  flex-direction: column;

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
</style>