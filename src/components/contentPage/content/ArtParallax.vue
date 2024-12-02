<template>
  <BackgroundPage>
    <div id="parallax" ref="parallax" @mousemove="parallax">
    </div>
  </BackgroundPage>


</template>

<script>
import BackgroundPage from "@/components/contentPage/content/BackgroundPage.vue";

export default {
  name: 'AtrParallax',
  components: {BackgroundPage},
  methods: {
    parallax(e) {
      const _w = window.innerWidth / 2;
      const _h = window.innerHeight / 2;
      const _mouseX = e.clientX;
      const _mouseY = e.clientY;
      const _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
      const _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
      const _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
      const x = `${_depth3}, ${_depth2}, ${_depth1}`;
      this.$refs.parallax.style.backgroundPosition = x;
    }
  },
  mounted() {
    console.log(this.$refs.parallax);
  }
}
</script>

<style scoped>


#parallax {
  padding: 0;
  width: 100%;
  height: 100vh;
  margin-left: 88px;
  background-image: url('@/static/img/DiIH6f.gif'),
  url('@/static/img/DiIH6f.gif'),
  url('@/static/img/DiIH6f.gif');
  background-repeat: no-repeat;
  background-position: center;
}


</style>