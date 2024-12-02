<template>
  <section class="shell">
    <div v-if="isAdd || isEdit" class="form animate__animated animate__backInDown">
      <div class="container-form">
        <div class="card cart">
          <label class="title">MIRROR FORM</label>
          <div class="steps">
            <div class="step">

              <div class="promo">
                <form class="form-desc">
                  <input type="text" placeholder="DESC" class="input_field">
                </form>
              </div>
              <hr>
              <div class="container-load">
                <div class="header-load">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <label for="file" class="footer-load">
                  <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                      <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
                    </g>
                  </svg>
                  <p>Not selected file</p>
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
                <input id="file" type="file">
              </div>
            </div>
          </div>
        </div>

        <div class="card checkout">
          <div class="footer">
            <button class="checkout-btn">Checkout</button>
            <button class="checkout-btn close" @click="closeAdd">Close</button>
          </div>
        </div>
      </div>
    </div>
    <table>
      <thead>
      <tr>
        <th><a href="#" @click.prevent class="to-font">mirror</a></th>

        <th><a href="#" @click.prevent class="to-font">desc</a></th>
        <th><a href="#" @click.prevent class="to-font">action</a></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user) in paginatedUsers" :key="user.id">
        <td>
          <a href="#" @click.prevent class="to-font"><div class="img-box">
            <img :src="user.mirror">
          </div></a>

        </td>
        <td>
          <a href="#" @click.prevent class="to-font">{{ user.desc }}</a>
        </td>

        <td>
          <div class="action">
            <div class="button">
              <i class="iconfont icon-bianji" @click="toEdit"></i>
            </div>
            <div class="button">
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
              :total="users.length"
              :page-size="pageSize"
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
export default {
  name: "PictureAudit",
  data() {
    return {
      showMenu: false,
      filter: false,
      users: [
        {
          mirror: require('@/static/img/mirror/20240928234109681.png'),
          desc: '猫!',

        },
        {
          mirror: require('@/static/img/mirror/20240928234109681.png'),
          desc: '猫!',

        },
        {
          mirror: require('@/static/img/mirror/20240928234109681.png'),
          desc: '猫!',

        },
        {
          mirror: require('@/static/img/mirror/20240928234109681.png'),
          desc: '猫!',

        },
        {
          mirror: require('@/static/img/mirror/20240928234109681.png'),
          desc: '猫!',

        },
        {
          mirror: require('@/static/img/mirror/20240928234109681.png'),
          desc: '猫!',

        },
        {
          mirror: require('@/static/img/mirror/20240928234109681.png'),
          desc: '猫!',

        },
        {
          mirror: require('@/static/img/mirror/20240928234109681.png'),
          desc: '猫!',

        },
        {
          mirror: require('@/static/img/mirror/20240928234109681.png'),
          desc: '猫!',

        },
        {
          mirror: require('@/static/img/mirror/20240928234109681.png'),
          desc: '猫!',

        },


      ],
      currentPage: 1,
      pageSize: 10, // 每页显示的条目数
      isEdit:false,
      isAdd:false,
    }
  },
  computed: {
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.users.slice(start, end);
    },
  },

  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    closeAdd() {
      this.isAdd = false;
      this.isEdit = false;
    },
    toEdit(){
      this.isEdit=true;
    }
  },
  mounted() {
    this.$bus.$on('toAdd', () => {
      this.isAdd = true;
    })
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
  z-index: 999;
  margin-left: 28%;

}

.container-form {
  margin-left: 4%;
  display: grid;
  grid-template-columns: auto;
  width: 500px;
  max-height: 600px;
  gap: 0;
}

hr {
  height: 1px;
  background-color: rgba(16, 86, 82, .75);;
  border: none;
}

.card {
  width: 100%;
  background: rgb(255, 250, 235);
  box-shadow: 0 187px 75px rgba(0, 0, 0, 0.01), 0 105px 63px rgba(0, 0, 0, 0.05), 0 47px 47px rgba(0, 0, 0, 0.09), 0 12px 26px rgba(0, 0, 0, 0.1), 0 0 0 rgba(0, 0, 0, 0.1);
}

.title {
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid rgba(16, 86, 82, .75);;
  font-weight: 700;
  font-size: 11px;
  color: #000000;
}

.cart {
  border-radius: 19px 19px 0 0;
}

.cart .steps {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.cart .steps .step {
  display: grid;
  gap: 10px;
}

.cart .steps .step span {
  font-size: 13px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8px;
  display: block;
}

.cart .steps .step p {
  font-size: 11px;
  font-weight: 600;
  color: #000000;
}

.promo form {
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  padding: 0;
}

.input_field {
  width: auto;
  height: 36px;
  padding: 0 0 0 12px;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgb(16, 86, 82);
  background-color: rgb(251, 243, 228);
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  box-shadow: 0 0 0 2px rgb(251, 243, 228);
  background-color: rgb(201, 193, 178);
}

.promo form button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  gap: 10px;
  width: 100%;
  height: 36px;
  background: rgba(16, 86, 82, .75);
  box-shadow: 0 0.5px 0.5px #F3D2C9, 0 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 5px;
  border: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
}

.payments .details span:nth-child(odd) {
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  margin: auto auto auto 0;
}

.payments .details span:nth-child(even) {
  font-size: 13px;
  font-weight: 600;
  color: #000000;
  margin: auto 0 auto auto;
}

.checkout .footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  background-color: rgba(16, 86, 82, .5);
}

.checkout .checkout-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 36px;
  background: rgba(16, 86, 82, .55);
  box-shadow: 0 0.5px 0.5px rgba(16, 86, 82, .75), 0 1px 0.5px rgba(16, 86, 82, .75);;
  border-radius: 7px;
  border: 1px solid rgb(16, 86, 82);;
  color: #000000;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}


.container-load {
  height: 200px;
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
  margin-left: 18%;
}

.header-load {
  flex: 1;
  width: 100%;
  border: 2px dashed royalblue;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.header-load svg {
  height: 100px;
}

.header-load p {
  text-align: center;
  color: black;
}

.footer-load {
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

.footer-load svg {
  height: 130%;
  fill: royalblue;
  background-color: rgba(70, 66, 66, 0.103);
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
}

.footer-load p {
  flex: 1;
  text-align: center;
}

#file {
  display: none;
}

.close {
  background: #E74D4D !important;
}
</style>