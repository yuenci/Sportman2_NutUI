<template lang="">
    <nut-cell :title="word" :sub-title="explain" @click="goTolearning"></nut-cell>
</template>
<script>
export default {
    props: {
        word: String,
        explain: String,
    },
    methods: {
        goTolearning() {
            this.$router.push({ path: `/learning/${this.word}` });
        },
    },
}
</script>
<style lang="">
    
</style>