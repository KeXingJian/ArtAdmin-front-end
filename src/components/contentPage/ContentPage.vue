<template>

    <div class="container" :class="{'dark':darkMode}">
      <link rel="stylesheet" href="/font/iconfont.css">
      <nav class="shell" :class="{ close: isShellClose }">
        <header>
          <div class="image-text">
          <span class="image">
            <img v-if="this.user!==null" :src="'http://localhost:8080/video/image/2/'+user.picture.path" alt="">
          </span>
            <div class="text logo-text">
              <a href="#" @click.prevent class="to-font">
                <span class="name">KXJ FOR</span>
                <span class="software">-ART-</span>
              </a>
            </div>
          </div>
          <i class="iconfont icon-xiao_youjiantou toggle" @click="toggleShell"></i>
        </header>
        <div class="menu-bar">
          <div class="menu">
            <ul class="menu-links">
              <li class="nav-link" v-for="(link, index) in filteredMenuLinks" :key="index">
                <router-link :to="link.to">
                  <i :class="`iconfont ${link.icon} icon`" ></i>
                  <span  class="text nac-text">{{ link.text }}</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="bottom-content">
            <li class="">
              <a href="#" @click.prevent="logout" class="to-font">
                <i class="iconfont icon-zhuxiaoyuan icon"></i>
                <span class="text nac-text" >注销</span>
              </a>
            </li>
            <li class="mode">
              <div class="sun-moon">
                <i class="iconfont icon-rijian icon sun"></i>
                <i class="iconfont icon-yejian icon moon"></i>
              </div>
              <span class="mode-text text" @click="toggleDarkMode">{{ darkMode ? '白日模式' : '夜间模式' }}</span>
              <div class="toggle-switch" @click="toggleDarkMode">
                <span class="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
      <div>
        <AtrParallax v-if="this.$route.path==='/'"></AtrParallax>
        <router-view >
        </router-view>
      </div>


    </div>


</template>

<script>
import AtrParallax from "@/components/contentPage/content/ArtParallax.vue";
import {getSimpleUserInfo, logout} from "@/api";
import {getAccount, getRole} from "@/utils";



export default {
  components: {AtrParallax},
  data() {
    return {
      user:null,
      isShellClose: true,
      darkMode: false,
      menuLinks: [
        { icon: 'icon-home', text: 'Home',to:'/ArtHome' ,isPass: true },
        { icon: 'icon-tujian', text: 'Illustrated',to:'/ArtIllustrated',isPass: true  },
        { icon: 'icon-zizhi', text: 'Dictionary',to:'/ArtDictionary',isPass: true  },
        { icon: 'icon-tupian', text: 'Picture',to:'/ArtPicture',isPass: true  },
        { icon: 'icon-dunpaibaoxianrenzheng', text: 'Audit',to:'/ArtAudit/VideoAudit',isPass: false },
        { icon: 'icon-user_01', text: 'Me',to: '/ArtMe' ,isPass: true }
      ],
    };
  },

  methods: {
    toggleShell() {
      this.isShellClose = !this.isShellClose;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle('dark', this.darkMode);
    },
    async logout() {
      await logout();
      localStorage.removeItem('token');
      await this.$router.push('/loginPage');
    },
    check(){
      const token = localStorage.getItem('token');
      this.menuLinks[4].isPass = (getRole(token)==='root' || getRole(token)==='admin');
    }
  },
  computed: {
    filteredMenuLinks() {
      this.check()
      return this.menuLinks.filter(link => link.isPass);
    }
  },
  async mounted() {
    const token = localStorage.getItem('token');
    const response = await getSimpleUserInfo(getAccount(token));
    if (response.data) {
      this.user=response.data;
    }

  }


};
</script>

<style scoped>
* {
  user-select: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.container {
  min-height: 100vh;
  background-color: var(--body-color);
  transition: all 0.3s ease;
}
/* 深色主题变量 */
.dark {
  --body-color: #202224;
  --shell-color: #201B2B;
  --primary-color: #3a3b3c;
  --primary-color-light: #3a3b3c;
  --toggle-color: #fff;
  --text-color: #ccc;
  --section-color: #1B1F23;
  --background-image: url('@/static/img/bg1.png');

}
.shell {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  padding: 10px 14px;
  background: var(--shell-color);
  transition: all 0.3s ease;
  z-index: 100;
}
.close {
  width: 88px;
}
.shell li {
  height: 50px;
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.image,
.icon {
  min-width: 60px;
  border-radius: 6px;
}
.icon {
  min-width: 60px;
  border-radius: 6px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 300 23px '';
}
.text,
.icon {
  color: var(--text-color);
  transition: all 0.3s ease;
}
.text {
  font-size: 17px;
  white-space: nowrap;
  opacity: 1;
}
.shell.close .text {
  opacity: 0;
}
header {
  position: relative;
}
.image-text {
  display: flex;
  align-items: center;
}
.logo-text {
  display: flex;
  flex-direction: column;
}
.name {
  margin-top: 2px;
  font: 600 18px '';
}
.software {
  font-size: 20px;
  margin-top: -2px;
  display: block;
}
.image {
  display: flex;
  align-items: center;
  justify-content: center;
}
.image img {
  width: 45px;
  border-radius: 6px;
}
.toggle {
  position: absolute;
  top: 50%;
  right: -25px;
  transform: translateY(-50%) rotate(180deg);
  height: 25px;
  width: 25px;
  background-color: var(--primary-color);
  color: var(--shell-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.toggle {
  color: #ccc;
}
.shell.close .toggle {
  transform: translateY(-50%) rotate(0deg);
}
.menu {
  margin-top: 40px;
}
li.search-box input {
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  background-color: var(--primary-color-light);
  color: var(--text-color);
  border-radius: 6px;
  font-size: 17px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.shell li a {
  list-style: none;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.shell li a:hover {
  background-color: var(--primary-color);
}
.shell li a:hover .icon,
.shell li a:hover .text {
  color: var(--shell-color);
}
.menu-bar {
  height: calc(100% - 55px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
}
.menu-bar::-webkit-scrollbar {
  display: none;
}
.menu-bar .mode {
  border-radius: 6px;
  background-color: var(--primary-color-light);
  position: relative;
  transition: all 0.3s ease;
}
.menu-bar .mode .sun-moon {
  height: 50px;
  width: 60px;
}
.mode .sun-moon i {
  position: absolute;
}
.mode .sun-moon i.sun {
  opacity: 0;
}
.toggle-switch {
  position: absolute;
  right: 0;
  height: 100%;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
}
.switch {
  position: relative;
  height: 22px;
  width: 40px;
  border-radius: 25px;
  background-color: var(--toggle-color);
  transition: all 0.3s ease;
}
.switch::before {
  content: '';
  position: absolute;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  background-color: var(--shell-color);
  transition: all 0.3s ease;
}
body.dark .shell li a:hover .icon,
body.dark .shell li a:hover .text {
  color: #ccc;
}
body.dark .mode .sun-moon i.sun {
  opacity: 1;
}
body.dark .mode .sun-moon i.moon {
  opacity: 0;
}
body.dark .switch::before {
  left: 20px;
}
.to-font {
  text-decoration: none;
}


</style>