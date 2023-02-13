<template lang="">
    <div class="cells-container">
        <div class="word-con">{{word}}</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            word: "world"
        }
    },

    created() {
        this.word = this.$route.params.word || "world";
    }
}
</script>
<style scoped>
.word-con {
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
}
</style>