<template>
  <section class="shell">
    <div class="form">
      <div v-if="isAdd || isEdit" class="form animate__animated animate__backInDown">
        <div class="container-form">
          <div class="card cart">
            <label class="title">ADD DICTIONARY</label>
            <div class="steps">
              <div class="step">
                <div>
                  <span>PARENT</span>
                  <label>
                    <select class="artist-select">
                    </select>
                  </label>
                </div>
                <hr>

                <div class="promo">
                  <form class="form-desc">
                    <input type="text" placeholder="Label" class="input_field">
                  </form>
                </div>
                <hr>
                <div class="promo">
                  <form class="form-desc">
                    <input type="text" placeholder="Code" class="input_field">
                  </form>
                </div>
                <hr>


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
    </div>
    <table>
      <thead>
      <tr>
        <th><a href="#" @click.prevent class="to-font">id</a></th>
        <th><a href="#" @click.prevent class="to-font">parentId</a></th>
        <th><a href="#" @click.prevent class="to-font">description</a></th>
        <th><a href="#" @click.prevent class="to-font">action</a></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(dictionary) in dictionaries" :key="dictionary.id">
        <td>
          <a href="#" @click.prevent class="to-font">
            <div class="img-box">
              {{ dictionary.id }}
            </div>
          </a>
        </td>
        <td>
          <a href="#" @click.prevent class="to-font">
            {{ display(dictionary) }}
          </a>
        </td>
        <td>
          <a href="#" @click.prevent class="to-font">{{ dictionary.description }}</a>
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
              :total="200"
              :page-size="20"
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
import { getDictionaries} from '@/api';
export default {
  name: "DictionaryAudit",
  data() {
    return {
      showMenu: false,
      filter: false,
      isAdd: false,
      isEdit:false,
      dictionaries: null,
      currentPage: 1,
      pageSize: 10, // 每页显示的条目数
    }
  },

  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    closeAdd() {
      this.isAdd = false;
      this.isEdit=false;
    },
    toEdit() {
      this.isEdit=true;
    },
    display(dictionary) {
      return dictionary.parent !== null ? dictionary.parent.id : 'null';
    }
  },
  async mounted() {
    this.$bus.$on('toAdd', () => {
      this.isAdd = true;
    })
    try {
      const response = await getDictionaries();
      if (response.success) {
        this.dictionaries = response.data;
        console.log(this.dictionaries)
      } else {
        console.error('Error fetching videos:', response.message);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  },
  beforeDestroy() {
    this.$bus.$off('toAdd');
  },
  computed: {
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
  margin-left: 35%;
  z-index: 999;

}
.container-form {
  margin-left: 4%;
  display: grid;
  grid-template-columns: auto;
  width: 300px;
  max-height: 600px;
  gap: 0px;
}
hr {
  height: 1px;
  background-color: rgba(16, 86, 82, .75);;
  border: none;
}
.card {
  width: 100%;
  background: rgb(255, 250, 235);
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
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
  border-radius: 19px 19px 0px 0px;
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
  padding: 0px;
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
  box-shadow: 0px 0px 0px 2px rgb(251, 243, 228);
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
  box-shadow: 0px 0.5px 0.5px #F3D2C9, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
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
  box-shadow: 0px 0.5px 0.5px rgba(16, 86, 82, .75), 0px 1px 0.5px rgba(16, 86, 82, .75);;
  border-radius: 7px;
  border: 1px solid rgb(16, 86, 82);;
  color: #000000;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}
.artist-select {
  width: 80px;
  height: 30px; /* 根据需要调整高度 */
  overflow-y: auto;
  background-color: rgb(251, 243, 228)
}
.artist-select::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
.close {
  background: #E74D4D !important;
}

</style>