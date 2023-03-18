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
                    <nut-input-number v-model="dailyWordsNum" />
                </nut-cell>
            </nut-cell-group>
        </div>
        <div class="input-cell">
            <div class="tip-text settings-text">Report Bug</div>
            <nut-textarea v-model="bugText" :rows="5" autosize limit-show max-length="140"
                placeholder="Enter bug description" />
            <nut-button size="small" type="primary" color="blue" class="bug-btn" v-show="bugText">Submit</nut-button>
        </div>
    </div>
</template>
<script>
import StatusContainer from "../statusContainer.js"
import { getSettings, setSetting } from "../Tools";
export default {
    data() {
        return {
            cardDisplayMode: "1",
            dailyWordsNum: 0,
            bugText: "",
        }
    },
    mounted() {
        getSettings().then((settings) => {
            this.cardDisplayMode = String(settings.cardDisplayMode);
        });
    },
    methods: {
        show() {
            console.log(this.settings);
        },

        displayModechangeHandler(value) {
            console.log(value);
            let settings = {
                cardDisplayMode: value,
            };
            setSetting(settings).then(() => {
                console.log("set settings success");
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