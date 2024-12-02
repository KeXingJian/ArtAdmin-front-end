<template>
  <section class="shell">
    <div v-if="isAdd || isEdit" class="form animate__animated animate__backInDown">
      <div class="container-form">
        <div class="card">
          <div class="p">
            <div class="card-introduce">
              <header class="card-header">
                <span class="title">NAME</span>
                <p><input class="desc" type="text" v-model="artistInput.name"></p>
                <span class="title">DESC</span>
                <p><input class="desc" type="text" v-model="artistInput.description"></p>
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
                  <button class="checkout-btn to-Checkout" @click="uploadFile">Checkout</button>
                  <button class="checkout-btn close" @click="closeAdd">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table>
      <thead>
      <tr>
        <th><a href="#" @click.prevent class="to-font">illustrated</a></th>
        <th><a href="#" @click.prevent class="to-font">artist</a></th>
        <th><a href="#" @click.prevent class="to-font">description</a></th>
        <th><a href="#" @click.prevent class="to-font">action</a></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(artist) in artists" :key="artist.id">
        <td>
          <a href="#" @click.prevent class="to-font">
            <div class="img-box">
              <img :src="'http://localhost:8080/video/image/1/'+artist.picture.path" :alt="artist.artist">
            </div>
          </a>

        </td>
        <td><a href="#" @click.prevent class="to-font">{{ artist.name }}</a></td>
        <td>
          <a href="#" @click.prevent class="to-font">{{ artist.description }}</a>
        </td>

        <td>
          <div class="action">
            <div class="button">
              <i class="iconfont icon-bianji" @click="toEdit(artist)"></i>
            </div>
            <div class="button">
              <i class="iconfont icon-cuowu" @click="toDelete(artist)"></i>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
      <tfoot class="sticky-footer">
      <tr>
        <td colspan="7" style="text-align: center;">
          <el-pagination
              layout="prev, pager, next"
              :total=this.total
              :page-size="24"
              :current-page="currentPage"
              @current-change="handlePageChange"
          ></el-pagination>
        </td>
      </tr>
      </tfoot>

    </table>
  </section>
</template>


<script>

import {getArtists, addArtist, updateArtist, deleteArtist} from '@/api';

export default {
  name: "ArtistAudit",
  data() {
    return {

      showMenu: false,
      filter: false,
      isAdd: false,
      isEdit: false,

      artists: null,
      artistInput: {
        id: null, // 假设这是一个固定的 ID
        name: '',
        description: '',
        picture: {
          id: null, // 假设这是一个固定的 ID
          path: null,
          type: "TEACHER"
        }
      },
      selectedFile: null,
      selectedFileName: '',
      previewImage: '',
      isSelected: false,

      currentPage: 1,
      pageSize: 10,
      total: null,
    }
  },
  computed: {},

  methods: {
    async handlePageChange(page) {
      this.currentPage = page;
      const response = await getArtists(1, 24);
      this.artists = response.data.rows;
      this.total = response.data.totalRowCount
    },
    closeAdd() {
      this.resetForm();
    },
    toEdit(artist) {
      this.isEdit = true;
      this.artistInput.name = artist.name;
      this.artistInput.description = artist.description;
      this.artistInput.id = artist.id;
      this.artistInput.picture.path = artist.picture.path;
      this.artistInput.picture.id = artist.picture.id;
    },
    //用户上传校验
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = this.selectedFile ? this.selectedFile.name : '';
      const maxSize = 500 * 1024; // 500KB
      if (this.selectedFile && this.selectedFile.size > maxSize) {
        alert('File size exceeds the maximum limit of 500KB.');
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

    //向后端上传
    async uploadFile() {
      //为编辑状态放行
      if (!this.selectedFile && !this.isEdit) {
        alert('Please select a file first!');
        return;
      }
      if (this.artistInput.name === '') {
        alert('Please input a name!');
        return
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('artistInput', JSON.stringify(this.artistInput));

      let response
      if (!this.isEdit) {
        response = await addArtist(formData);
      } else {
        response = await updateArtist(formData);
      }
      if (response.success) {
        this.resetForm();
        this.fetchArtists();
        alert(response.data);
      } else {
        alert('Error uploading file: ' + response.data);
      }

    },

    async toDelete(artist) {
      const response = await deleteArtist(artist.id, artist.picture.path);
      alert(response.data);
    },

    //清除表单
    resetForm() {
      this.isAdd = false;
      this.isEdit = false;
      this.artistInput.name = '';
      this.artistInput.description = '';
      this.selectedFile = null;
      this.selectedFileName = '';
      this.previewImage = '';
      this.isSelected = false;
    },

    //刷新
    async fetchArtists() {
      const response = await getArtists(1, 24);
      if (response.success) {
        this.artists = response.data.rows;
        this.total = response.data.totalRowCount
      }
    },
  },
  async mounted() {
    this.$bus.$on('toAdd', () => {
      this.isAdd = true;
    })
    await this.fetchArtists();
  },

  beforeDestroy() {
    this.$bus.$off('toAdd');
  }
}
</script>
<style scoped>
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

.sticky-footer {
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 10px;
  border-top: 1px solid #ddd;
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

.form {
  position: absolute;
  margin-left: 32%;
  z-index: 999;

}

.container-form {
  width: 440px;
  max-height: 600px;

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
  width: 90%;
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
  margin-left: 12%;
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

  max-height: 189px;
  border: 1px solid #ccc;
  padding: 5px;
}
</style>