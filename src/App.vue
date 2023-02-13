<template>
  <TopBar :key="$route.fullPath" />
  <router-view></router-view>
  <FootBar class="footbar" />
</template>

<script >
import FootBar from './components/FootBar.vue';
import TopBar from './components/TopBar.vue';
export default {
  components: {
    FootBar, TopBar
  }
}
</script>

<style scoped>
.footbar {
  position: relative;
  bottom: 0px;
}

.cells-container {
  background-color: aqua;
  overflow: auto;
  box-sizing: border-box;
  padding: 0px 5px;
  height: calc(100vh - 50px - 50px - 20px);
}
</style>
