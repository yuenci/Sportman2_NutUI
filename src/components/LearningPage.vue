<template>
    <div class="cells-container" :key="$route.fullPath">
        <nut-cell @click="switchMoveBtnShow">
            <nut-row>
                <nut-col :span="9">
                    <nut-indicator :block="true" algin="center" :size="pageSize" :current="currentPage + 1"
                        :fill-zero="false"></nut-indicator>
                </nut-col>
                <nut-col :span="11">
                    <div v-if="currentPage === 0">Explanation</div>
                    <div v-if="currentPage === 1">Example</div>
                    <div v-if="currentPage === 2">Reading</div>
                    <div v-if="currentPage === 3">Writing</div>
                    <div v-if="currentPage === 4">Listening</div>
                    <div v-if="currentPage === 5">Speaking</div>
                </nut-col>
                <nut-col :span="2">
                    <StarN width="16px" @click.stop="starHandle" :color="currentWordStar === true ? 'yellow' : ''"></StarN>
                </nut-col>
                <nut-col :span="2">
                    <Failure width="16px" @click.stop="reportBugHandle"></Failure>
                </nut-col>
            </nut-row>
        </nut-cell>

        <div class="learning-con">
            <Explanation v-if="currentPage === 0" @setStar="setStar" />
            <Example v-if="currentPage === 1" />
            <Reading v-if="currentPage === 2" />
            <Writing v-if="currentPage === 3" />
            <Listening v-if="currentPage === 4" :renrenData="renrenData" />
            <Speaking v-if="currentPage === 5" />
        </div>

        <div class="move-btns" v-show="moveBtnShow">
            <nut-button type="info" size="mini" :disabled="disabledLeft" @click="changePage('prev')">
                <template #icon>
                    <RectLeft />
                </template>
            </nut-button>
            <nut-button type="info" size="mini" :disabled="disabledRight" @click="changePage('next')" :class="className">
                <template #icon>
                    <RectRight />
                </template>
            </nut-button>
            <nut-button type="info" size="mini" color="green" @click="finishLearning" :class="CheckClass">
                <template #icon>
                    <Check />
                </template>
            </nut-button>
        </div>
    </div>
</template>
<script>
import { RectLeft, RectRight, Check, StarN, Failure } from '@nutui/icons-vue';
import Explanation from './Learning/Explanation.vue';
import Example from './Learning/Example.vue';
import Reading from './Learning/Reading.vue';
import Writing from './Learning/Writing.vue';
import Listening from './Learning/Listening.vue';
import Speaking from './Learning/Speaking.vue';
import StatusContainer from '../StatusContainer.js';
import { showDialog, showNotify } from '@nutui/nutui';
import { logLearingTime, getRenRen, reportWordBug, starWord } from '../Tools';
import JSConfetti from 'js-confetti';
import getQuotation from '../assets/quotations';

