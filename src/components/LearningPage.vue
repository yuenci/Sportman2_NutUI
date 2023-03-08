<template lang="">
    <div class="cells-container">
        <nut-cell>
            <nut-row>
                <nut-col :span="12">
                    <nut-indicator :block="true" algin="center" :size="pageSize" :current="currentPage+1"></nut-indicator>
                </nut-col>
                <nut-col :span="12">
                    <div v-if="currentPage === 0">Explanation</div>
                    <div v-if="currentPage === 1">Example</div>
                    <div v-if="currentPage === 2">Reading</div>
                    <div v-if="currentPage === 3">Writing</div>
                    <div v-if="currentPage === 4">Listening</div>
                    <div v-if="currentPage === 5">Speaking</div>
                </nut-col>
            </nut-row>
            
        </nut-cell>
        
        <div class="learning-con">
            <Explanation v-if="currentPage === 0"/>
            <Example v-if="currentPage === 1" />
            <Reading v-if="currentPage === 2" />
            <Writing v-if="currentPage === 3" />
            <Listening v-if="currentPage === 4" />
            <Speaking v-if="currentPage === 5" />
        </div>

        <div class="move-btns">
            <nut-button type="info" size="mini" :disabled="disabledLeft" @click="changePage('prev')">
                <template #icon>
                     <RectLeft />
                </template>
            </nut-button>
            <nut-button type="info" size="mini" :disabled="disabledRight" @click="changePage('next')">
                <template #icon>
                    <RectRight />
                </template>
            </nut-button>
        </div>
    </div>
</template>
<script>
import { RectLeft, RectRight } from '@nutui/icons-vue';
import Explanation from './Learning/Explanation.vue';
import Example from './Learning/Example.vue';
import Reading from './Learning/Reading.vue';
import Writing from './Learning/Writing.vue';
import Listening from './Learning/Listening.vue';
import Speaking from './Learning/Speaking.vue';
import StatusContainer from '../StatusContainer.js';


export default {
    components: {
        RectLeft, RectRight,
        Explanation, Example,
        Reading, Writing, Listening, Speaking
    },
    data() {
        return {
            word: "",
            pageSize: 6,
            currentPage: 0,
            disabledLeft: true,
            disabledRight: false,
        }
    },
    computed: {
        capitalizeFirstLetter() {
            return this.word.charAt(0).toUpperCase() + this.word.slice(1);
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        StatusContainer.currentWord = this.word;
        localStorage.setItem("currentWord", this.word);
    },

    methods: {
        changePage(type) {
            if (type === "next") {
                if (this.currentPage === this.pageSize - 1) return
                this.currentPage++;
            }
            else {
                if (this.currentPage === 0) return;
                this.currentPage--;
            }

            this.disabledLeft = this.currentPage === 0;
            this.disabledRight = this.currentPage === this.pageSize - 1;
        }
    },
}
</script>
<style scoped>
.word-con {
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
}

.move-btns {
    position: absolute;
    bottom: 70px;
    width: calc(100% - 10px);
    display: flex;
    justify-content: space-around;
}

.learning-con {
    height: calc(100vh - 50px - 45px - 50px - 50px);
}
</style>