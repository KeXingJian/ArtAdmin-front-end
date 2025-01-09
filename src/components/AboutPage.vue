<template>
<div class="div-main">
  <div class="shell">
    <label for="button1" class="button" style="--i:0">ABOUT</label>
    <input type="radio" id="button1" name="page" checked>
    <div class="page">
      <div class="page_content">
        <h1>关于</h1>
        <p>一个艺术欣赏与舞蹈学习的网站</p>
        <span>
                    艺术欣赏，当聚焦于舞蹈这一形式时，它成为了一种超越语言的交流，一种情感与灵魂直接对话的方式。舞蹈不仅是身体的律动，
                    它是舞者内心世界的外在表达，每一个姿态、每一次旋转、每一步跳跃，都蕴含着故事和情感。我们的网站致力于为热爱舞蹈艺术
                    的朋友提供一个沉浸式的平台，在这里，您可以探索不同风格舞蹈的独特魅力,通过高清视频赏析、专业评论解析以及互动学习课程，
                    您将更深入地理解舞蹈背后的文化意义和技术精髓，感受舞者们如何用汗水和激情谱写出一曲曲动人的生命之歌。让我们一起在这流
                    动的艺术中找到共鸣，体验舞蹈所带来的无尽灵感与快乐。
                </span>
      </div>
    </div>


    <label for="button2" class="button" style="--i:1">CONTRIBUTE</label>
    <input type="radio" id="button2" name="page">
    <div class="page">
      <div class="page_content">
        <h1>贡献</h1>
        <p>在此要申明网站素材主要来源</p>

        <span>
          山羊の前端:一名b站up主,在她的素材承担网站的整体架构,如:登录注册页面,主页导航栏,该页面等
          UIVERSE:是个前端组件平台,承担表单,按钮,卡片等组件,里面都使用MIT License作为开源协
          议所以在此声明作者:
          A:mobinkakei;B:JohnnyCSilva;C:akshat-patel28;D:0xnihilism;E:MuhammadHasann;F:SSpisso;
          G:Yaya12085;H:Praashoo7;I:Shoh2008;J:kleenpulse;
          K:WhiteNervosa;L:Smit-Prajapati:M:OnlyCodeChannel;N:joe-watson-sbf;

                </span>
      </div>
    </div>


    <label for="button3" class="button" style="--i:2">WORKER</label>
    <input type="radio" id="button3" name="page">
    <div class="page">
      <div class="page_content">
        <h1>作者</h1>
        <p>斯图威,一名抽象程序员</p>
        <span>
                    QQ:2787901285 WX:QQ2787901285
                </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "AboutPage"
}
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.div-main{
  user-select: none;
  background-color: rgb(0, 0, 0);
  cursor: pointer;
}
.shell{
  width: 100%;
  height: 100%;
  background-color: #000;
  overflow: hidden;
}
.page{
  transform: translateX(-110%);
  position: absolute;
  width: 50%;
  height: 100%;
  transition: .5s;
  background-size: cover;
}
.button{
  display: block;
  width: 12%;
  color: #fff;
  font-size: 30px;
  border-bottom: #fff solid 4px;
  text-align: center;
  position: absolute;
  bottom: 10px;
  margin: 50px;
  left: calc(50% + (var(--i)*17%));
  z-index: 999;
  transition: .3s;
}
.page_content{
  box-sizing: border-box;
  height: 100%;
  padding: 50px;
  color: #FFF;
  position: absolute;
  left: 100%;
  display: none;
  animation-name: fade;
  animation-duration: .7s;
  animation-iteration-count: 1;
  opacity: 1;
}
@keyframes fade{
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0;
    transform: translateY(-50px);
  }
  100%{
    opacity: 1;
    transform: translateY(0px);
  }
}
input{
  display: none;
}
input:checked+.page{
  transform: translateX(0px);
  transition: .4s;
}
input:checked+.page .page_content{
  width: 100%;
  display: block;
}
.page:nth-child(3){
  background-image: url('@/static/img/1.jpg');
}
.page:nth-child(3) .page_content{
  background-color: rgb(185,130,130);
}

.page:nth-child(6){
  background-image: url('@/static/img/2.jpg');
}
.page:nth-child(6) .page_content{
  background-color: #B166A9;
}

.page:nth-child(9){
  background-image: url('@/static/img/3.jpg');
}
.page:nth-child(9) .page_content{
  background-color: #3B7C9E;
}
.page h1{
  font-size: 70px;
}
.page p{
  font-size: 30px;
  padding: 10px;
  background-color: rgba(0, 0, 0, .3);
  border-radius: 10px;
  margin: 30px 0;
}
.page span{
  font-size: 26px;
  letter-spacing: 2px;
  color: rgb(56, 56, 56);
}
label:hover{
  cursor: pointer;
  border-bottom: solid 4px rgb(35, 35, 35);
}
</style>