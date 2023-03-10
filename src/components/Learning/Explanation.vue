<template lang="">
    <div class="cells-container">
        <div class="word-con">{{capitalizeFirstLetter}}</div>
        <div class="main-explaination">{{explaination}}</div>
        <nut-collapse v-model="activeNames" class="collapse">
            <nut-collapse-item :name="1">
                <template v-slot:title>
                {{"More explainations"}}
                </template>
                <div class="">
                    <div v-for="item in freeDictionaryAPI" :key="item" class="explaination">
                        {{item.definition}}
                    </div>
                </div>
            </nut-collapse-item>
        </nut-collapse>
    </div>
    
</template>
<script>
import StatusContainer from '../../statusContainer.js';
export default {
    data() {
        return {
            word: "",
            explaination: "",
            freeDictionaryAPI: "",
            activeNames: ['0'],
        }
    },
    methods: {
        getExplanation() {
            fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + this.word)
                .then(response => response.json())
                .then(data => {
                    data = data[0]["meanings"][0]["definitions"]
                    this.freeDictionaryAPI = data;
                    //console.log(data);
                });
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        if (Object.keys(StatusContainer.getWords).length === 0) {
            StatusContainer.fetchWords().then((data) => {
                this.explaination = data[this.word].explain;
                this.getExplanation();
            });
        } else {
            this.explaination = StatusContainer.getWords[this.word].explain;
            this.getExplanation();
        }
    },

    computed: {
        capitalizeFirstLetter() {
            return this.word.charAt(0).toUpperCase() + this.word.slice(1);
        },
    },
}
</script>
<style scoped>
.cells-container::-webkit-scrollbar {
    display: none;
}

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
    margin-bottom: 50px;
}

.explainations {
    margin-top: 20px;
    font-size: 15px;

}

.explaination {
    margin: 5px;
}
</style>