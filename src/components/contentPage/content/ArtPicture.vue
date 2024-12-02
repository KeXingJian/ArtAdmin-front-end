<template>
  <BackgroundPage>
    <div class="content">
      <div class="shell">
        <ul class="images">
          <li v-for="(img, index) in images" :key="index" class="img" :style="{ backgroundImage: `url(${img})` } "></li>
        </ul>
        <div class="button">
          <div class="button-left" @click="prevImage">&lt;</div>
          <div class="button-right" @click="nextImage">&gt;</div>
        </div>
      </div>
    </div>
  </BackgroundPage>


</template>

<script>
import BackgroundPage from "@/components/contentPage/content/BackgroundPage.vue";

export default {
  components: {BackgroundPage},
  data() {
    return {
      index: 0,
      time: null,
      images: [
        require('@/static/img/mirror/20240928212230146.png'),
        require('@/static/img/mirror/20240921221145297.png'),
        require('@/static/img/mirror/20240921221134177.png') ,
        require('@/static/img/mirror/20240928233758937.png'),
        require('@/static/img/mirror/20240928234109681.png')
      ],
      dots: [1, 2, 3, 4, 5] // 这里使用数字数组只是为了方便循环生成小圆点，实际值无意义
    };
  },
  methods: {
    position() {
      const images = this.$el.querySelector('.images');
      images.style.left = (this.index * -100) + '%';
    },
    add() {
      if (this.index >= this.images.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
      this.position();
    },
    desc() {
      if (this.index < 1) {
        this.index = this.images.length - 1;
      } else {
        this.index--;
      }
      this.position();
    },
    nextImage() {
      this.desc();

    },
    prevImage() {
      this.add();

    },

  },
  mounted() {
    this.position(); // 初始化时设置图片位置

  },

};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
  bottom: 0;
  text-decoration: none;
}
.content {
  border-radius: 10px;
  width: 90%;
  margin-left: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(
      to bottom right,
      rgba(145, 222, 254, 0.8),
      rgba(153, 192, 249, 0.8),
      rgba(189, 182, 236, 0.8),
      rgba(215, 179, 227, 0.8),
      rgba(239, 179, 213, 0.8),
      rgba(249, 188, 204, 0.8)
  );
}
.shell {
  width: 1200px;
  height: 700px;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 20px 30px 20px rgba(0, 0, 0, 0.25);
}
.images {
  width: 500%;
  height: 100%;
  display: flex;
  position: absolute;
  left: 0;
  transition: .2s;
}
.img {
  width: 100%;
  background-size: cover;
}
.button {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  user-select: none;
}
.button-left,
.button-right {
  font-size: 50px;
  background-color: rgba(160, 193, 255, 0.2);
  padding: 0 20px;
  cursor: pointer;
  line-height: 700px;
  color: #fff;
}
</style>