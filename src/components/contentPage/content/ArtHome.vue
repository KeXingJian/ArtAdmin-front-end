<template>
  <BackgroundPage>

    <div class="content">
      <div class="header-card">
        <div class="search-dev">
          <div class="searchBox" >
            <input class="searchInput" type="text" name="" placeholder="仅支持uuid和艺术家搜索" v-model="inputValue">
            <button class="searchButton" @click="toSearch">
              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                <g clip-path="url(#clip0_2_17)">
                  <g filter="url(#filter0_d_2_17)">
                    <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"></path>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_d_2_17" x="-0.418549" y="3.70435" width="29.7139" height="29.7139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset dy="4"></feOffset>
                    <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_17"></feBlend>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_17" result="shape"></feBlend>
                  </filter>
                  <clipPath id="clip0_2_17">
                    <rect width="28.0702" height="28.0702" fill="white" transform="translate(0.403503 0.526367)"></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
        <div class="select-div">
          <header class="card-select">
            <div class="customCheckBoxHolder" v-for="parent in selectTree" :key="parent.id">
              <div class="option-box" v-for="child in parent.childDictionaries" :key="child.id">
                <input class="customCheckBoxInput" :id="child.id" type="checkbox" v-model="dictionaries"
                       :value="child.id">
                <label class="customCheckBoxWrapper" :for="child.id">
                  <div class="customCheckBox">
                    <div class="inner">{{ child.description }}</div>
                  </div>
                </label>
              </div>
            </div>
          </header>
        </div>
      </div>

      <div class="outer-container">
            <div class="card" v-for="(video) in videos" :key="video.id" @click="toPlay(video)">
              <div class="rectangle left-top"></div>
              <div class="rectangle right-top"></div>
              <div class="rectangle left-bottom"></div>
              <div class="rectangle right-bottom"></div>
              <div class="image" :style="{ backgroundImage: 'url(' + getImageUrl(video.picture.path) + ')' }">
                <i class="iconfont icon-bofang"></i>
              </div>
              <div class="category">
                <button v-for="(dictionary,index) in video.dictionaries" :key="index" class="button">{{dictionary.description}}</button>
              </div>
            </div>
      </div>

      <div class="bottom">
        <table>
          <tfoot class="sticky-footer">
          <tr>
            <td colspan="7" style="
            text-align: center;">
              <el-pagination
                  layout="prev, pager, next"
                  :total=this.total
                  :page-size="24"
                  :current-page=this.currentPage
                  @current-change="handlePageChange"
              ></el-pagination>
            </td>
          </tr>
          </tfoot>
        </table>

      </div>
    </div>

  </BackgroundPage>
</template>

<script>


import BackgroundPage from "@/components/contentPage/content/BackgroundPage.vue";
import {getDictionaryTree, getUserVideos, getVideosByLabel, searchVideoByUser} from "@/api";


