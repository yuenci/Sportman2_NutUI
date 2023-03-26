<template>
    <div class="con" :style="{ backgroundImage: 'url(' + url + ')' }">
        <nut-button type="info" @click="startRecord">Record</nut-button>
        <nut-button type="info" @click="stopRecord">Stop</nut-button>
        <nut-button type="info" @click="playRecord">Play</nut-button>
    </div>
</template>
<script>
import getBGImage from '../../assets/speakingBG';
import { showDialog } from '@nutui/nutui';
export default {
    data() {
        return {
            word: "",
            url: "",
            chunks: [],
            mediaRecorder: null,
            audioObj: null,
        }
    },
    methods: {
        startRecord() {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.mediaRecorder.start();
                    this.mediaRecorder.ondataavailable = e => {
                        this.chunks.push(e.data);
                    };
                    this.mediaRecorder.onstop = e => {
                        const blob = new Blob(this.chunks);
                        this.chunks = [];
                        const audioURL = URL.createObjectURL(blob);
                        const audio = new Audio(audioURL);
                        this.audioObj = audio;
                    };
                });
        },
        stopRecord() {
            this.mediaRecorder.stop();
        },
        playRecord() {
            this.audioObj.play();
            this.randomShow();
        },
        randomShow() {
            let str = "How did you make it!!";
            if (Math.random() < 0.2) {
                showDialog({
                    content: str,
                    noCancelBtn: true,
                    onCancel: () => { },
                    onOk: () => { },
                });
            }
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        //console.log(this.word);
        this.url = getBGImage();
    },
}
</script>
<style scoped>
.con {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    background-size: cover;
}
</style>