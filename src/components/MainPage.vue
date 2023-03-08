<template>
    <div class="main-page">
        <nut-searchbar v-model="searchValue" @search="search" @clear="clear">
            <template v-slot:leftin>
                <Search2 />
            </template>
        </nut-searchbar>
        <div class="cells-container">
            <!-- use for loop this.words -->
            <WordCard v-for="(value, key) in words" :key="key" :word="value[0]" :explain="value[1]"></WordCard>
            <nut-backtop></nut-backtop>
        </div>
    </div>
</template>

<script>
import StatusContainer from '../statusContainer.js';
import WordCard from './WordCard.vue';
import { Search2 } from '@nutui/icons-vue';


export default {
    components: {
        WordCard, Search2
    },
    data() {
        return {
            words: {},
            searchValue: "",
        }
    },
    methods: {
        handleClick() {
            console.log(StatusContainer.getWords);
        },
        search() {
            console.log(this.searchValue);

            this.words = this.words.filter((item) => {
                // if value.word or value.explain contains searchValue, return true
                return item[0].includes(this.searchValue) || item[1].includes(this.searchValue);
            });
        },
        clear() {
            this.searchValue = "";
            this.words = StatusContainer.getWordsArray;
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
    created() {
        // StatusContainer.fetchWords().then((data) => {
        //     this.words = data;
        // });
        StatusContainer.fetchWordsArray().then((data) => {
            this.words = data;
        });
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