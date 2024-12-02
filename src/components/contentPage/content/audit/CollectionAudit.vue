<template>
  <div class="container">

    <div v-if="isAdd || isEdit" class="form animate__animated animate__backInDown">
      <div class="container-form">
        <div class="card">
          <div class="p">
            <div class="card-introduce">
              <header class="card-header">
                <span class="title">NAME</span>
                <p><input class="desc" type="text" v-model="editCollection.name"></p>
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
                      <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000"
                            stroke-width="2"></path>
                    </g>
                  </svg>
                </label>
                <input id="file" type="file" accept="image/*" @change="onFileSelected">
              </div>
              <div class="card checkout">
                <div class="footer-checkout">
                  <button class="checkout-btn to-Checkout" @click="addCollection">Checkout</button>
                  <button class="checkout-btn close" @click="closeEdit">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isAddVideo" class="form video animate__animated animate__backInDown">
      <div class="container-form">
        <div class="card">
          <div class="p">
            <div class="card-introduce">
              <header class="card-header">
                <span class="title">UUID</span>
                <p><input class="desc" type="text" v-model="editVideo.videos[0].uuid"></p>
              </header>
              <div class="card checkout">
                <div class="footer-checkout">
                  <button class="checkout-btn to-Checkout" @click="addVideo">Checkout</button>
                  <button class="checkout-btn close" @click="closeEdit">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper">
      <div class="wrap-1" v-for="(collection) in collections" :key="collection.id">
        <input type="radio" :id="collection.id" name="tabs">
        <label :for="collection.id">
          <div>{{ collection.name }}</div>
          <i class="iconfont icon-Add" @click="toAddVideo(collection)"></i>
          <i class="iconfont icon-bianji" @click="toEdit(collection)"></i>
          <i class="iconfont icon-cuowu" @click="toDelete(collection)"></i>
          <div class="cross"></div>
        </label>
        <div class="content">
          <section class="shell">
            <table>
              <thead>
              <tr>
                <th><a href="#" @click.prevent class="to-font">uuid</a></th>
                <th><a href="#" @click.prevent class="to-font">cover</a></th>
                <th><a href="#" @click.prevent class="to-font">desc</a></th>
                <th><a href="#" @click.prevent class="to-font">action</a></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(video) in collection.videos" :key="video.uuid">
                <td><a href="#" @click.prevent class="to-font">{{ video.uuid }}</a></td>
                <td>
                  <a href="#" @click.prevent class="to-font">
                    <div class="img-box">
                      <img v-if="video.picture!==null" :src="'http://localhost:8080/video/image/3/'+ video.picture.path" :alt="video.uuid">
                    </div>
                  </a>

                </td>

                <td>
                  <a href="#" @click.prevent class="to-font">{{ video.description }}</a>
                </td>

                <td>
                  <div class="action">
                    <div class="button">
                      <i class="iconfont icon-cuowu" @click="toDeleteVideo(collection.id,video.uuid)"></i>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </section>
        </div>

      </div>

    </div>
  </div>
</template>


<script>
import {
  addCollection,
  getCollections,
  updateCollection,
  addVideoCollection,
  deleteCollection,
  deleteVideoCollection
} from "@/api";

