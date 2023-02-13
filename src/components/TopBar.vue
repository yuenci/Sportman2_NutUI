<template lang="">
    <nut-navbar  :title="titleName">
            <!-- <template #left>
                <div></div>
            </template>
            <template #right>
                <ShareN width="16px"></ShareN>
            </template> -->
        </nut-navbar>
</template>
<script>
export default {
    data() {
        return {
            titleName: "Words",
        }
    },

    created() {
        switch (this.$route.path) {
            case "/words":
                this.titleName = "Words";
                break;
            case "/learning":
                this.titleName = "Learning";
                break;
            case "/data":
                this.titleName = "Data";
                break;
            default:
                break;
        }
    }
}
</script>
<style lang="">
    
</style>