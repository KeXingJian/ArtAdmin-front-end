<template>
  <BackgroundPage>
    <div class="content">
      <div class="out">
        <div class="shell">
          <div class="image" v-for="(image) in images" :key="image.id">
            <img :src="url+'video/image/0/'+image.path">
          </div>
        </div>
      </div>
    </div>
  </BackgroundPage>


</template>

<script>
import BackgroundPage from "@/components/contentPage/content/BackgroundPage.vue";
import {getMirrors} from "@/api";
import {getURL} from "@/utils";

export default {
  components: {BackgroundPage},
  data() {
    return {
      time: null,
      images:null,
      url:getURL()
    };
  },
  methods: {

  },
  async mounted() {
    const response = await getMirrors();
    this.images = response.data;

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
  height: 100vh;
  overflow: auto;
}
.content::-webkit-scrollbar {
  display: none;
}

.out{
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}

.shell {
  column-count: 5;
  column-gap: 15px;
}

.image {
  margin-bottom: 15px;
}

.image img {
  width: 100%;
}

@media (max-width:1200px) {
  .shell {
    column-count: 4;
  }
}

@media (max-width:850px) {
  .shell {
    column-count: 3;
  }
}

@media (max-width:600px) {
  .shell {
    column-count: 2;
  }
}
</style>