export default {
  name: "CollectionAudit",
  data() {
    return {
      isAdd: false,
      isEdit: false,
      isAddVideo: false,

      previewImage: null,
      selectedFile: null,
      selectedFileName: '',
      isSelected: false,

      editCollection: {
        id: null,
        name: '',
        picture:{
          id: null,
          path: null,
        }
      },
      editVideo:{
        id: null,
        videos:[
          {
            uuid: '',
          }
        ]
      },
      collections:null
    }

  },
  methods: {

    closeEdit() {
      this.resetForm()
      this.isAddVideo=false;
      this.editVideo.uuid=null;
    },
    toEdit(collection) {
      this.isEdit = true;
      this.editCollection.id=collection.id;
      this.editCollection.name=collection.name;
      this.editCollection.picture.path=collection.picture.path;
      this.editCollection.picture.id=collection.picture.id;
    },
    toAddVideo(collection){
      this.editVideo.id=collection.id
      this.isAddVideo = true;
    },
    toDelete(collection){
      const response = deleteCollection(collection.id);
      console.log(response);
      alert('删除成功');
      this.fetchArtists();
    },
    toDeleteVideo(id,uuid){
      deleteVideoCollection(id,uuid);
      alert("删除成功");
      this.fetchArtists();
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
    async addVideo() {
        if (!this.editVideo.videos[0].uuid){
          return
        }
        console.log(this.editVideo);
        const response  =await addVideoCollection(this.editVideo);
        alert(response.data);
        this.closeEdit();
        this.fetchArtists();
    },
    async addCollection() {
      //为编辑状态放行
      if (!this.selectedFile && !this.isEdit) {
        alert('Please select a file first!');
        return;
      }
      if (this.editCollection.name === '') {
        alert('Please input a name!');
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('collectionInput', JSON.stringify(this.editCollection));

      let response
      if (!this.isEdit) {
        response = await addCollection(formData);
      } else {
        response =await updateCollection(formData);
      }
      if (response.success) {
        alert(response.data);
        this.resetForm();
        this.fetchArtists();
      } else {
        alert('Error uploading file: ' + response.data);
      }
    },
    //清除表单
    resetForm() {
      this.isAdd = false;
      this.isEdit = false;
      this.editCollection.name = '';
      this.editCollection.id=null;
      this.editCollection.picture.path=null;
      this.editCollection.picture.id=null;
      this.selectedFile = null;
      this.selectedFileName = '';
      this.previewImage = '';
      this.isSelected = false;
    },

    //刷新
    fetchArtists() {
      getCollections().then(response => {
        if (response.success) {
          this.collections = response.data;
        } else {
          console.error('Error fetching artists:', response.message);
        }
      }).catch(error => {
        console.error('Error fetching artists:', error);
      });
    },
  },
  async mounted() {
    this.$bus.$on('toAdd', () => {
      this.isAdd = true;
    })
    const response = await getCollections()
    this.collections = response.data;
    console.log(this.collections);
  },
  beforeDestroy() {
    this.$bus.$off('toAdd');
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Space Mono', monospace;
  text-decoration: none;
}

.container {
  margin-top: 8px;
  display: flex;

  width: 100%;
  height: 100%;
  background-color: #eee;
}

.wrapper {
  width: 100%;
  height: 100%;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
}

.wrap-1 input {
  display: none;
}

.wrap-1 label {
  display: flex;
  width: 100%;
  height: 50px;
  cursor: pointer;
  border: 3px solid #3E474F;
  user-select: none;
}

.wrap-1 label div:first-child {
  width: 100%;
  line-height: 45px;
  margin-left: 10px;
  font-size: 1.2em;
}

.cross {
  margin-right: 15px;
  margin-top: 3px;
}

.cross::before,
.cross::after {
  content: '';
  border-top: 2px solid #3E474F;
  width: 15px;
  display: block;
  margin-top: 18px;
  transition: .3s;
}

.cross::after {
  transform: rotate(90deg);
  margin-top: -2px;
}

input:checked ~ label .cross::before {
  transform: rotate(180deg);
}

input:checked ~ label .cross::after {
  transform: rotate(0deg);
}

.content {
  box-sizing: border-box;
  font-size: 0.9em;
  max-height: 0;
  overflow: auto;
  transition: max-height, .5s;
}

input:checked ~ .content {
  width: 100%;
  max-height: 600px;
  transition: max-height, 1s;
}

.shell {
  width: 100%;
  max-height: calc(90% - 25px);
  background-color: var(--form-color);
  margin: 8px auto;
  border-radius: 10px;
  overflow: auto;
}

.shell::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

table {
  width: 100%;
}

td img {
  height: 100px;
}

table, th, td {
  border-collapse: collapse;
  padding: 10px;
  text-align: center;
}

thead th {
  position: sticky;
  top: 0;
  left: 0;
  background-color: var(--form-color);
  cursor: pointer;
  font-size: 20px;
  font-family: Arvo, ui-serif;
  color: #1B1F23;

}

tbody tr {
  background-color: #bdb6ec
}

tbody tr:nth-child(even) {
  background-color: #FFF;

}

el-tag {
  margin-right: 4px;
}

.button {
  width: 25%;
  height: 100%;
  text-align: center;
}

.button i {
  display: block;
  color: #3d405b;
  font-size: 30px;
  line-height: 49px;
  transition: .2s;
}

.button i:hover {
  color: #f4f1de;
}

.action {
  margin-left: 32px;

  height: 48px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
}

.to-font {
  text-decoration: none;
  color: #000;
}

.wrap-1 label .iconfont {
  color: #3d405b;
  transition: .2s;
  margin-right: 12px;
  font-size: 24px;
  line-height: 45px;
}

.wrap-1 label .iconfont:hover {
  color: #FFF;
}

.content::-webkit-scrollbar {
  display: none;
}

.form {
  position: absolute;
  z-index: 999;
  margin-left: 28%;

}

.container-form {
  margin-left: 4%;
  display: grid;
  grid-template-columns: auto;
  width: 450px;
  max-height: 600px;
  gap: 0;
}





hr {
  height: 1px;
  background-color: rgba(16, 86, 82, .75);;
  border: none;
}
.button {
  width: 25%;
  height: 100%;
  text-align: center;
}
.button i {
  display: block;
  color: #3d405b;
  font-size: 30px;
  line-height: 49px;
  transition: .2s;
}
.button i:hover {
  color: #f4f1de;
}
.action {
  margin-left: 32px;

  height: 48px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
}
.to-font {
  text-decoration: none;
  color: #000;
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
.option-box p {
  margin-right: 10px;
  line-height: 33px;
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