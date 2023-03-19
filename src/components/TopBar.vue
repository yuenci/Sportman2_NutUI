<template>
    <nut-navbar :title="titleName" v-if="titleName == 'Words'">
        <template #left>
            <Date width="16px" color='blue' @click="switchPlanStatus" v-if="!startPlan"></Date>
            <PoweroffCircleFill width="16px" color='green' v-else @click="switchPlanStatus"></PoweroffCircleFill>
        </template>
        <template #right>
            <Footprint width="16px" color='blue' @click="randomWord"></Footprint>
        </template>
    </nut-navbar>
    <nut-navbar :title="titleName" v-else-if="titleName == 'Learning' && learningMethod == 'random'">
        <template #right>
            <Footprint width="16px" color='blue' @click="randomWord"></Footprint>
        </template>
    </nut-navbar>
    <nut-navbar :title="titleName" v-else></nut-navbar>
</template>
<script>
import { Footprint, Date, PoweroffCircleFill } from '@nutui/icons-vue';
import { getTodaysPlan } from "../Tools";
import StatusContainer from "../statusContainer.js";
export default {
    components: {
        Footprint, Date, PoweroffCircleFill
    },
    data() {
        return {
            titleName: "Words",
            learningMethod: "random", // or schedule
            startPlan: false,
        }
    },
    methods: {
        async prepareTodayPlan() {
            console.log("prepareTodayPlan");
            //console.log(StatusContainer.todaysPlan);
            if (StatusContainer.todaysPlanArray) {
                //console.log("yes cache");
            } else {
                // no cache, get from server
                //console.log("no cache");
                await getTodaysPlan()
                //console.log(res);
            }
        },


        async scheduleWord() {
            await this.prepareTodayPlan();
            this.switchPlanStatus();
        },
        randomWord() {
            // console.log("randomWord");
            PubSub.publish('randomWord', { message: 'you message here' });
        },
        async switchPlanStatus() {
            this.startPlan = !this.startPlan;
            StatusContainer.startTodaysPlan = this.startPlan;

            await this.prepareTodayPlan();

            if (this.startPlan) {
                PubSub.publish('todaysPlan', { message: 'start' });
            } else {
                PubSub.publish('todaysPlan', { message: 'stop' });
            }

        }
    },

    created() {
        const regex = /^\/learning\/\w+$/;
        if (regex.test(this.$route.path)) {
            this.titleName = "Learning";
            return;
        }

        switch (this.$route.path) {
            case "/words":
                this.titleName = "Words";
                break;
            case "/inbox":
                this.titleName = "Inbox";
                break;
            case "/learning":
                this.titleName = "Learning";
                break;
            case "/data":
                this.titleName = "Data";
                break;
            case "/settings":
                this.titleName = "Settings";
                break;
            default:
                break;
        }

        this.startPlan = StatusContainer.startTodaysPlan;
    }
}
</script>
<style>
.nut-navbar {
    padding: 0 !important;
    margin: 0 !important;
}
</style>