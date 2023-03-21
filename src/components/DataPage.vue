<template>
    <div class="cells-container">
        <div class="progerss">
            <nut-progress :percentage="rate" :text-inside="true"
                stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
                status="active" />
        </div>
        <div>
            <nut-countup :custom-change-num="customNumber" :custom-bg-img="bgImage" :custom-spac-num="11" :num-width="33"
                :num-height="47" :during="5000">
            </nut-countup>
        </div>
        <div class="title">
            <div>Days: {{ days }}</div>
            <div>Level {{ level }}: {{ title }} </div>
            <div>{{ distance }} left to go to the next level!</div>
        </div>
    </div>
</template>
<script>
import { getDuration, getTodayPlanNum } from "../Tools.js"
export default {

    data() {
        return {
            customNumber: 0,
            rate: 0,
            distance: 0,
            level: "",
            title: "",
            days: 0,
            bgImage: 'https://img10.360buyimg.com/imagetools/jfs/t1/133024/3/2251/2646/5ee7549aE8dc02d7e/de6901b6c72db396.png',

            achievement: {
                // .。
                "初来乍到": [0, 100],
                "小试牛刀": [100, 300],
                "竿头直上": [300, 700],
                "熟能生巧": [700, 1400],
                "小有所成": [1400, 3000],
                "风华正茂": [3000, 6000],
                "以一敌百": [6000, 10000],
                "德高望重": [10000, 20000],
                "举世无双": [20000, 50000],
                "指点众生": [50000, 100000],
                "出神入化": [100000, 200000],
                "震铄古今": [200000, 999999],
            }
        }
    },
    methods: {
        getLevel(minute) {
            let keys = Object.keys(this.achievement);

            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let current = this.achievement[key];
                if (minute >= current[0] && minute < current[1]) {
                    this.level = i + 1;
                    this.title = key;
                    this.rate = Math.round(minute * 100 / current[1])
                    this.distance = current[1] - minute;
                    break;
                }
            }
        },

        getAllDuration() {
            getDuration()
                .then((data) => {
                    let num = data.total_duration; // milliseconds
                    let minute = Math.floor(num / 60000);
                    this.customNumber = minute;
                    this.getLevel(minute);
                }).catch((err) => {
                    console.log(err);
                });
        },
        getDays() {
            getTodayPlanNum()
                .then((data) => {
                    this.days = data.docCount;
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
        this.getDays();

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

.nut-countup,
.title {
    text-align: center;
}
</style>