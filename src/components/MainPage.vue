<template>
    <div class="cells-container">
        <!-- use for loop this.words -->
        <nut-cell v-for="(value, key) in words" :key="key" :title="value.word" :sub-title="value.explain"></nut-cell>
        <nut-backtop></nut-backtop>
    </div>
</template>
<script>
import StatusContainer from '../statusContainer.js';


export default {
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
</style>