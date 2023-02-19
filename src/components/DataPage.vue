<template lang="">
    <div class="cells-container">
        <h1></h1>
        <nut-countup
        :custom-change-num="customNumber"
        :custom-bg-img="bgImage"
        :custom-spac-num="11"
        :num-width="33"
        :num-height="47"
        :during="5000"
    >
    </nut-countup>
    </div>
    
</template>
<script>

export default {
    data() {
        return {
            customNumber: 0,
            bgImage: 'https://img10.360buyimg.com/imagetools/jfs/t1/133024/3/2251/2646/5ee7549aE8dc02d7e/de6901b6c72db396.png',
        }
    },
    // get duration from localStorage
    created() {
        let durationStr = localStorage.getItem("duration");
        if (durationStr) {
            this.customNumber = parseInt(durationStr);
        }
    },
};
</script>
<style scoped>
.cells-container {
    background-color: #fafafa;
    overflow: auto;
    box-sizing: border-box;
    padding: 0px 5px;
    height: calc(100vh - 50px - 45px);
}
</style>