<template lang="">
    <div class="word-con">{{capitalizeFirstLetter}}</div>
    <div class="main-explaination">{{explaination}}</div>
    <div class="explainations">
        <div v-for="item in freeDictionaryAPI" :key="item" class="explaination">
            {{item.definition}}
        </div>
    </div>
</template>
<script>
import StatusContainer from '../../statusContainer.js';
export default {
    data() {
        return {
            word: "",
            explaination: "",
            freeDictionaryAPI: ""
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        //console.log(this.word);
        //console.log(StatusContainer.getWords[this.word].explain);
        this.explaination = StatusContainer.getWords[this.word].explain;

        fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + this.word)
            .then(response => response.json())
            .then(data => {
                data = data[0]["meanings"][0]["definitions"]
                this.freeDictionaryAPI = data;
                //console.log(data);
            });
    },

    computed: {
        capitalizeFirstLetter() {
            return this.word.charAt(0).toUpperCase() + this.word.slice(1);
        },
    },
}
</script>
<style scoped>
.word-con {
    font-size: 20px;
    color: #333;
    font-weight: 500;
    margin: 0 0 10px;
    text-align: center;
}

.main-explaination {
    font-size: 18px;
    color: #333;
    font-weight: 500;
    margin: 0 0 10px;
    text-align: center;
}

.explainations {
    margin-top: 20px;
    font-size: 15px;

}

.explaination {
    margin: 5px;
}
</style>