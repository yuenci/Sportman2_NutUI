<template lang="">
    <nut-navbar  :title="titleName" v-if="titleName == 'Words'">
        <template #left>
            <Date width="16px" color='blue' @click="scheduleWord"></Date>
        </template>
        <template #right>
            <Footprint width="16px" color='blue' @click="randomWord"></Footprint>
        </template>
    </nut-navbar>
    <nut-navbar  :title="titleName" v-else-if="titleName == 'Learning' && learningMethod=='random'">
        <template #right>
            <Footprint width="16px" color='blue' @click="randomWord"></Footprint>
        </template>
    </nut-navbar>
    <nut-navbar  :title="titleName" v-else></nut-navbar>
</template>
<script>
import { Footprint, Date } from '@nutui/icons-vue';
export default {
    components: {
        Footprint, Date
    },
    data() {
        return {
            titleName: "Words",
            learningMethod: "random" // or schedule
        }
    },
    methods: {
        scheduleWord() {
            console.log("scheduleWord");
        },
        randomWord() {
            // console.log("randomWord");
            PubSub.publish('randomWord', { message: 'you message here' });
        },

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
    }
}
</script>
<style>
.nut-navbar {
    padding: 0 !important;
    margin: 0 !important;
}
</style>