<template>
    <div class="container">
        <audio :src="URL" controls ref="audio" class="audio-tag"></audio>
        <div class="dict">
            <img src="../../assets/Azure-Logo.png" alt="dict logo" class="dict-logo">
            <div class="voice-msg" @click="play">
                <Voice class="voice-icon" />{{ duration }}
            </div>
        </div>
        <ImgAudioCard v-for="(item, index) in renrenData" :key="index" :data="item" />
        <!-- <div>
            <nut-cell>
                <nut-input v-model="sentence" placeholder="|" />
                <nut-button type="info">信息按钮</nut-button>
            </nut-cell>
        </div> -->
    </div>
    <div class="bottom-sapce"></div>
</template>
<script>
import StatusContainer from '../../statusContainer.js';
import { Voice } from '@nutui/icons-vue';
import { speechS } from "../../tools.js"

import ImgAudioCard from './ImgAudioCard.vue';

export default {
    components: {
        Voice, ImgAudioCard
    },
    data() {
        return {
            word: "",
            example: "",
            URL: "",
            duration: "0''",
            sentence: ""
        }
    },
    props: {
        renrenData: Object
    },
    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        this.example = StatusContainer.getWords[this.word].learner_example[0];

    },
    methods: {
        play() {
            this.$refs.audio.play();
        },
        async getURL() {
            let url = await speechS(this.example);
            //console.log(url);
            this.URL = url;
        },
    },
    watch: {
        renrenData: function (newVal, oldVal) {
            console.log("renrenData changed");
        }
    },
    mounted() {
        this.$refs.audio.addEventListener("loadedmetadata", () => {
            let duration = this.$refs.audio.duration;
            let seconds = Math.round(duration);
            this.duration = seconds + "''";
        });
        this.getURL();
    }
}
</script>

<style scoped>
/* .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
} */

.audio-tag {
    display: none;
}

.nut-voice {
    display: flex;
    justify-content: space-between;
    width: 100px;
    height: 20px;
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 18px;
}

.voice-msg {
    width: 100px;
    height: 20px;
    padding: 8px;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #95ec69;
}

.voice-icon {
    margin-right: 5px;
}

.dict-logo {
    width: 36px;
    height: 36px;
    background-color: #0b0e16;
    margin-right: 10px;
    border-radius: 5px;
}

.dict {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.bottom-sapce {
    height: 50px;
}
</style>