export default {
  name: 'ArtHome',
  components: {BackgroundPage},
  data() {
    return {
      currentPage: 1,
      total: null,

      selectTree: null,

      dictionaries:[],
      inputValue:'',

      videos:null,

    };
  },
  methods: {
    async handlePageChange(page) {
      this.currentPage = page;

      let response = null
      if (this.dictionaries!==null && this.dictionaries.length>0){
        response = await getVideosByLabel(this.currentPage,24,this.dictionaries);
      }else {
        response=await getUserVideos(this.currentPage, 24);
      }

      // 使用 map 方法遍历数组，并为每个对象添加 isCurrent 属性
      this.videos = response.data.rows.map(video => ({
        ...video, // 拷贝原有的属性
        isCurrent: false // 添加新的 isCurrent 属性
      }));
      this.total = response.data.totalRowCount
    },
    toPlay(video) {
      video.isCurrent = !video.isCurrent;
      const playVideos={
        currentVideo: video,
        videos: this.videos
      }

      this.$router.push({
        name:"VideoPlayPage",
        params:{
          param1: playVideos
        }
      })
    },
    async getTree() {
      const response = await getDictionaryTree();
      this.selectTree = response.data;
    },
    async toSearch() {
      let response=null
      if (this.inputValue!=='' && this.inputValue!==null) {
        response = await searchVideoByUser(this.inputValue);
         this.videos= [response.data].map(video => ({
          ...video, // 拷贝原有的属性
          isCurrent: false // 添加新的 isCurrent 属性
        }))
        this.total=1
      }else {
        response = await getVideosByLabel(1,24,this.dictionaries);
        this.videos= response.data.rows.map(video => ({
          ...video,
          isCurrent: false
        }))
        this.total = response.data.totalRowCount
      }
      this.currentPage=1
      console.log(this.dictionaries)
    },
    getImageUrl(uuid) {
      return `http://localhost:8080/video/image/3/${uuid}`;
    },
  },
  async mounted() {
    await this.getTree();
    const response = await getUserVideos(1, 24);
    console.log(response);
    if (response.success) {
      this.videos = response.data.rows.map(video => ({
        ...video, // 拷贝原有的属性
        isCurrent: false // 添加新的 isCurrent 属性
      }));
      this.total = response.data.totalRowCount

    } else {
      console.error('Error fetching videos:', response.message);
    }
  },


};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.content {
  border-radius: 10px;
  margin-left: 88px;
  height: 100vh;
  width: 90%;
  background-image: linear-gradient(
      to bottom right,
      rgba(145, 222, 254, 0.8),
      rgba(153, 192, 249, 0.8),
      rgba(189, 182, 236, 0.8),
      rgba(215, 179, 227, 0.8),
      rgba(239, 179, 213, 0.8),
      rgba(249, 188, 204, 0.8)
  );
  overflow: auto;
}
.header-card {
  padding-top: 20px;
  width: 100%;
  height: 250px;
  background: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 15px 15px 30px #bebebe,
  -15px -15px 30px #ffffff;
  transition: 0.2s ease-in-out;
  background: linear-gradient(#e66465, #9198e5);
}

@keyframes box {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(8deg);
  }
  66% {
    transform: rotate(-8deg);
  }
  100% {
    transform: rotate(0deg);
  }
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
.bottom {
  width: 100%;
  border-radius: 10px;
}
.sticky-footer {
  padding: 10px;
  text-align: center;
  bottom: 0;
}
table {
  width: 100%;
  background-color: white;
  border-top: 1px solid #ddd;
}
.card {
  --pink-500: #fda8ff;
  --sky-300: #bbefff;
  --blue-500: #00a3fe;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  width: 22rem;
  height: 240px;
  background-color: black;
  float: left;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 26px;
  border-radius: 0.5rem;
}
.card .rectangle {
  position: absolute;

  width: 0.925rem;
  aspect-ratio: 1 / 1;
  background-color: white;

  opacity: 0;
  box-shadow: 0rem 0rem 0rem 0.175rem black;
}
.card:hover .rectangle {
  opacity: 1;
}
.card .rectangle.left-top {
  top: -0.25rem;
  left: -0.25rem;
}
.card .rectangle.right-top {
  top: -0.25rem;
  right: -0.25rem;
}
.card .rectangle.left-bottom {
  bottom: -0.25rem;
  left: -0.25rem;
}
.card .rectangle.right-bottom {
  bottom: -0.25rem;
  right: -0.25rem;
}
.card .image {
  background-size: cover;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.25rem;
  width: 100%;
  height: 10.25rem;
  background-color: var(--pink-500);

  border-radius: 0.25rem;
}
.card .image .iconfont {
  font-size: 2rem;
}
.card .category {
  align-items: center;
  gap: 0.375rem;
}
.card .category .button {
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  background-color: #d9d9d9;
  font-size: 5px;
  color: black;
  border: 2px solid transparent;
  border-radius: 9999px;
  transition: all 0.3s ease-in-out;
}
.card .category .button:hover {
  border: 2px solid var(--blue-500);
}
.outer-container {
  width: 100%; /* 设置你需要的宽度 */
  height: 607px; /* 设置你需要的高度 */

  scrollbar-width: none; /* Firefox */
}

.content::-webkit-scrollbar {
  display: none;
}

.card-select{
  display: flex;
  position: relative;
  flex-direction: column;
  height: auto;
  width: 100%;
  padding: 1rem;
  border-radius: 16px;
  transition: .2s;
  font-family: 'Inter', sans-serif;

  align-items: center;
  justify-content: center;
}

.searchBox {

  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: #2f3640;
  border-radius: 50px;
  position: relative;
}

.searchButton {
  color: white;
  position: absolute;
  right: 8px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient-2, linear-gradient(90deg, #2AF598 0%, #009EFD 100%));
  border: 0;
  display: inline-block;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
}

button:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.5) 0 10px 20px;
  transform: translateY(-3px);
}

button:active {
  box-shadow: none;
  transform: translateY(0);
}

.searchInput {
  width: 400px; /* 调整输入框的宽度 */
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 20px;
  padding: 24px 20px 24px 0;
}
.search-dev{
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-div{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>