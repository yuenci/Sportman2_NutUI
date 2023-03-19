<template>
    <div>
        <nut-textarea v-model="sentence" :rows="10" autosize limit-show max-length="140" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            word: "",
            sentence: "",
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
    },
}
</script>
<style></style>