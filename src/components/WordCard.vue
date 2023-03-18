<template lang="">
    <nut-cell   @click="goTolearning">
        <!-- <div class="title" >
            {{wordCopy}}
        </div> -->
        <div class="title" v-html="wordCopy"></div>
        <div class="sub-title">{{explain}}</div>
    </nut-cell>
</template>
<script>
import PubSub from 'pubsub-js';
import StatusContainer from '../statusContainer.js';

export default {
    props: {
        word: String,
        explain: String,
        vocabulary: String,
    },
    data() {
        return {
            wordCopy: "",
        }
    },
    methods: {
        goTolearning() {
            PubSub.publish('changeTab', { message: 'learn' });
            this.$router.push({ path: `/learning/${this.vocabulary}` });
        },
        boldWord(sentence, word) {
            const regex = new RegExp(`\\b${word}`, 'gi'); // 匹配单词的正则表达式
            const boldedSentence = sentence.replace(regex, `<strong>${word}</strong>`); // 使用字符串模板加粗单词
            return boldedSentence;
        }
    },
    mounted() {
        let cardDisplayMode = StatusContainer.settingsCache.cardDisplayMode;


        if (cardDisplayMode === "2") {
            this.wordCopy = this.boldWord(this.word, this.vocabulary);
        } else {
            this.wordCopy = this.word;
        }
    }
}
</script>
<style scoped>
.nut-cell {
    flex-direction: column;
}

.sub-title {
    font-size: 12px;
}
</style>