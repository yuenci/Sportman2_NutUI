<template>
    <div class="container">
        <!-- <nut-textarea v-model="sentence" :rows="10" autosize limit-show max-length="140" /> -->
        <div class="chat-con" ref="chatContainer">
            <MessageCard v-for="(message, index) in messageList" :key="index" :role="message.role"
                :message="message.content" />
        </div>
        <div class="input">
            <nut-textarea v-model="sentence" rows="4" @keyup.enter="sendMessage" />
            <div class="comment-icon">
                <Comment v-show="!showComment" @click="sendMessage" />
                <Comment v-show="showComment" color="green" @click="sendMessage" />
            </div>
        </div>

    </div>
</template>
<script>
import { Comment } from '@nutui/icons-vue';
import MessageCard from '../MessageCard.vue';
import { chatWithChatGPT } from "../../Tools"
import { showNotify } from '@nutui/nutui';

export default {
    components: {
        Comment, MessageCard
    },
    data() {
        return {
            word: "",
            sentence: "",
            showComment: false,
            messageList: []
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
    methods: {
        scrollToBottom() {
            let chatConObj = this.$refs.chatContainer;
            let scrollH = chatConObj.scrollHeight;
            chatConObj.scrollTo({
                top: scrollH,
                behavior: "smooth"
            })
        },
        chatWithGPT() {
            chatWithChatGPT(this.messageList, this.word).then(res => {
                try {
                    this.addMessageToList(res.message[0]);
                } catch (e) {
                    console.log(e);
                    showNotify.warning("ChatGPT is not available now, please try again later.");
                }
            });
        },
        sendMessage() {
            if (this.sentence.length == 0) return;
            if (this.showComment) {
                // console.log("send message");
                let data = {
                    role: "user",
                    content: this.sentence
                }
                this.addMessageToList(data);
                this.sentence = "";

                this.chatWithGPT();
            }

        },
        addMessageToList(res) {
            this.messageList.push(res)
            setTimeout(() => {
                this.scrollToBottom();
            }, 100);
        }
    },

    created() {
        this.word = this.$route.params.word || localStorage.getItem("currentWord");
        // for (let i = 0; i < 3; i++) {
        //     this.messageList.push({
        //         role: "assistant",
        //         content: "Hello, I am ChatGPT, I can help you to learn English."
        //     })
        //     this.messageList.push({
        //         role: "user",
        //         content: "Please type your sentence and I will help you to correct it."
        //     })
        // }
        this.chatWithGPT();

        // chatWithChatGPT(this.messageList, this.word).then(res => {
        //     try {
        //         this.addMessageToList(res.message[0]);
        //     } catch (e) {
        //         console.log(e);
        //         showNotify.warn("ChatGPT is not available now, please try again later.");
        //     }
        // })
    },
}
</script>

<style scoped>
.container {
    height: calc(100vh - 250px);
}

.chat-con {
    height: calc(100vh - 270px);
    background-color: aqua;
    overflow-y: scroll;
    margin-bottom: 5px;
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