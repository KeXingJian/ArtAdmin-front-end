<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BackgroundPage"
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  cursor: pointer; /* 改变鼠标指针形状 */
  width: 100%;
  height: 100vh;
  background: var(--background-image) center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>