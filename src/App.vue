<template>
  <TopBar :key="$route.fullPath" />
  <router-view></router-view>
  <FootBar class="footbar" />
</template>

<script >
import FootBar from './components/FootBar.vue';
import TopBar from './components/TopBar.vue';
import StatusContainer from './statusContainer.js';
export default {
  components: {
    FootBar, TopBar
  },
  data() {
    return {
      unsavedChanges: true,
      startTimeStamp: 0,
    }
  },
  created() {
    // StatusContainer.fetchWords();
  },
  mounted() {
    window.addEventListener('beforeunload', this.handleBeforeUnload)
    this.startTimeStamp = new Date().getTime();
    console.log("start time: " + this.startTimeStamp);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
  },
  methods: {
    handleBeforeUnload(event) {
      if (this.unsavedChanges) {
        // 取消默认事件，弹出未保存提示框
        event.preventDefault()
        event.returnValue = ''

        let endTimeStamp = new Date().getTime();
        let duration = (endTimeStamp - this.startTimeStamp) / 1000;
        //console.log("duration: " + Math.round(duration));
        this.saveDurationToLocal(Math.round(duration));
      }
    },
    saveDurationToLocal(durationNum) {
      let duration = localStorage.getItem("duration");
      if (duration == null) {
        localStorage.setItem("duration", durationNum);
      } else {
        localStorage.setItem("duration", parseInt(duration) + durationNum);
      }
    }
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
