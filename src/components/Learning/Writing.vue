<template lang="">
    <div>
        <nut-textarea v-model="value" :rows="10" autosize limit-show max-length="140"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            word: "",
            value: "",
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
    },
}
</script>
<style lang="">
    
</style>