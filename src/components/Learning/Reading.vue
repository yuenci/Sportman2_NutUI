<template lang="">
    <div class="example">
        {{example}}
    </div>
</template>
<script>
import StatusContainer from '../../statusContainer.js';

export default {
    data() {
        return {
            word: "",
            example: "",
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        this.example = StatusContainer.getWords[this.word].learner_example[0];
    },
}
</script>
<style scoped>
.example {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
}
</style>