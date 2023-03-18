<template>
    <div class="con">
        <div>
            <img src="../../assets/91dict-logo.png" alt="dict logo" class="renrenIcon" @click="show">
        </div>
        <div class="img-audio-card">
            <div class="img-audio-card-img" @click="play">
                <img :src="data.img" alt="img card" class="img">
            </div>
            <div class="img-audio-card-audio">
                <audio :src="data.movieAudio" controls ref="audio"></audio>
            </div>
            <div class="img-audio-card-text" v-show="showText">
                {{ data.englishText }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
        // imgSrc: {
        //     type: String,
        //     required: true,
        // },
        // audioSrc: {
        //     type: String,
        //     required: true,
        // },
        // text: {
        //     type: String,
        //     required: true,
        // },
    },
    data() {
        return {
            showText: false,
        }
    },
    methods: {
        play() {
            this.$refs.audio.play();
        },
        show() {
            this.showText = !this.showText;
        },
    }
}
</script>
<style scoped>
.con {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 20px;
}


.img-audio-card {
    position: relative;
    margin-left: 10px;
}

.img-audio-card-audio {
    display: none;
}

.renrenIcon {
    width: 36px;
    height: 36px;
}


.img {
    width: 50vw;
    object-fit: cover;
    border-radius: 5px;
}

.img-audio-card-text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 5px;
    font-size: 13px;
    box-sizing: border-box;
    padding: 0 5px;
}
</style>