<template>
  <BackgroundPage>
     <div class="content">
       <div v-if="isLoading" class="loading animate__animated animate__bounceInDown">
         <div class="card">
           <span class="card__title">加载视频</span>
           <p class="card__content">
             加载视频是一个危险操作,请输入确认
           </p>
           <form class="card__form">
             <input required="" type="text" placeholder="确认" v-model="check" />
             <button class="card__button" @click.prevent="confirm">confirm</button>
             <button class="card__button" @click.prevent="cancel">cancel</button>
           </form>
         </div>
       </div>
       <main class="table">
         <section class="header">
           <h1>管理中心</h1>
           <div v-if="this.$route.path==='/ArtAudit/VideoAudit'" class="searchBox" >
             <input class="searchInput" type="text" name="" placeholder="Search something" v-model="inputValue">
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
           <div class="nav">
             <div class="box" @mouseover="showMenu = true" @mouseout="showMenu = false">
               <i class="iconfont icon-mulu">
                 <ul v-show="showMenu" class="submenu">
                   <li>
                     <router-link to="VideoAudit" class="to-font">
                       <div class="menu-box">
                         视频审核
                       </div>
                     </router-link>
                   </li>
                   <li>
                     <router-link to="UserAudit" class="to-font">
                       <div class="menu-box">
                         用户管理
                       </div>
                     </router-link>
                   </li>
                   <li>
                     <router-link to="ArtistAudit" class="to-font">
                       <div class="menu-box">
                         艺术家管理
                       </div>
                     </router-link>
                   </li>
                   <li>
                     <router-link to="PictureAudit" class="to-font">
                       <div class="menu-box">
                         相册维护
                       </div>
                     </router-link>
                   </li>
                   <li>
                     <router-link to="CollectionAudit" class="to-font">
                       <div class="menu-box">
                         集合管理
                       </div>
                     </router-link>
                   </li>

                   <li>
                     <router-link to="DictionaryAudit" class="to-font">
                       <div class="menu-box">
                         字典管理
                       </div>
                     </router-link>
                   </li>
                 </ul>
               </i>
             </div>

             <div v-if="this.$route.path==='/ArtAudit/VideoAudit'" class="box" @mouseover="filter = true"
                  @mouseout="filter = false">
               <i class="iconfont icon-24gl-funnel">
                 <ul v-show="filter" class="submenu">
                   <li>
                     <div class="menu-box" @click.prevent="toFilter(0)">
                       <a href="#" class="to-font" >待审核</a>
                     </div>
                   </li>
                   <li>
                     <div class="menu-box" @click.prevent="toFilter(1)">
                       <a href="#" class="to-font" >待发布</a>
                     </div>
                   </li>
                   <li>
                     <div class="menu-box" @click.prevent="toFilter(2)">
                       <a href="#" class="to-font" >待疑重</a>
                     </div>
                   </li>
                   <li>
                     <div class="menu-box" @click.prevent="toFilter(3)">
                       <a href="#" class="to-font" >已发布</a>
                     </div>
                   </li>
                   <li>
                     <div class="menu-box" @click.prevent="toFilter(4)">
                       <a href="#" class="to-font" >已废弃</a>
                     </div>
                   </li>

                 </ul>
               </i>
             </div>

             <div class="box" v-if="this.$route.path==='/ArtAudit/VideoAudit'" @click="toLoading">
               <i class="iconfont icon-xiazai"></i>
             </div>
             <div class="box" v-if="this.$route.path!=='/ArtAudit/VideoAudit'" @click="toAdd">
               <i class="iconfont icon-Add"></i>
             </div>
           </div>
         </section>
         <router-view></router-view>
       </main>
     </div>
  </BackgroundPage>
</template>

<script>
import BackgroundPage from "@/components/contentPage/content/BackgroundPage.vue";
import {loading} from "@/api";


export default {
  name: "ArtAudit",
  components: {BackgroundPage},
  data() {
    return {
      showMenu: false,
      filter: false,
      isLoading: false,
      inputValue: '',

      check:''
    }
  },
  methods:{
    toLoading(){
      this.isLoading = true
    },
    async confirm() {
      if (this.check === '确认') {
        const response = await loading()
        this.check=''
        this.isLoading = false
        alert(response.data)
      }
    },
    cancel(){
      this.isLoading = false
    },
    toAdd(){
       this.$bus.$emit('toAdd');
    },
    toFilter(value){
      this.$bus.$emit('toFilter',value);
    },
    toSearch(){
      this.$bus.$emit('toSearch',this.inputValue);
    },

  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content{
  width: 90%;
  margin-left: 88px;
}
main.table {
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 10%;
  background-color: #81b29a;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav {
  width: 200px;
  height: 48px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
}
.box {
  width: 25%;
  height: 100%;
  text-align: center;
}
.box i {
  display: block;
  color: #3d405b;
  font-size: 40px;
  line-height: 49px;
  transition: .2s;
}
.box i:hover {
  color: #f4f1de;
}
.submenu {
  width: 60%;
  position: absolute;
  list-style-type: none;
  background-color: #FFF;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  z-index: 1000;
  font-size: 14px;
}
.to-font {
  text-decoration: none;
  color: #000;
}
.menu-box:hover {
  background-color: #f4f1de;
}
.menu-box a:active {
  color: #81b29a;
}
.card {
  width: 500px;
  height: 470px;
  padding: 20px;
  background: #fff;
  border: 6px solid #000;
  box-shadow: 12px 12px 0 #000;
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
  transform: translate(-5px, -5px);
  box-shadow: 17px 17px 0 #000;
}
.card__title {
  font-size: 32px;
  font-weight: 900;
  color: #000;
  text-transform: uppercase;
  margin-bottom: 15px;
  display: block;
  position: relative;
  overflow: hidden;
}
.card__title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 90%;
  height: 3px;
  background-color: #000;
  transform: translateX(-100%);
  transition: transform 0.3s;
}
.card:hover .card__title::after {
  transform: translateX(0);
}
.card__content {
  font-size: 16px;
  line-height: 1.4;
  color: #000;
  margin-bottom: 20px;
}
.card__form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.card__form input {
  padding: 10px;
  border: 3px solid #000;
  font-size: 16px;
  font-family: inherit;
  transition: transform 0.3s;
  width: calc(100% - 26px); /* Adjust for padding and border */
}
.card__form input:focus {
  outline: none;
  transform: scale(1.05);
  background-color: #000;
  color: #ffffff;
}
.card__button {
  border: 3px solid #000;
  background: #000;
  color: #fff;
  padding: 10px;
  font-size: 18px;
  left: 20%;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;
  width: 50%;
  height: 100%;
}
.card__button::before {
  content: "Sure?";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 105%;
  background-color: #5ad641;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100%);
  transition: transform 0.3s;
}
.card__button:hover::before {
  transform: translateY(0);
}
.card__button:active {
  transform: scale(0.95);
}
@keyframes glitch {
  0% {
    transform: translate(2px, 2px);
  }
  25% {
    transform: translate(-2px, -2px);
  }
  50% {
    transform: translate(-2px, 2px);
  }
  75% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(2px, 2px);
  }
}
.loading{

  position: absolute;
  z-index: 999;
  top: 17%;
  left: 39%;
}


.searchBox {
  display: flex;
  max-width: 255px;
  align-items: center;
  justify-content: space-between;
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
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 15px;
  padding: 24px 46px 24px 26px;
}


</style>

