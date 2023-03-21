<template>
    <div>
        <!-- <nut-textarea v-model="sentence" :rows="10" autosize limit-show max-length="140" /> -->
        <div class="chat-con">
            hii
        </div>
        <div class="input">
            <nut-textarea v-model="sentence" rows="4" />
            <Comment class="comment-icon" v-show="showComment" />
        </div>

    </div>
</template>
<script>
import { Comment } from '@nutui/icons-vue';
export default {
    components: {
        Comment,
    },
    data() {
        return {
            word: "",
            sentence: "",
            showComment: false,
        }
    },
    watch: {
        sentence() {
            if (this.sentence.length > 0) {
                this.showComment = true;
            } else {
                this.showComment = false;
            }
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
    },
}
</script>

<style scoped>
.chat-con {
    height: calc(100vh - 270px);
    background-color: aqua;
}

.input {
    position: relative;
}

.comment-icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
}
</style>