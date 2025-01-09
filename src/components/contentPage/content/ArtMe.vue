<template>
  <background-page>

    <div class="content">
      <div v-if="isAdd || isEdit" class="form-collection animate__animated animate__backInDown">
        <div class="container-form">
          <div class="card">
            <div class="p">
              <div class="card-introduce">
                <header class="card-header">
                  <span class="title">NAME</span>
                  <p><input class="desc" type="text" v-model="editCollection.name"></p>
                </header>
                <div class="card checkout">
                  <div class="footer-checkout">
                    <button class="checkout-btn to-Checkout" @click="upsert">Checkout</button>
                    <button class="checkout-btn close" @click="close">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isEditUser" class="form animate__animated animate__backInDown">
        <div class="container-form">
          <div class="card">
            <div class="p">
              <div class="card-introduce">
                <header class="card-header">
                  <span class="title">NAME</span>
                  <p><input class="desc" type="text" v-model="editUser.name"></p>
                </header>
                <div class="container-cover">
                  <div class="header-form">
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
                        <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000"
                              stroke-width="2"></path>
                      </g>
                    </svg>
                  </label>
                  <input id="file" type="file" accept="image/*" @change="onFileSelected">
                </div>
                <div class="card checkout">
                  <div class="footer-checkout">
                    <button class="checkout-btn to-Checkout" @click="updateUser">Checkout</button>
                    <button class="checkout-btn close" @click="close">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="out">
        <div class="header">
          <div class="a">
            <div class="b">
            <span>
              MY SPACE
            </span>
            </div>
          </div>
        </div>
        <div class="middle">
        <div class="portrait" v-if="user!==null" :style="{ backgroundImage: 'url(' + getImageUrl(user.picture.path) + ')'}">
        </div>
        <div v-if="user!==null" class="username">昵称: {{ user.name }}</div>
        <button class="btn" @click="isEditUser=true">编辑</button>
      </div>
      </div>
      <div class="collection">
        <div class="collection-item">
          <button class="btn" @click="isAdd=true">创建集合</button>
        </div>
        <div v-if="user!==null">
          <div @click="toPlay(collection)" class="card-collection" v-for="(collection) in user.collections" :key="collection.id">
            <div class="top-section">
              <div class="border"></div>
              <div class="icons">
                <div class="logo">
                  <div class="box">
                    <i class="iconfont icon-bianji" @click="toEdit(collection)"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-section">
              <span class="title">{{ collection.name }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </background-page>
</template>

<script>
import BackgroundPage from "@/components/contentPage/content/BackgroundPage.vue";
import {getUserInfo, updateUser, upsertCollection} from "@/api";
import {getAccount, getURL} from "@/utils";

export default {
  name: "ArtMe",
  components: {BackgroundPage},
  data(){
    return {
      isEdit:false,
      isAdd:false,
      isEditUser:false,

      previewImage: null,
      selectedFile: null,
      selectedFileName: '',
      isSelected: false,

      editCollection: {
        id:null,
        name:'',
        common: false,
        artUser:{
          account:null
        }

      },
      editUser:{
        account:null,
        name:'',
        picture:{
          id: null,
          path:null,
          type: "AVATAR"
        },
      },

      user:null,
      videos:null
    }
  },
  computed: {

  },
  methods: {
    close(){
      this.isAdd = false;
      this.isEdit = false;
      this.isEditUser = false;
      this.editCollection={
        id:null,
        name:'',
        common: false,
        artUser:{
          account:null
        }
      }
    },

    toEdit(collection){
      this.isEdit = true;
      this.editCollection.id = collection.id
      this.editCollection.name=collection.name
    },
    getImageUrl(uuid) {
      return getURL()+`video/image/2/${uuid}`;
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

    toPlay(collection){
      if (collection.videos.length === 0){
        alert('收藏夹为空')
        return;
      }
      this.videos=collection.videos.map(video => ({
        ...video, // 拷贝原有的属性
        isCurrent: false // 添加新的 isCurrent 属性
      }));
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

    },

    async updateUser() {

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('UpdateUserInput', JSON.stringify(this.editUser));

      const response= await updateUser(formData);

      if (response.success){
        alert("编辑成功");
      }
      this.close();
      await this.fetch();

    },
    async upsert() {
      if (this.editCollection.name === '') {
        alert("收藏夹名不能为空")
        return
      }

      const token = localStorage.getItem('token');
      console.log(getAccount(token));
      this.editCollection.artUser.account = getAccount(token);

      const response = await upsertCollection(this.editCollection);

      if (response.success) {
        alert("添加或更新集合成功")
      }
      this.close();
      await this.fetch();
    },
    //刷新
    async fetch() {
      const token = localStorage.getItem('token');
      const response = await getUserInfo(getAccount(token));
      this.user = response.data;
      this.editUser.name=this.user.name;
      this.editUser.account=getAccount(token);
      this.editUser.picture.id=this.user.picture.id;
      this.editUser.picture.path=this.user.picture.path;
      console.log(this.user);
    },

  },
  async created() {

  },
  async mounted() {
    await this.fetch()
  }
}

</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  bottom: 0;
  text-decoration: none;
}
.content {
  background-image: var(--me-bg);
  background-size: cover;
  overflow: auto;
  border-radius: 10px;
  margin-left: 88px;
  height: 100vh;
  width: 90%;
}
.out {

  background-size: cover;
}
.header {
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px;
  border-radius: 10px 10px 0 0;
  box-shadow: 15px 15px 30px #bebebe,
  -15px -15px 30px #ffffff;
  transition: 0.2s ease-in-out;
}
.a {
  position: relative;
  top: 13px;
  width: 500px;
  height: 120px;
  border: solid 10px #fff;
  box-shadow: 0 0 70px rgb(190, 40, 210);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.a::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 120px;
  box-shadow: 0 0 5px rgba(190, 40, 210);
  background-color: rgba(100, 30, 225, .4);
}
.a:hover {
  animation: a 1.5s;
}
@keyframes a {
  0%, 34%, 68%, 100% {
    border: solid 10px #fff;
    box-shadow: 0 0 70px rgb(190, 40, 210);
  }
  17%, 51%, 85% {
    border: solid 10px rgba(255, 0, 0, .5);
    box-shadow: 0 0 90px rgba(255, 0, 0, .8);
  }
}
.b, .b::before {
  z-index: 999;
  color: #fff;
  position: absolute;
  font-size: 65px;
  font-weight: 900;
  letter-spacing: 12px;
}
.b::before {
  content: 'MY SPACE';
  text-shadow: -5px -5px 0px rgb(211, 250, 9), 5px 5px 0px rgb(25, 10, 240);
  clip-path: inset(100% 0px 0px 0px);

}
.a:hover .b::before {
  animation: move 1.25s steps(2);
}
@keyframes move {
  0% {
    clip-path: inset(80% 0px 0px 0px);
    transform: translate(-20px, -10px)
  }
  10% {
    clip-path: inset(10% 0px 85% 0px);
    transform: translate(10px, 10px)
  }
  20% {
    clip-path: inset(80% 0px 0px 0px);
    transform: translate(-10px, 10px)
  }
  30% {
    clip-path: inset(10% 0px 85% 0px);
    transform: translate(0px, 5px)
  }
  40% {
    clip-path: inset(50% 0px 30% 0px);
    transform: translate(-5px, 0px)
  }
  50% {
    clip-path: inset(10% 0px 30% 0px);
    transform: translate(5px, 0px)
  }
  60% {
    clip-path: inset(40% 0px 30% 0px);
    transform: translate(5px, 10px)
  }
  70% {
    clip-path: inset(50% 0px 30% 0px);
    transform: translate(-10px, 10px)
  }
  80% {
    clip-path: inset(80% 0px 5% 0px);
    transform: translate(20px, -10px)
  }
  90% {
    clip-path: inset(80% 0px 0px 0px);
    transform: translate(-10px, 0px)
  }
  100% {
    clip-path: inset(80% 0px 0px 0px);
    transform: translate(0px, 0px)
  }
}
.portrait {
  float: left;
  content: '';
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transform: translate(30px, -30px);

  background-size: cover;
  margin-left: 20px;
  border: 10px solid #50536E;
}
.username {
  font-size: 20px;
  margin-left: 180px;
}
.btn {
  --border-color: linear-gradient(-45deg, #ffae00, #7e03aa, #00fffb);
  --border-width: 0.125em;
  --curve-size: 0.5em;
  --blur: 30px;
  --bg: #080312;
  --color: #afffff;
  color: var(--color);
  cursor: pointer;
  position: relative;
  isolation: isolate;
  display: inline-grid;
  place-content: center;
  padding: 0.5em 1.5em;
  font-size: 17px;
  border: 0;
  text-transform: uppercase;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.6);
  clip-path: polygon(
    /* Top-left */ 0% var(--curve-size),
      var(--curve-size) 0,
        /* top-right */ 100% 0,
      100% calc(100% - var(--curve-size)),
        /* bottom-right 1 */ calc(100% - var(--curve-size)) 100%,
        /* bottom-right 2 */ 0 100%
  );
  transition: color 250ms;
}
.btn::after,
.btn::before {
  content: "";
  position: absolute;
  inset: 0;
}
.btn::before {
  background: var(--border-color);
  background-size: 300% 300%;
  animation: move-bg7234 5s ease infinite;
  z-index: -2;
}
@keyframes move-bg7234 {
  0% {
    background-position: 31% 0%;
  }

  50% {
    background-position: 70% 100%;
  }

  100% {
    background-position: 31% 0%;
  }
}
.btn::after {
  background: var(--bg);
  z-index: -1;
  clip-path: polygon(
    /* Top-left */ var(--border-width) calc(var(--curve-size) + var(--border-width) * 0.5),
      calc(var(--curve-size) + var(--border-width) * 0.5) var(--border-width),
        /* top-right */ calc(100% - var(--border-width)) var(--border-width),
      calc(100% - var(--border-width)) calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5)),
        /* bottom-right 1 */ calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5)) calc(100% - var(--border-width)),
        /* bottom-right 2 */ var(--border-width) calc(100% - var(--border-width))
  );
  transition: clip-path 500ms;
}
.btn:where(:hover, :focus)::after {
  clip-path: polygon(
    /* Top-left */ calc(100% - var(--border-width)) calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5)),
      calc(100% - var(--border-width)) var(--border-width),
        /* top-right */ calc(100% - var(--border-width)) var(--border-width),
      calc(100% - var(--border-width)) calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5)),
        /* bottom-right 1 */ calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5)) calc(100% - var(--border-width)),
        /* bottom-right 2 */ calc(100% - calc(var(--curve-size) + var(--border-width) * 0.5)) calc(100% - var(--border-width))
  );
  transition: 200ms;
}
.btn:where(:hover, :focus) {
  color: #fff;
}
.collection {
  overflow: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 607px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 -15px 30px #bebebe, 0 15px 30px rgba(255, 255, 255, 0.7);
  transition: 0.2s ease-in-out;
}

