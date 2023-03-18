<template lang="">
    <div class="cells-container">
        <div class="word">
            <div class="word-con">{{capitalizeFirstLetter}}</div>
            <div class="voice-icon" @click="playAudio"> <Voice /></div>
        </div>
        <div class="main-explaination">{{explaination}}</div>
        <nut-collapse v-model="activeNames" class="collapse">
            <nut-collapse-item :name="1">
                <template v-slot:title>
                {{"More explainations"}}
                </template>
                <div v-for="item in freeDictionaryAPI" :key="item" class="explaination">
                        {{item.definition}}
                </div>
            </nut-collapse-item>
        </nut-collapse>
    </div>
    
</template>
<script>
import StatusContainer from '../../statusContainer.js';
import { Voice } from '@nutui/icons-vue';

export default {
    components: {
        Voice,
    },
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
        },
        playAudio() {
            let audio = new Audio();
            audio.src = "https://ssl.gstatic.com/dictionary/static/sounds/oxford/" + this.word + "--_gb_1.mp3";
            audio.play();
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        let cuerrentWordData;
        if (StatusContainer.getWords === null) {
            StatusContainer.fetchWords().then((data) => {
                cuerrentWordData = data[this.word];
                if (cuerrentWordData === undefined) {
                    cuerrentWordData = data[this.word];
                }
                this.explaination = cuerrentWordData.explain;
                this.getExplanation();
            });
        } else {
            cuerrentWordData = StatusContainer.getWords[this.word];
            this.explaination = cuerrentWordData.explain;
            this.getExplanation();
        }
        //console.log(cuerrentWordData);
        if (cuerrentWordData !== undefined) {
            localStorage.setItem("currentWordID", cuerrentWordData._id);
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
    text-align: center;
    margin-right: 20px;
}

.voice-icon {
    width: 25px;
    height: 25px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    background-color: aqua;
    border-radius: 50%;
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


.word {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
</style>