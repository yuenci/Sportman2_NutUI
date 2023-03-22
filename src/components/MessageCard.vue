<template>
    <div :class="containerClass">
        <img src="../assets/ChatGPT_logo.jpg" alt="ChatGPT logo" class="avatar" v-if="role === 'assistant'">
        <img src="../assets/user.jpg" alt="user avatar" class="avatar" v-if="role === 'user'">
        <div class="message-container" @click="play">
            <div class="message-triangle triangle-left" v-if="role === 'assistant'"></div>
            <div class="message-triangle triangle-right" v-if="role === 'user'"></div>
            <div class="message-box">{{ message }}</div>
        </div>
        <audio :src="audioUrl" controls ref="audio" class="card-audio-tag"></audio>
    </div>
</template>
<script>
import { speechS } from '../Tools';
export default {
    data() {
        return {
            audioUrl: "",
        }
    },
    props: {
        role: String,
        message: String,
    },
    computed: {
        containerClass() {
            return this.role === 'user' ? 'message-con-user ' : 'message-con-assistant';
        }
    },
    methods: {
        play() {
            this.$refs.audio.play();
        },
        async getURL() {
            this.audioUrl = await speechS(this.message)
        }
    },
    mounted() {
        this.getURL();
    }
}
</script>
<style>
.message-con-assistant {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 20px;
}

.message-con-user {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    margin-bottom: 20px;
}

.avatar {
    width: 36px;
    height: 36px;
    border-radius: 5px;
}

.message-container {
    width: 50%;
    padding: 8px;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #95ec69;
    margin: 0 10px;
    position: relative;
}

.message-triangle {
    width: 10px;
    height: 10px;
    background-color: blue;
    position: absolute;
    top: 3px;
    background-color: #95ec69;
}

.triangle-left {
    transform: rotate(45deg);
    left: -4px;
}

.triangle-right {
    transform: rotate(-45deg);
    right: -4px;
}

.card-audio-tag {
    display: none;
}
</style>