export default {
    components: {
        RectLeft, RectRight, Check, StarN, Failure,
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
            textSeleted: "",
            className: "",
            CheckClass: "hide",
            startTimeStamp: 0,
            renrenData: null,
            startX: 0,
            startY: 0,
            direction: 0, // 0表示无滑动，1表示右滑，-1表示左滑
            currentWordStar: false,
            moveBtnShow: true,
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
        this.setTimeStart();
    },
    watch: {
        $route(to, from) {
            this.currentPage = 0;
            this.setTimeStart();
        },
        currentPage(newValue, oldValue) {
            if (newValue === 0) {
                this.CheckClass = "hide";
                this.className = ""
                this.disabledLeft = true;
                this.disabledRight = false;
                this.getRenrenData();
            }

            if (newValue === 3) {
                //console.log("remove mouse up event");
                this.removeMouseUpToastMenuEvent();
            } else if (newValue === 4) {
                this.addMouseUpToastMenuEvent();
            }

            if (newValue === 4, oldValue === 5) {
                this.CheckClass = "hide";
                this.className = ""
                this.disabledLeft = false;
                this.disabledRight = false;
            }
        }
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
            if (this.currentPage === this.pageSize - 1) {
                this.disabledRight = true;
                this.className = "hide";
                this.CheckClass = "";
            }
        },
        showWordDialog(definition, example) {
            const onCancel = () => {
                //console.log('event cancel');
            };
            const onOk = () => {
                //console.log('event ok');
            };

            showDialog({
                title: this.textSeleted,
                content: `
                <div class="dialog-content">${definition}</div>
                 <div class="dialog-content">${example}</div>
                `,
                onCancel,
                onOk
            });
        },
        getExplaimAndExample() {
            let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + this.textSeleted;
            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        let definition = "Explain: " + data[0]["meanings"][0]["definitions"][0]["definition"];
                        let example = "Example: " + data[0]["meanings"][0]["definitions"][0]["example"];
                        resolve([definition, example]);
                        //console.log(definition, example);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(err);
                    });
            });
        },
        toastMenuShow() {
            var selectedText = window.getSelection().toString().trim();
            //console.log(selectedText);
            window.getSelection().removeAllRanges() // clear selection

            if (selectedText == this.textSeleted) {
                this.textSeleted = '';
                return;
            }

            if (selectedText !== '') {
                this.textSeleted = selectedText;
                console.log(selectedText);
                this.getExplaimAndExample().then((data) => {
                    //console.log(data);
                    this.showWordDialog(data[0], data[1]);
                });
            }
        },
        async finishLearning() {
            let id = localStorage.getItem("currentWordID");
            //console.log(id);

            if (this.startTimeStamp !== null) {
                let data = await logLearingTime(id, this.setTimeEnd())
                //console.log(data);

                //#TODO  update plan
            }
            await this.celebrate();

            let currentURL = this.$route.path;

            PubSub.publish('randomWord', { message: 'you message here' })
            // get current url
            setTimeout(() => {
                if (this.$route.path === currentURL)
                    this.$router.push("/words");
            }, 1);

        },
        setTimeStart() {
            this.startTimeStamp = new Date().getTime();
        },
        setTimeEnd() {
            let endTimeStamp = new Date().getTime();
            let time = (endTimeStamp - this.startTimeStamp) //milisecond
            this.startTimeStamp = null;
            return time;
        },
        onTouchStart(e) {
            // 记录起始位置
            this.startX = e.touches[0].pageX;
            this.startY = e.touches[0].pageY;
        },
        onTouchMove(e) {
            // 计算手指移动距离
            const deltaX = e.touches[0].pageX - this.startX;
            const deltaY = e.touches[0].pageY - this.startY;
            // 判断是否为左右滑动
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // 阻止页面滚动
                e.preventDefault();
                // 判断方向，左滑为负数，右滑为正数
                this.direction = deltaX > 150 ? 1 : -1;
            }
        },
        onTouchEnd(e) {
            //console.log(this.direction);
            // 手指离开屏幕后重置方向
            if (this.direction < 0) {
                this.changePage('next');
            } else if (this.direction > 0) {
                this.changePage('prev');
            }
            this.direction = 0;
        },
        getRenrenData() {
            let word = localStorage.getItem("currentWord")
            getRenRen(word).then((data) => {
                this.renrenData = data;
                //console.log(data);
            });
        },
        addMouseUpToastMenuEvent() {
            document.onmouseup = this.toastMenuShow;
            //window.addEventListener('mouseup', this.toastMenuShow);
        },
        removeMouseUpToastMenuEvent() {
            //window.removeEventListener('mouseup', this.toastMenuShow);
            document.onmouseup = null;
        },
        async celebrate() {
            StatusContainer.winInARow += 1;
            //console.log(StatusContainer.winInARow);
            let inArow = StatusContainer.winInARow;
            if (inArow === 5) {
                const jsConfetti = new JSConfetti();
                await jsConfetti.addConfetti()
            }

            if (inArow === 10) {
                StatusContainer.winInARow = 0;
                showDialog({
                    title: this.textSeleted,
                    content: `<div>${getQuotation()}</div>`,
                    onCancel: () => {
                        console.log("cancel");
                    },
                    onOk: () => {
                        console.log("ok");
                    }
                })
            }
        },
        starHandle() {
            let wordID = localStorage.getItem("currentWordID");
            console.log("star:" + wordID);
            this.currentWordStar = !this.currentWordStar;
            starWord(wordID, this.currentWordStar).then((data) => {
                showNotify.success('Star updated successfully');
            });
        },
        setStar(ifStar) {
            this.currentWordStar = ifStar;
        },
        reportBugHandle() {
            let wordID = localStorage.getItem("currentWordID");
            this.removeMouseUpToastMenuEvent();
            showDialog({
                title: this.textSeleted,
                content: `<textarea  id="bugInput" type="text" placeholder="bug description" />`,
                onCancel: () => {
                    console.log("cancel");
                    this.addMouseUpToastMenuEvent();
                },
                onOk: () => {
                    let bug = document.getElementById("bugInput").value;
                    reportWordBug(wordID, bug).then((data) => {
                        showNotify.success('Bug report submitted successfully');
                    });
                    this.addMouseUpToastMenuEvent();
                }
            });
            //console.log("report bug:" + wordID);
            reportWordBug(wordID, "222");
        },
        addSlideSupport() {
            window.addEventListener('touchstart', this.onTouchStart, { passive: false });
            window.addEventListener('touchmove', this.onTouchMove, { passive: false });
            window.addEventListener('touchend', this.onTouchEnd, { passive: false });
        },
        removerSlideSupport() {
            window.removeEventListener('touchstart', this.onTouchStart, { passive: false });
            window.removeEventListener('touchmove', this.onTouchMove, { passive: false });
            window.removeEventListener('touchend', this.onTouchEnd, { passive: false });
        },
        switchMoveBtnShow() {
            console.log("switchMoveBtnShow");
            this.moveBtnShow = !this.moveBtnShow;
        },
    },

    mounted() {
        this.addMouseUpToastMenuEvent();
        this.addSlideSupport();
        this.getRenrenData();
    },
    beforeUnmount() {
        this.removeMouseUpToastMenuEvent();
        this.removerSlideSupport();
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
<style>
.dialog-content {
    text-align: left !important;
    word-break: break-all !important;
    position: relative;
}

.hide {
    display: none;
}

#bugInput {
    /* hide out line */
    outline: none;
    width: calc(100% - 48px);
    height: 70px;
    position: absolute;
    top: 24px;
    left: 24px;
    border: 1px solid #ccc;
    resize: none
}
</style>