.content::-webkit-scrollbar {
  display: none;
}
.middle .btn {
  margin-left: 30px;
  margin-top: 25px;
}
.collection-item {
  height: 70px;
}
.collection-item .btn {
  margin-top: 10px;
  float: right;
  margin-right: 15px;
}
.card-collection {
  float: left;
  width: 230px;
  border-radius: 20px;
  background: #1b233d;
  padding: 5px;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin: 20px 20px 20px 36px;
}
.card-collection:hover {
  transform: scale(1.05);
}
.card-collection .top-section {
  height: 150px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(45deg, rgb(4, 159, 187) 0%, rgb(80, 246, 255) 100%);
  position: relative;
}
.card-collection .top-section .border {
  border-bottom-right-radius: 10px;
  height: 30px;
  width: 130px;
  background: white;
  background: #1b233d;
  position: relative;
  transform: skew(-40deg);
  box-shadow: -10px -10px 0 0 #1b233d;
}
.card-collection .top-section .border::before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  top: 0;
  right: -15px;
  background: rgba(255, 255, 255, 0);
  border-top-left-radius: 10px;
  box-shadow: -5px -5px 0 2px #1b233d;
}
.card-collection .top-section::before {
  content: "";
  position: absolute;
  top: 30px;
  left: 0;
  background: rgba(255, 255, 255, 0);
  height: 15px;
  width: 15px;
  border-top-left-radius: 15px;
  box-shadow: -5px -5px 0 2px #1b233d;
}
.card-collection .top-section .icons {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
}
.card-collection .top-section .icons .logo {
  height: 100%;
  aspect-ratio: 1;
  padding: 7px 0 7px 15px;
}
.card-collection .top-section .icons .logo .top-section {
  height: 100%;
}
.card-collection .bottom-section {
  margin-top: 15px;
  padding: 10px 5px;
}
.card-collection .bottom-section .title {
  display: block;
  font-size: 17px;
  font-weight: bolder;
  color: white;
  text-align: center;
  letter-spacing: 2px;
}
.box {
  width: 15%;
  height: 100%;
  text-align: center;
}
.box i {
  display: block;
  color: #FFF;
  font-size: 20px;
  transition: .2s;
}
.box i:hover {
  color: #f4f1de;
}


.form {
  position: absolute;
  margin-left: 31%;
  z-index: 999;
  margin-bottom: 12%;
}
.form-collection{
  position: absolute;
  margin-left: 31%;
  z-index: 999;
  margin-bottom: 25%;
}

.container-form {
  width: 446px;
  max-height: 600px;
  overflow: auto;
}

.container-form::-webkit-scrollbar {
  display: none;
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
  font-size: 22px;
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

.desc {
  background: #1B1F23;
  color: #FFFFFF;
  height: 40px;
  min-width: 400px;
}


.container-cover {
  margin-left: 13%;
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

.header-form {
  flex: 1;
  width: 100%;
  border: 2px dashed royalblue;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.header-form svg {
  height: 100px;
}

.header-form p {
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

.close {
  background: #E74D4D !important;
  float: right;
}

.to-Checkout {
  background: green !important;
}

.footer-checkout button {
  width: 100px;
  height: 40px;
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


</style>