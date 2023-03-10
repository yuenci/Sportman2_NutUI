<template lang="">
    <nut-collapse v-model="activeNames">
        <nut-collapse-item title="Leaner Example" name="1">
            <ul v-for="item in learner_example" :key="item">
                <li>{{item}}</li>
            </ul>
        </nut-collapse-item>
        <nut-collapse-item title="Dictionary Example" name="2">
            <ul v-for="item in dictory_example" :key="item" >
                <li>{{item}}</li>
            </ul>
        </nut-collapse-item>
    </nut-collapse>
</template>
<script>
import StatusContainer from '../../statusContainer.js';
export default {
    data() {
        return {
            word: "",
            learner_example: "",
            dictory_example: "",
            activeNames: ['1', '2'],
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        this.learner_example = StatusContainer.getWords[this.word].learner_example;
        this.dictory_example = StatusContainer.getWords[this.word].dictory_example;
    },
}
</script>
<style>
.learner_example {
    background-color: #b2f2bb;
}

.dictory_example {
    background-color: #66d9e8;

}
</style>