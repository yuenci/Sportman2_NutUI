<template>
    <nut-tabbar @tab-switch="tabSwitch" class="tabbar-bottom" v-model="active">
        <nut-tabbar-item tab-title="Words">
            <template #icon>
                <Order></Order>
            </template>
        </nut-tabbar-item>
        <nut-tabbar-item tab-title="Learn">
            <template #icon>
                <Heart></Heart>
            </template>
        </nut-tabbar-item>
        <nut-tabbar-item tab-title="Data">
            <template #icon>
                <Category></Category>
            </template>
        </nut-tabbar-item>
    </nut-tabbar>
</template>
<script>
import { Order, Heart, Category } from '@nutui/icons-vue';
export default {
    components: { Order, Heart, Category },
    data() {
        return {
            active: 2,
        }
    },
    methods: {

        tabSwitch(item, index) {
            //console.log(item, index);
            switch (index) {
                case 0:
                    this.$router.push('/words');
                    break;
                case 1:
                    this.$router.push('/learning');
                    break;
                case 2:
                    this.$router.push('/data');
                    break;
                default:
                    break;
            }
        }
    },
    created() {
        let url = this.$route.path;
        switch (url) {
            case '/words':
                this.active = 0;
                break;
            case '/data':
                this.active = 2;
                break;
            default:
                this.active = 1;
                break;
        }
    },
}
</script>
<style>

</style>