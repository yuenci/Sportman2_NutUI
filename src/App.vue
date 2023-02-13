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
  background-color: #fafafa;
  overflow: auto;
  box-sizing: border-box;
  padding: 0px 5px;
  height: calc(100vh - 50px - 45px);
}

.cells-container::-webkit-scrollbar {
  width: 6px;
}

.cells-container::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}

.cells-container::-webkit-scrollbar-thumb {
  background: #40a0ff49;
  border-radius: 10px;
}

.cells-container::-webkit-scrollbar-thumb:hover {
  background: #40a0ff;
}
</style>
