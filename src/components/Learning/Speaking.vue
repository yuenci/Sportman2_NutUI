<template lang="">
    <div>
        hellow speaking {{word}}
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
    },
}
</script>
<style lang="">
    
</style>