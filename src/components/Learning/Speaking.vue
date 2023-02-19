<template>
    <div>
        <button @click="startRecording">开始录制</button>
        <button @click="stopRecording">停止录制</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            word: "",
            mediaRecorder: null,
            chunks: [],
            recording: false
        };
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        console.log(this.word);
    },

    methods: {
        startRecording() {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.mediaRecorder.addEventListener('dataavailable', (event) => {
                        if (event.data.size > 0) {
                            this.chunks.push(event.data);
                        }
                    });
                    this.mediaRecorder.addEventListener('stop', () => {
                        const blob = new Blob(this.chunks, { type: 'audio/webm' });
                        const url = URL.createObjectURL(blob);
                        // 将录制的音频URL存储在本地存储中
                        localStorage.setItem(`audio-${this.word}`, url);
                        this.chunks = [];
                        this.recording = false;
                    });
                    this.mediaRecorder.start();
                    this.recording = true;
                })
                .catch((error) => {
                    console.error('获取媒体流时出错：', error);
                });
        },
        stopRecording() {
            if (this.mediaRecorder && this.recording) {
                this.mediaRecorder.stop();
            }
        }
    }
};
</script>

<style></style>
