<template lang="">
    <nut-cell :title="word" :sub-title="explain" @click="goTolearning"></nut-cell>
</template>
<script>
import PubSub from 'pubsub-js';

export default {
    props: {
        word: String,
        explain: String,
    },
    methods: {
        goTolearning() {
            PubSub.publish('changeTab', { message: 'learn' });
            this.$router.push({ path: `/learning/${this.word}` });
        },
    },
}
</script>
<style lang="">
    
</style>