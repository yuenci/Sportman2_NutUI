<template>
    <div class="main-page">
        <nut-searchbar v-model="searchValue" @search="search" @clear="clear">
            <template v-slot:leftin>
                <Search2 />
            </template>
        </nut-searchbar>

        <CardsContainer :words="visibleWords"></CardsContainer>
    </div>
</template>

<script>
import StatusContainer from '../statusContainer.js';
import { Search2 } from '@nutui/icons-vue';
import CardsContainer from './CardsContainer.vue';
import PubSub from 'pubsub-js';


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
        cardDisplay(data) {
            let settingsLocal = localStorage.getItem("settings");
            let cardDisplayMode = "";
            if (settingsLocal) {
                cardDisplayMode = JSON.parse(settingsLocal).cardDisplayMode;
            }
            else {
                return data;
            }
            if (cardDisplayMode === "1") {
                let newData = data.map((item) => {
                    return [item[0], item[1], item[0]];
                });
                return newData;
            }
            else if (cardDisplayMode === "2") {
                let newData = data.map((item) => {
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
        StatusContainer.fetchWordsArray().then((data) => {
            this.words = this.cardDisplay(data);
            this.visibleWords = this.words.slice(0, this.visibleWordsIndex);
        });
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
            // console.log(randomWord + " is a random word");
            this.$router.push({ path: `/learning/${randomWord}` });
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
    }

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
</style>