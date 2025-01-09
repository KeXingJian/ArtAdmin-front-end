<template>
  <div class="container" :class="{ 'show-password': isPasswordVisible }">
    <div v-if="isLoading" class="loading animate__animated animate__bounceInDown">
      <div class="card">
        <span class="card__title">友情提示</span>
        <p class="card__content">
          你是否已经有token,如果没有请前往关于页面
        </p>
        <form class="card__form">
          <button class="card__button" @click.prevent="confirm">关于</button>
          <button class="card__button" @click.prevent="isLoading=false">已有token</button>
        </form>
      </div>
    </div>
    <div class="shell">
      <form class="form-form" @submit.prevent="handleRegister">
        <a class="protect-font" href="#" @click.prevent>
          <h2 class="h2-form">REGISTRATION</h2>
        </a>

        <div class="form-item">
          <div class="input-wrapper">
            <input class="input-form" type="text" id="username" v-model="user.name" placeholder="UserName" required />
          </div>
        </div>
        <div class="form-item">
          <div class="input-wrapper">
            <input class="input-form" type="text" id="account" v-model="user.account" placeholder="Account" required />
          </div>
        </div>
        <div class="form-item">
          <div class="input-wrapper">
            <input class="input-form" :type="isPasswordVisible ? 'text' : 'password'" id="password" v-model="user.password" placeholder="Password" required />
            <button class="button-form" type="button" id="eyeball" @click="togglePasswordVisibility">
              <div class="eye"></div>
            </button>
            <div id="beam"></div>
          </div>
        </div>
        <div class="form-item">
          <div class="input-wrapper">
            <input class="input-form" type="text" id="token" v-model="token" placeholder="Token" required />
          </div>
        </div>
        <button class="button-form" id="submit" type="submit">register</button>
        <p class="login-link">
          <router-link to="/loginPage">Already have an account? Go and log in</router-link>
        </p>
      </form>

    </div>
  </div>
</template>

<script>
import {register} from "@/api";

export default {
  data() {
    return {
      user : {
        name: '',
        account: '',
        password: ''
      },
      token:'',
      isPasswordVisible: false,
      isLoading: true,
    };
  },
  methods: {
    async handleRegister() {
      const response = await register(this.user, this.token)
      if (response.success){
        localStorage.setItem('token', JSON.stringify(response.data));
        alert('注册成功');
        await this.$router.replace('/ArtHome');
      }else {
        alert(response.message)
      }


    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.$refs.passwordInput.focus();
    },
    confirm(){
      this.$router.replace('/aboutPage');
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  transition: .2s;
  margin: 0;
  padding: 0;
}
.container {
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background: var(--bgColor);
}
.show-password {
  --bgColor: white;
  --border: black;
  --inputColor: black;
  --outlineColor: rgb(60, 115, 235);
  --background-image: url('@/static/img/bg6.jpg');
}
.shell {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: var(--background-image);
  background-size: cover;
  background-position: left bottom; /* 背景图片从左下角开始 */
}
.form-form {
  transform: translate3d(0, 0, 0);
  height: 592px;
  width: 600px;
  padding: 50px;
  border: 20px solid var(--border);
  border-radius: 10px;
  box-shadow: 10px 10px 10px #00000065;
}
form>*+* {
  margin-top: 15px;
}
.form-item>*+* {
  margin-top: 0.5rem;
}
.h2-form,

.input-form,
.button-form {
  font-size: 2rem;
  font-family: serif;
  color: var(--inputColor);
}
.h2-form {
  font-size: 4rem;
  margin: 0;
}

.input-form:focus,
.button-form:focus {
  outline-offset: 2px;
}

.input-form::-moz-focus-inner,
.button-form::-moz-focus-inner {
  border: none;
}

.input-form[id=password],
.button-form[id=password] {
  color: black;
}
.button-form {
  border: none;
}
[id=submit] {
  cursor: pointer;
  width: 100%;
  margin: 10px 0 0 2px;
  padding: 0.75rem 1.25rem;
  color: var(--bgColor);
  background-color: var(--inputColor);
  box-shadow: 4px 4px 0 rgba(30, 144, 255, 0.2);
}
[id=submit]:active {
  transform: translateY(1px);
}
.input-wrapper {
  position: relative;
}
.input-form {
  padding: 0.50rem 4rem 0.75rem 0.75rem;
  width: 100%;
  border: 2px solid transparent;
  border-radius: 0;
  background-color: transparent;
  box-shadow: inset 0 0 0 2px black, inset 6px 6px 0 rgba(30, 144, 255, 0.2), 3px 3px 0 rgba(30, 144, 255, 0.2);
  -webkit-appearance: none;
}
.input-form:focus {
  outline-offset: 1px;
}

.show-password input {
  box-shadow: inset 0 0 0 2px black;
  border: 2px dashed white;
}
.show-password input:focus {
  outline: none;
  border-color: rgb(255, 255, 145);
}
[id=eyeball] {
  --size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 52%;
  right: 0.75rem;
  border: none;
  background-color: transparent;
  transform: translateY(-50%);
}
[id=eyeball]:active {
  transform: translateY(calc(-50% + 1px));
}
.eye {
  width: var(--size);
  height: var(--size);
  border: 2px solid black;
  border-radius: calc(var(--size) / 1.5) 0;
  transform: rotate(45deg);
}
.eye:before,
.eye:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 100%;
}
.eye:before {
  width: 35%;
  height: 35%;
  background-color: black;
}
.eye:after {
  width: 65%;
  height: 65%;
  border: 2px solid black;
  border-radius: 100%;
}
[id=beam] {
  position: absolute;
  top: 51%;
  right: 1.75rem;
  clip-path: polygon(100% 50%, 100% 50%, 0 0, 0 100%);
  width: 100vw;
  height: 25vw;
  z-index: 1;
  mix-blend-mode: multiply;
  transition: transform 200ms ease-out;
  transform-origin: 100% 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.show-password [id=beam] {
  background: rgb(255, 255, 145);
}
.login-link {
  text-align: center;
  margin-top: 20px;
}
.login-link a {
  color: var(--inputColor);
  text-decoration: none;
  font-size: 1.5rem;
}
.login-link a:hover {
  text-decoration: underline;
}
.protect-font{
  text-decoration: none;
}


.card {
  margin-bottom: 130%;
  width: 430px;
  height: 290px;
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
}

</style>