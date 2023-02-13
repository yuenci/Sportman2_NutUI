<template lang="">
    <div  class="learner_example">
       <ul v-for="item in learner_example" :key="item">
            <li>{{item}}</li>
        </ul>
    </div>
    <div class="dictory_example">
        <ul v-for="item in dictory_example" :key="item" >
           <li>{{item}}</li>
        </ul>
    </div>
</template>
<script>
import StatusContainer from '../../statusContainer.js';
export default {
    data() {
        return {
            word: "",
            learner_example: "",
            dictory_example: "",
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