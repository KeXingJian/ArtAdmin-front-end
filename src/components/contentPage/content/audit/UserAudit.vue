<template>
  <section class="shell">
    <table>
      <thead>
      <tr>
        <th>
          <a href="#" @click.prevent class="to-font">id</a>
        </th>
        <th><a href="#" @click.prevent class="to-font">avatar</a></th>
        <th><a href="#" @click.prevent class="to-font">name</a></th>
        <th><a href="#" @click.prevent class="to-font">account</a></th>
        <th><a href="#" @click.prevent class="to-font">role</a></th>
        <th><a href="#" @click.prevent class="to-font">status</a></th>
        <th><a href="#" @click.prevent class="to-font">is_stop</a></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user) in users" :key="user.id">
        <td>
          <a href="#" @click.prevent class="to-font">
            {{ user.id }}
        </a>
        </td>
        <td>
          <a href="#" @click.prevent class="to-font">
            <img :src="'http://localhost:8080/video/image/2/'+user.picture.path" :alt="user.name">
          </a>

        </td>
        <td>
          <a href="#" @click.prevent class="to-font">
            {{ user.name }}
          </a>
        </td>
        <td>
          <a href="#" @click.prevent class="to-font">
            {{ user.account }}
          </a>
        </td>
        <td>
          <a href="#" @click.prevent class="to-font">
            {{ user.role.name }}
          </a>
        </td>
        <td>
            <div class="checkbox-wrapper-5 ">
              <div class="check">
                <input :checked="user.status"  type="checkbox">
                <label ></label>
              </div>
            </div>
        </td>
        <td>
          <div >
            <input :id="[user.id]" class="inpLock" type="checkbox" v-model="user.stop">
            <label class="btn-lock" :for="user.id" @click="isStop(user)" >
              <svg width="36" height="40" viewBox="0 0 36 40">
                <path class="lockb" d="M27 27C27 34.1797 21.1797 40 14 40C6.8203 40 1 34.1797 1 27C1 19.8203 6.8203 14 14 14C21.1797 14 27 19.8203 27 27ZM15.6298 26.5191C16.4544 25.9845 17 25.056 17 24C17 22.3431 15.6569 21 14 21C12.3431 21 11 22.3431 11 24C11 25.056 11.5456 25.9845 12.3702 26.5191L11 32H17L15.6298 26.5191Z"></path>
                <path class="lock" d="M6 21V10C6 5.58172 9.58172 2 14 2V2C18.4183 2 22 5.58172 22 10V21"></path>
                <path class="bling" d="M29 20L31 22"></path>
                <path class="bling" d="M31.5 15H34.5"></path>
                <path class="bling" d="M29 10L31 8"></path>
              </svg>
            </label>
          </div>
        </td>
      </tr>
      </tbody>

    </table>
  </section>
</template>

<script>
import {changeLockUser, getUsers} from "@/api";

