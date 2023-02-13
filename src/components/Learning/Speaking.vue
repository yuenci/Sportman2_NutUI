<template lang="">
</template>
<script>
export default {
    data() {
        return {
            word: "",
        }
    },
    methods: {
        callback(data) {
            console.debug(data)
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
    },
}
</script>
<style lang="">
    
</style>