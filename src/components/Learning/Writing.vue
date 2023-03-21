<template>
    <div class="container">
        <!-- <nut-textarea v-model="sentence" :rows="10" autosize limit-show max-length="140" /> -->
        <div class="chat-con" ref="chatContainer">
            <MessageCard v-for="(message, index) in messageList" :key="index" :role="message.role"
                :message="message.content" />
        </div>
        <div class="tools-bar">
            <nut-button size="mini" type="primary" color="#dee2e6" class="tool-btn"
                @click="toolbarHandler('Examples')">Examples</nut-button>
            <nut-button size="mini" type="primary" color="#dee2e6" class="tool-btn"
                @click="toolbarHandler('Include')">Include</nut-button>
            <nut-button size="mini" type="primary" color="#dee2e6" class="tool-btn"
                @click="toolbarHandler('Question')">Question</nut-button>
            <nut-button size="mini" type="primary" color="#dee2e6" class="tool-btn"
                @click="toolbarHandler('Story')">Story</nut-button>
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
        toolbarHandler(type) {
            type = type.toLowerCase();
            let data = {
                role: "user",
                content: ""
            }
            if (type == "examples") {
                data.content = `Give me three examples of:  ${this.word}`
            } else if (type == "include") {
                data.content = `Your last answer didn't include: ${this.word}`
            } else if (type == "question") {
                data.content = `Ask me a question include:  ${this.word}`
            } else if (type == "story") {
                data.content = `Tell me a short story include:  ${this.word}`
            }
            this.addMessageToList(data);
            this.chatWithGPT();
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
        this.chatWithGPT();
    },
}
</script>

<style scoped>
.container {
    height: calc(100vh - 250px);
}

.chat-con {
    height: calc(100vh - 300px);
    background-color: #f5f5f5;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 5px 5px 0 0;
}

.tools-bar {
    background-color: #f5f5f5;
    margin-bottom: 5px;
    border-radius: 0 0 5px 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: calc(100%);
    overflow-x: scroll;
    scrollbar-width: none;
    padding-top: 5px;
}

.tools-bar::-webkit-scrollbar {
    display: none;
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

.tool-btn {
    margin-right: 10px;
    color: black !important;
}
</style>