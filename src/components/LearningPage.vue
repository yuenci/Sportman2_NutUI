<template lang="">
    <div class="cells-container">
        <nut-cell>
            <nut-indicator :block="true" algin="center" :size="6" :current="5">step1</nut-indicator>
        </nut-cell>
        <div class="word-con">{{capitalizeFirstLetter}}</div>
        <div class="move-btns">
            <nut-button type="info" size="mini">
                <template #icon>
                     <RectLeft />
                </template>
            </nut-button>
            <nut-button type="info" size="mini">
                <template #icon>
                    <RectRight />
                </template>
            </nut-button>
        </div>
    </div>
</template>
<script>
import { RectLeft, RectRight } from '@nutui/icons-vue';
import explanation from './Learning/explanation.vue';
import example from './Learning/example.vue';
import reading from './Learning/reading.vue';
import writing from './Learning/writing.vue';
import listening from './Learning/listening.vue';
import speaking from './Learning/speaking.vue';


export default {
    components: {
        RectLeft, RectRight,
        explanation, example,
        reading, writing, listening, speaking
    },
    data() {
        return {
            word: "world",
            currentPage: 0,
        }
    },
    computed: {
        capitalizeFirstLetter() {
            return this.word.charAt(0).toUpperCase() + this.word.slice(1);
        }
    },

    created() {
        this.word = this.$route.params.word || "world";
    }
}
</script>
<style scoped>
.word-con {
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
}

.move-btns {
    display: flex;
    justify-content: space-around;
}
</style>