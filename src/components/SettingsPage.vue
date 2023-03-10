<template>
    <nut-cell-group title="Card display method">
        <nut-cell>
            <nut-radio-group v-model="cardDisplayMode" direction="horizontal" @change="changeHandler">
                <nut-radio label="1">Word</nut-radio>
                <nut-radio label="2">Example</nut-radio>
                <nut-radio label="3">Explain</nut-radio>
            </nut-radio-group>
        </nut-cell>
    </nut-cell-group>
</template>
<script>
import StatusContainer from "../statusContainer.js"
export default {
    data() {
        return {
            cardDisplayMode: "1",
        }
    },
    mounted() {
        let settingsLocal = localStorage.getItem("settings");
        if (settingsLocal) {
            this.cardDisplayMode = JSON.parse(settingsLocal).cardDisplayMode;
        } else {
            let defaultSetting = StatusContainer.defaultSetting;
            this.storeNewSettings(defaultSetting);
            this.cardDisplayMode = defaultSetting.cardDisplayMode;
        }
    },
    methods: {
        show() {
            console.log(this.settings);
        },
        storeNewSettings(settings) {
            localStorage.setItem("settings", JSON.stringify(settings));
        },
        changeHandler(value) {
            let settings = {
                cardDisplayMode: value,
            }
            this.storeNewSettings(settings);
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
</style>