<template>
    <div class="cells-container">
        <nut-cell-group>
            <div class="tip-text settings-text">Card display method</div>
            <nut-cell>
                <nut-radio-group v-model="cardDisplayMode" direction="horizontal" @change="displayModechangeHandler">
                    <nut-radio label="1">Word</nut-radio>
                    <nut-radio label="2">Example</nut-radio>
                    <nut-radio label="3">Explain</nut-radio>
                </nut-radio-group>
            </nut-cell>
        </nut-cell-group>
        <div class="input-cell">
            <nut-cell-group>
                <div class="tip-text settings-text">Daily Words</div>
                <nut-cell>
                    <nut-input-number v-model="dailyWordsNum" @change="dailyWordsNumChangeHandler" />
                </nut-cell>
            </nut-cell-group>
        </div>
        <div class="input-cell">
            <div class="tip-text settings-text">Report Bug</div>
            <nut-textarea v-model="bugText" :rows="5" autosize limit-show max-length="140"
                placeholder="Enter bug description" />
            <nut-button size="small" type="primary" color="blue" class="bug-btn" v-show="bugText"
                @click="reportBugs">Submit</nut-button>
        </div>
    </div>
</template>
<script>
import StatusContainer from "../statusContainer.js"
import { getSettings, setSetting, submitBug } from "../Tools";
import { showNotify } from '@nutui/nutui';
export default {
    data() {
        return {
            cardDisplayMode: "",
            dailyWordsNum: 0,
            bugText: "",
        }
    },
    mounted() {
        getSettings().then((settings) => {
            this.cardDisplayMode = String(settings.cardDisplayMode);
            this.dailyWordsNum = settings.dailyWordsNum;
        });
    },
    methods: {

        displayModechangeHandler(value) {
            //console.log(value);
            let settings = {
                cardDisplayMode: value,
            };
            setSetting(settings).then(() => {
                //console.log("set settings success");
                getSettings();
            });
        },

        dailyWordsNumChangeHandler(value) {
            let settings = {
                dailyWordsNum: value,
            };
            setSetting(settings).then(() => {
                getSettings();
            });
        },
        reportBugs() {
            console.log(this.bugText);
            let data = {
                content: this.bugText,
                status: 0,
                time: new Date(),
            }

            submitBug(data).then((res) => {
                console.log(res);
                showNotify.success('Bug report submitted successfully');
                this.bugText = "";
            });
        }
    }
};
</script>
<style scoped>
.cells-container {
    background-color: #fafafa;
    overflow: auto;
    box-sizing: border-box;
    padding: 0px 5px;
    height: calc(100vh - 50px - 45px);
}

.settings-text {
    margin-left: 25px;
}

.bug-btn {
    margin-top: 5px;
    float: right;
}
</style>