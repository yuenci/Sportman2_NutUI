<template lang="">
    <div class="con" :style="{ backgroundImage: 'url(' + url + ')' }">
        <nut-button type="info">Record</nut-button>
    <nut-button type="info">Stop</nut-button>
    </div>
    
</template>
<script>
import getBGImage from '../../assets/speakingBG';
export default {
    data() {
        return {
            word: "",
            url: "",
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