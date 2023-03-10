<template lang="">
    <div>
        <WordCard v-for="(item, index) in words" :key="index" :word="item[0]" :explain="item[1]" :vocabulary="item[2]"></WordCard>
        <nut-backtop :bottom="60"></nut-backtop>
    </div>
</template>

<script>
import WordCard from './WordCard.vue';
export default {
    components: {
        WordCard,
    },
    props: {
        words: {
            type: Array,
            required: true,
        }
    }
}
</script>
<style></style>