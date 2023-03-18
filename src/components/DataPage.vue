<template>
    <div class="cells-container">
        <div class="progerss">
            <nut-progress percentage="30" :text-inside="true"
                stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
                status="active" />
        </div>
        <div>
            <nut-countup :custom-change-num="customNumber" :custom-bg-img="bgImage" :custom-spac-num="11" :num-width="33"
                :num-height="47" :during="5000">
            </nut-countup>
        </div>
    </div>
</template>
<script>
import { getDuration } from "../Tools.js"
export default {

    data() {
        return {
            customNumber: 0,
            bgImage: 'https://img10.360buyimg.com/imagetools/jfs/t1/133024/3/2251/2646/5ee7549aE8dc02d7e/de6901b6c72db396.png',
        }
    },
    methods: {
        getAllDuration() {
            getDuration()
                .then((data) => {
                    let num = data.total_duration; // milliseconds
                    let minute = Math.floor(num / 60000);
                    let hour = Math.floor(num / 3600000);
                    this.customNumber = minute;
                }).catch((err) => {
                    console.log(err);
                });
        }
    },
    created() {
        // let durationStr = localStorage.getItem("duration");
        // if (durationStr) {
        //     this.customNumber = parseInt(durationStr);
        // }
        this.getAllDuration();
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

.progerss {
    margin-bottom: 20px;
}
</style>