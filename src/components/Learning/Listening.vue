<template lang="">
    <div class="container">
        <audio :src="URL" controls ref="audio" class="audio-tag"></audio>
        <div class="voice-msg" @click="play">
            <Voice class="voice-icon" />{{duration}}
        </div>
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
            example: "",
            URL: "https://dict.youdao.com/dictvoice?audio=",
            duration: "0''",
        }
    },
    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        this.example = StatusContainer.getWords[this.word].learner_example[0];
        this.URL = this.URL + this.example + "&type=1";
        setTimeout(() => {
            this.duration = this.$refs.audio.duration;
            // keep the duration to 0 decimal place
            this.duration = Math.round(this.duration) + "''"
        }, 1000);
    },
    methods: {
        play() {
            this.$refs.audio.play();
        },
    },
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

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
    border-radius: 18px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #95ec69;
}

.voice-icon {
    margin-right: 5px;
}
</style>