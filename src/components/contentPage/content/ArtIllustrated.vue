<template>
  <BackgroundPage>

    <div class="container">
      <div class="shell-box">
        <div class="shell">
          <div @click="toCollection(artist.videos)" v-for="(artist) in artists" :key="artist.id" class="card">
            <div class="box">
              <img :src="'http://localhost:8080/video/image/1/'+artist.picture.path" :alt="artist.description"/>
            </div>
            <div class="character">
              <img :src="'http://localhost:8080/video/image/1/'+artist.picture.path" :alt="artist.description"/>
            </div>
            <h4>{{ artist.name }}</h4>
          </div>
        </div>
      </div>

      <div class="pagination">
        <table>
          <tfoot class="sticky-footer">
          <tr>
            <td colspan="7" style="text-align: center;">
              <el-pagination
                  layout="prev, pager, next"
                  :total="total"
                  :page-size="8"
                  :current-page="page.pageIndex"
                  @current-change="handlePageChange"
              ></el-pagination>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>

  </BackgroundPage>
</template>

<script>

import BackgroundPage from "@/components/contentPage/content/BackgroundPage.vue";
import {getArtistCollections} from "@/api";

export default {
  name: 'ArtIllustrated',
  components: {BackgroundPage},
  data() {
    return {
      artists: null,
      total: null,
      page:{
        pageIndex: 1,
        pageSize: 8,
      },
      videos:null
    };
  },
  methods: {
    handlePageChange(page) {
      this.page.pageIndex = page;
      const response = getArtistCollections(this.page);
      this.total = response.data.totalRowCount;
      this.artists = response.data.rows;
    },
    toCollection(videos) {
      if (videos.length === 0){
        alert('未收录作品')
        return;
      }
      this.videos = videos.map(video => ({
        ...video, // 拷贝原有的属性
        isCurrent: false // 添加新的 isCurrent 属性
      }));
      this.videos[0].isCurrent = true;
      const playVideos = {
        currentVideo: this.videos[0],
        videos: this.videos
      }
      this.$router.push({
        name:"VideoPlayPage",
        params:{
          param1: playVideos
        }
      })
    }
  },
  async mounted() {
    const response = await getArtistCollections({
      pageIndex: 1,
      pageSize: 8
    });
    this.total = response.data.totalRowCount;
    this.artists = response.data.rows;
  }
}

</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  border-radius: 10px;
  margin-left: 88px;
  height: 100vh;
  width: 90%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-image: linear-gradient(
      to bottom right,
      rgba(145, 222, 254, 0.9),
      rgba(153, 192, 249, 0.9),
      rgba(189, 182, 236, 0.9),
      rgba(215, 179, 227, 0.9),
      rgba(239, 179, 213, 0.9),
      rgba(249, 188, 204, 0.9)
  );
  background-size: cover;
}
.shell-box{
  margin-top: 80px;
  display: flex;
}
.shell {
  width: 1700px;
  margin: 0 auto;
  height: 700px;
  display: flex;
}
.card {
  flex-basis: 13%;
  position: relative;
  overflow: hidden;
}
.card:last-child {
  margin-right: 20px;
}
.card {
  margin-left: 20px;
}
.card:hover {
  overflow: initial;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all .1s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  border-radius: 10px;
  background-image: linear-gradient(180deg, #a18cd1, #fcaae55c, #141414ce);
}
.box > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  transform: translate(-50%, 10%) scale(3);
  position: relative;
  opacity: 0.5;

}
.card:hover > .box img {
  opacity: 0;
}
.card:hover > .box {
  transform: scaleY(1.5);
  background-image: initial;
  background-color: #7d419f;
  z-index: 2;
  cursor: pointer;
}
.card > h4 {
  position: absolute;
  display: block;
  width: 120px;
  text-align: center;
  color: rgba(255, 255, 255, 0.2);
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -35%);
  font-size: 28px;
  z-index: 100;
  transition: .2s;
}
.card:hover h4 {
  color: #fff;
  transform: translate(-50%, 250%);
}
.card:hover .character > img {
  opacity: 1;
}
.character > img {
  width: 820px;
  height: 820px;
  object-fit: contain;
  opacity: 0;
  transition: all .3s;
  position: relative;
  z-index: -10;
}
.card > .character {
  position: absolute;
  top: -100px;
  left: -400px;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}
.pagination {
  margin-top: 77px;
  text-align: center;
  width: 100%;
  border-radius: 10px;
}
.sticky-footer {
  padding: 10px;
  text-align: center;
  bottom: 0;
}

table {
  width: 100%;
  background-color: white;
  border-top: 1px solid #ddd;
}
</style>