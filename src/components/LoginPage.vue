<template>
  <div class="container" :class="{ 'show-password': isPasswordVisible }">
    <div class="shell">
      <form @submit.prevent="handleSubmit">
        <a class="protect-font" href="#" @click.prevent>
          <h2>LOGIN</h2>
        </a>

        <div class="form-item">
        
          <div class="input-wrapper">
            <input type="text" id="account" v-model="account" placeholder="Account" required/>
          </div>
        </div>
        <div class="form-item">
      
          <div class="input-wrapper">
            <input :type="isPasswordVisible ? 'text' : 'password'" id="password" v-model="password" placeholder="Password" required/>
            <button type="button" id="eyeball" @click="togglePasswordVisibility">
              <div class="eye"></div>
            </button>
            <div id="beam"></div>
          </div>
        </div>
        <button id="submit" type="submit">Sign in</button>
        <p class="register-link">
          <router-link to="/registerPage">Don't have an account? Go to Register</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>


export default {
  components: {},
  data() {
    return {
      account: '',
      password: '',
      isPasswordVisible: false,

    };
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.$refs.passwordInput.focus();
    },
    handleSubmit() {
      // 处理登录表单提交逻辑
      console.log('Form submitted with:', { account: this.account, password: this.password });
      // 这里可以添加实际的表单提交逻辑，例如发送请求到服务器等
      localStorage.setItem('token', this.account);
      this.$router.replace('/ArtHome');
    }


  },
  mounted() {
    this.$refs.passwordInput = this.$el.querySelector('#password');
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
}

.shell {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/login-background.jpg');
  background-size: cover;
}
form {
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

h2,
label,
input,
button {
  font-size: 2rem;
  font-family: serif;
  color: var(--inputColor);
}

h2 {
  font-size: 4rem;
  margin: 0;
}

label:focus,
input:focus,
button:focus {
  outline-offset: 2px;
}

label::-moz-focus-inner,
input::-moz-focus-inner,
button::-moz-focus-inner {
  border: none;
}

label[id=password],
input[id=password],
button[id=password] {
  color: black;
}

button {
  border: none;
}

[id=submit] {
  cursor: pointer;
  width: 100%;
  margin: 70px 0 0 2px;
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

input {
  margin-top: 25px;
  padding: 0.75rem 4rem 0.75rem 0.75rem;
  width: 100%;
  border: 2px solid transparent;
  border-radius: 0;
  background-color: transparent;
  box-shadow: inset 0 0 0 2px black, inset 6px 6px 0 rgba(30, 144, 255, 0.2), 3px 3px 0 rgba(30, 144, 255, 0.2);
  -webkit-appearance: none;
}

input:focus {
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
  top: 64%;
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
  border: 2px solid var(--inputColor);
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
  background-color: var(--inputColor);
}

.eye:after {
  width: 65%;
  height: 65%;
  border: 2px solid var(--inputColor);
  border-radius: 100%;
}

[id=beam] {
  position: absolute;
  top: 64%;
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

.register-link {
  text-align: center;
  margin-top: 48px;
}

.register-link a {
  color: var(--inputColor);
  text-decoration: none;
  font-size: 1.5rem;
}

.register-link a:hover {
  text-decoration: underline;
}
.protect-font{
  text-decoration: none;
}
</style>