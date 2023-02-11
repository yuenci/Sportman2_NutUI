<template>
    <div class="navbat-top">
        <nut-navbar @on-click-back="back" @on-click-title="title" title="订单详情">
            <template #left>
                <div>返回</div>
            </template>
            <template #right>
                <ShareN width="16px"></ShareN>
            </template>
        </nut-navbar>
    </div>
    <!-- <nut-button type="primary" color="#339af0" @click="handleClick">主要按钮</nut-button> -->
    <div class="cells-container">
        <!-- use for loop this.words -->
        <nut-cell v-for="(value, key) in words" :key="key" :title="value.word" :sub-title="value.explain"></nut-cell>
        <nut-backtop></nut-backtop>
    </div>


    <nut-tabbar @tab-switch="tabSwitch" class="tabbar-bottom">
        <nut-tabbar-item tab-title="Words">
            <template #icon>
                <Order></Order>
            </template>
        </nut-tabbar-item>
        <nut-tabbar-item tab-title="Learn">
            <template #icon>
                <Heart></Heart>
            </template>
        </nut-tabbar-item>
        <nut-tabbar-item tab-title="Data">
            <template #icon>
                <Category></Category>
            </template>
        </nut-tabbar-item>
    </nut-tabbar>
</template>
<script>
import StatusContainer from '../statusContainer.js';
import { Order, Heart, Category } from '@nutui/icons-vue';
export default {
    components: { Order, Heart, Category },
    data() {
        return {
            words: {},
            count: 100,
        }
    },
    methods: {
        handleClick() {
            console.log(StatusContainer.getWords);
        },
        loadWords(number) {
            let words = StatusContainer.getWords;
            let keys = Object.keys(words);

            for (let index = 0; index < number; index++) {
                const key = keys[index];
                const word = words[key]["word"];
                const explain = words[key]["explain"];
                this.words[key] = {
                    word: word,
                    explain: explain,
                }
            }
        },
    },
    setup() {
        function tabSwitch(item, index) {
            console.log(item, index);
        }
        return {
            tabSwitch,
        };
    },

    // after the component is created, the following code will be executed
    created() {
        StatusContainer.fetchWords().then(() => {
            this.loadWords(this.count);
        });
    }
}
</script>

<style scoped>
.nut-navbar {
    margin-bottom: 10px !important;
}

.cells-container {
    background-color: aqua;
    overflow: auto;
    box-sizing: border-box;
    padding: 0px 5px;
    height: calc(100vh - 50px - 50px - 5px);
}
</style>