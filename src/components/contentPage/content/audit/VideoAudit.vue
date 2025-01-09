<template>
  <section class="shell">
    <div v-if="isEdit" class="form animate__animated animate__backInDown">
      <div class="container-form">
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
                  <select class="artist" v-model="videoEdit.artist.id">
                    <option v-for="artist in artistSelect" :key="artist.id" :value="artist.id">{{
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
                    <input class="customCheckBoxInput" :id="child.id" type="checkbox" v-model="videoEdit.dictionaries"
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
                      <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000"
                            stroke-width="2"></path>
                    </g>
                  </svg>
                </label>
                <input id="file" type="file" accept="image/*" @change="onFileSelected">
              </div>
              <div class="card checkout">
                <div class="footer-checkout">
                  <button class="checkout-btn to-Checkout" @click="submitForm">Checkout</button>
                  <button class="checkout-btn close" @click="closeEdit">Close</button>
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

        <th>
          <a href="#" @click.prevent class="to-font">uuid</a>
        </th>
        <th><a href="#" @click.prevent class="to-font">cover</a></th>
        <th><a href="#" @click.prevent class="to-font">artist</a></th>
        <th><a href="#" @click.prevent class="to-font">type</a></th>
        <th><a href="#" @click.prevent class="to-font">description</a></th>
        <th><a href="#" @click.prevent class="to-font">status</a></th>
        <th><a href="#" @click.prevent class="to-font">action</a></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(video) in videos" :key="video.uuid">
        <td><a href="#" @click.prevent class="to-font">{{ video.uuid }}</a></td>
        <td>
          <a href="#" @click.prevent class="to-font">
            <img v-if="video.picture && video.picture.path" :src="url+'video/image/3/' + video.picture.path"
                 :alt="video.artist ? video.artist.name : 'null'">
            <span v-else>No Cover</span>
          </a>
        </td>
        <td>
          <a href="#" @click.prevent class="to-font">{{ video.artist ? video.artist.name : 'null' }}
          </a>
        </td>
        <td>
          <div v-for="(dictionary ,index) in video.dictionaries" :key="index">
            <a href="#" @click.prevent class="to-font">
              <el-tag effect="light" size="mini">{{ dictionary.description }}</el-tag>
            </a>
          </div>
        </td>
        <td>
          <a href="#" @click.prevent class="to-font">{{ video.description }}</a>
        </td>
        <td>
          <el-tag effect="dark" class="tag" size="medium" :type="getStatusType(video.status)">
            {{ getStatusText(video.status) }}
          </el-tag>
        </td>
        <td>
          <div class="action">
            <div class="button">
              <i class="iconfont icon-bianji" @click="edit(video)"></i>
            </div>
            <div class="button" v-if="video.status === 'WAIT_AUDIT'" @click="toAudit(video)">
              <i class="iconfont icon-shexiangji"></i>
            </div>
            <div class="button" v-if="video.status === 'WAIT_PUBLIC'" @click="changeStatus(video,'PUBLIC')">
              <i class="iconfont icon-tongguo"></i>
            </div>
            <div class="button" v-if="video.status === 'REPEAT'" @click="changeStatus(video,'SCRAP')">
              <i class="iconfont icon-cuowu"></i>
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
              :page-size='16'
              :current-page=this.currentPage
              @current-change="handlePageChange"
          ></el-pagination>
        </td>
      </tr>
      </tfoot>
    </table>
  </section>
</template>
<script>
import {getAdminVideos, getAristSelect, getDictionaryTree, editVideo, searchVideo, changeVideoStatus} from '@/api';
import {getURL} from "@/utils";

export default {
  name: "VideoAudit",
  components: {},

  data() {
    return {
      url: getURL(),
      showMenu: false,
      filter: false,
      isEdit: false,
      videos: null,
      currentPage: 1,
      total: null,

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
          id: null
        },
        picture: {
          id: null,
          path: null,
          type: "COVER"
        },
        dictionaries: []
      },


    }
  },


  methods: {
    async handlePageChange(page) {
      this.currentPage = page;
      const response = await getAdminVideos(this.currentPage, 16, this.value);
      this.videos = response.data.rows;
      this.total = response.data.totalRowCount
    },

    async toFilter(value) {

      this.value = value

      const response = await getAdminVideos(this.currentPage, 16, this.value);
      this.videos = response.data.rows;
      this.total = response.data.totalRowCount
    },
    async toSearch(uuid) {
      const response = await searchVideo(uuid);
      this.videos = [response.data];
    },

    edit(video) {
      this.isEdit = true;
      this.videoEdit.uuid = video.uuid;
      this.videoEdit.description = video.description;
      this.videoEdit.artist.id = video.artist ? video.artist.id : null;
      this.videoEdit.picture.path = video.picture ? video.picture.path : null;
      this.videoEdit.picture.id = video.picture ? video.picture.id : null;
      this.videoEdit.dictionaries = video.dictionaries ? video.dictionaries.map(d => d.id) : [];
    },
    closeEdit() {
      this.isEdit = false;
      // 清空表单数据
      this.videoEdit = {
        uuid: null,
        description: "",
        artist: {
          id: null
        },
        picture: {
          id: null,
          path: null,
          type: "COVER"
        },
        dictionaries: []
      };
    },

    //状态枚举
    getStatusText(status) {
      switch (status) {
        case 'WAIT_AUDIT':
          return '待审核';
        case 'WAIT_PUBLIC':
          return '待发布';
        case 'REPEAT':
          return '待查重';
        case 'PUBLIC':
          return '已发布';
        default:
          return '未知状态';
      }
    },
    getStatusType(status) {
      switch (status) {
        case 'WAIT_AUDIT':
          return 'warning';
        case 'WAIT_PUBLIC':
          return '';
        case 'REPEAT':
          return 'danger';
        case 'PUBLIC':
          return 'success';
        default:
          return 'info';
      }
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

    toAudit(video) {
      this.$router.push({
        name: 'VideoAuditPage',
        params: {
          param1: video
        }
      });
    },

    changeStatus(video, status) {
      video.status = status;
      changeVideoStatus(video);
    },

    async toSelect() {
      const response = await getAristSelect();
      this.artistSelect = response.data;
    },

    async getTree() {
      const response = await getDictionaryTree();
      this.selectTree = response.data;
    },

    async submitForm() {
      if (!this.videoEdit.artist.id) {
        alert('请选择艺术家');
        return;
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

      const response = await editVideo(formData);
      console.log(response.success)
      alert('视频编辑成功！');
      this.closeEdit();
      await this.handlePageChange(this.currentPage);

    }

  },
  async mounted() {
    const response = await getAdminVideos(1, 16, -1);
    await this.toSelect();
    await this.getTree();
    if (response.success) {
      this.videos = response.data.rows;
      this.total = response.data.totalRowCount

    } else {
      console.error('Error fetching videos:', response.message);
    }
  },
  created() {
    this.$bus.$on('toFilter', this.toFilter)
    this.$bus.$on('toSearch', this.toSearch)
  },
  beforeDestroy() {
    // 在组件销毁前移除事件监听器
    this.$bus.$off('toFilter', this.toFilter);
    this.$bus.$off('toSearch', this.toFilter);
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
  width: 170px;
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

.tag {
  padding-left: 4px;
  padding-right: 4px;

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
  margin-left: 28%;
  z-index: 999;

}

.container-form {
  margin-left: 4%;
  display: grid;
  grid-template-columns: auto;
  width: 600px;
  max-height: 600px;
  gap: 0px;
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

.artist {
  width: 70px;
  background: #1B1F23;
}

.container-cover {
  margin-left: 22%;
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

.artist {
  width: 100px;
  height: 40px;
  color: #FFFFFF;
  font-size: 15px;
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