export default {
  name: "UserAudit",
  data() {
    return {
      users:null
    };
  },
  methods: {
    async isStop(user) {
      const response = await changeLockUser(user.account);
      if (response.success) {
        alert(response.data)
      }else {
        user.stop = !user.stop
        alert(response.message)
      }
      console.log(user.stop);
    }

  },
  async mounted() {
    const response = await getUsers();
    this.users = response.data;

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
  width: 80px;
  height: 80px;
  border-radius: 50%;
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
.to-font {
  text-decoration: none;
  color: #000;
}



.checkbox-wrapper-5 .check {
  --size: 40px;
  position: relative;
  background: linear-gradient(90deg, #f19af3, #f099b5);
  line-height: 0;
  perspective: 400px;
  font-size: var(--size);
}
.checkbox-wrapper-5 .check input[type="checkbox"],
.checkbox-wrapper-5 .check label,
.checkbox-wrapper-5 .check label::before,
.checkbox-wrapper-5 .check label::after,
.checkbox-wrapper-5 .check {
  appearance: none;
  display: inline-block;
  border-radius: var(--size);
  border: 0;
  transition: .35s ease-in-out;
  box-sizing: border-box;
  cursor: pointer;
}
.checkbox-wrapper-5 .check label {
  width: calc(2.2 * var(--size));
  height: var(--size);
  background: #d7d7d7;
  overflow: hidden;
}
.checkbox-wrapper-5 .check input[type="checkbox"] {
  position: absolute;
  z-index: 1;
  width: calc(.8 * var(--size));
  height: calc(.8 * var(--size));
  top: calc(.1 * var(--size));
  left: calc(.1 * var(--size));
  background: linear-gradient(45deg, #dedede, #ffffff);
  box-shadow: 0 6px 7px rgba(0,0,0,0.3);
  outline: none;
  margin: 0;
}
.checkbox-wrapper-5 .check input[type="checkbox"]:checked {
  left: calc(1.3 * var(--size));
}
.checkbox-wrapper-5 .check input[type="checkbox"]:checked + label {
  background: transparent;
}
.checkbox-wrapper-5 .check label::before,
.checkbox-wrapper-5 .check label::after {
  content: "· ·";
  position: absolute;
  overflow: hidden;
  left: calc(.15 * var(--size));
  top: calc(.5 * var(--size));
  height: var(--size);
  letter-spacing: calc(-0.04 * var(--size));
  color: #9b9b9b;
  font-family: "Times New Roman", serif;
  z-index: 2;
  font-size: calc(.6 * var(--size));
  border-radius: 0;
  transform-origin: 0 0 calc(-0.5 * var(--size));
  backface-visibility: hidden;
}
.checkbox-wrapper-5 .check label::after {
  content: "●";
  top: calc(.65 * var(--size));
  left: calc(.2 * var(--size));
  height: calc(.1 * var(--size));
  width: calc(.35 * var(--size));
  font-size: calc(.2 * var(--size));
  transform-origin: 0 0 calc(-0.4 * var(--size));
}
.checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::before,
.checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::after {
  left: calc(1.55 * var(--size));
  top: calc(.4 * var(--size));
  line-height: calc(.1 * var(--size));
  transform: rotateY(360deg);
}
.checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::after {
  height: calc(.16 * var(--size));
  top: calc(.55 * var(--size));
  left: calc(1.6 * var(--size));
  font-size: calc(.6 * var(--size));
  line-height: 0;
}



.btn-lock {
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  display: inline-block;
  background: #20cca5;
  width: 55px;
  height: 55px;
  box-sizing: border-box;
  padding: 9px 0 0 8px;
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.btn-lock svg {
  fill: none;
  transform: translate3d(0, 0, 0);
}
.btn-lock svg .bling {
  stroke: #fff;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 3;
  stroke-dashoffset: 15;
  transition: all 0.3s ease;
}
.btn-lock svg .lock {
  stroke: #fff;
  stroke-width: 4;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: 36;
  transition: all 0.4s ease;
}
.btn-lock svg .lockb {
  fill: #fff;
  fill-rule: evenodd;
  clip-rule: evenodd;
  transform: rotate(8deg);
  transform-origin: 14px 20px;
  transition: all 0.2s ease;
}
.inpLock {
  display: none;
}
.inpLock:checked + label {
  background: #ff5b5b;
}
.inpLock:checked + label svg {
  opacity: 1;
}
.inpLock:checked + label svg .bling {
  animation: bling6132 0.3s linear forwards;
  animation-delay: 0.2s;
}
.inpLock:checked + label svg .lock {
  stroke-dasharray: 48;
  animation: locked 0.3s linear forwards;
}
.inpLock:checked + label svg .lockb {
  transform: rotate(0);
  transform-origin: 14px 22px;
}
@keyframes bling6132 {
  50% {
    stroke-dasharray: 3;
    stroke-dashoffset: 12;
  }

  100% {
    stroke-dasharray: 3;
    stroke-dashoffset: 9;
  }
}

@keyframes locked {
  50% {
    transform: translateY(1px);
  }
}



</style>