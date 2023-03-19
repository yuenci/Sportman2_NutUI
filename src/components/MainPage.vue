<template>
    <div class="main-page">
        <nut-searchbar v-model="searchValue" @search="search" @clear="clear">
            <template v-slot:leftin>
                <Search2 />
            </template>
        </nut-searchbar>

        <CardsContainer :words="visibleWords"></CardsContainer>
        <div class="bottom-space"></div>
    </div>
</template>

<script>
import StatusContainer from '../statusContainer.js';
import { Search2 } from '@nutui/icons-vue';
import CardsContainer from './CardsContainer.vue';
import PubSub from 'pubsub-js';
import { getSettings } from '../Tools';


export default {
    components: {
        Search2, CardsContainer,
    },
    data() {
        return {
            words: [],
            searchValue: "",
            visibleWords: [], // 当前可见的单词数组
            visibleWordsCount: 20, // 每次加载30个单词
            visibleWordsIndex: 20,  // 当前可见单词数组的索引
        }
    },
    methods: {
        handleClick() {
            console.log(StatusContainer.getWords);
        },
        search() {
            console.log(this.searchValue);

            this.visibleWords = this.words.filter((item) => {
                // if value.word or value.explain contains searchValue, return true
                return item[0].includes(this.searchValue) || item[1].includes(this.searchValue) || item[2].includes(this.searchValue);
            });
        },
        clear() {
            this.searchValue = "";
            this.visibleWords = this.words.slice(0, this.visibleWordsIndex);
        },
        async cardDisplay(data) {
            // 3 - explain
            // 2 word

            let cardDisplayMode = StatusContainer.settingsCache.cardDisplayMode;
            if (!StatusContainer.settingsCache) {
                cardDisplayMode = await getSettings().cardDisplayMode;
            }

            if (cardDisplayMode === "1") {
                let newData = data.map((item) => {
                    return [item[0], item[1], item[0]];
                });
                return newData;
            }
            else if (cardDisplayMode === "2") {
                let newData = data.map((item) => {
                    if (item[2] === undefined) return;
                    return [item[2][0], item[0], item[0]];
                });
                return newData;
            }
            else if (cardDisplayMode === "3") {
                let newData = data.map((item) => {
                    return [item[1], item[0], item[0]];
                });
                return newData;
            }
        },
        gotARandomWord() {
            let randomWord = this.words[Math.floor(Math.random() * this.words.length)][2];
            return randomWord;
        },
        async loadAllData() {
            if (!StatusContainer.getWordsArray) {
                let data = await StatusContainer.fetchWordsArray();
                this.words = await this.cardDisplay(data);
                this.visibleWords = this.words.slice(0, this.visibleWordsIndex);
            } else {
                this.words = await this.cardDisplay(StatusContainer.getWordsArray);
                this.visibleWords = this.words.slice(0, this.visibleWordsIndex);
            }
            //console.log(this.visibleWords);
        },
        async loadTodaysPlan() {
            //console.log(StatusContainer.todaysPlanArray);

            this.words = await this.cardDisplay(StatusContainer.todaysPlanArray);
            this.visibleWords = this.words.slice(0, this.visibleWordsIndex);
        }
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
    async created() {
        if (StatusContainer.startTodaysPlan) {
            this.loadTodaysPlan();
        } else {
            this.loadAllData();
        }
    },
    mounted() {
        // Infinite scrolling
        window.addEventListener('scroll', () => {
            if (document.body.offsetHeight - window.scrollY < 700) {
                this.visibleWordsIndex += this.visibleWordsCount;
                this.visibleWords = this.words.slice(0, this.visibleWordsIndex);
            }
        });
        PubSub.subscribe('randomWord', (msg, data) => {
            let randomWord = this.gotARandomWord();
            //console.log(randomWord + " is a random word");
            localStorage.setItem("currentWord", randomWord);
            this.$router.push({ path: `/learning/${randomWord}` });
        });
        PubSub.subscribe('todaysPlan', (msg, data) => {
            //console.log(data.message);
            if (data.message === "start") {
                this.loadTodaysPlan();
            } else if (data.message === "stop") {
                this.loadAllData();
            }
        });
    },

    beforeDestroy() {
        window.removeEventListener('scroll', () => {
            if (document.body.offsetHeight - window.scrollY < 700) {
                this.visibleWordsIndex += this.visibleWordsCount;
                this.visibleWords = this.words.slice(0, this.visibleWordsIndex);
            }
        });
        PubSub.unsubscribe('randomWord');
        PubSub.unsubscribe('todaysPlan');
    },

}
</script>

<style scoped>
.nut-navbar {
    margin-bottom: 10px !important;
}

.main-page {
    width: 100%;
    height: 60%;
}

.bottom-space {
    height: 50px;
}
</style>