<template lang="">
    <div class="con">
        <nut-button type="info">Record</nut-button>
    <nut-button type="info">Stop</nut-button>
    </div>
    
</template>
<script>
export default {
    data() {
        return {
            word: "",
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        console.log(this.word);
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
}
</style>