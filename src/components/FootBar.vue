<template>
    <nut-tabbar @tab-switch="tabSwitch" class="tabbar-bottom" v-model="active">
        <nut-tabbar-item tab-title="Words">
            <template #icon>
                <Order></Order>
            </template>
        </nut-tabbar-item>
        <nut-tabbar-item tab-title="Inbox">
            <template #icon>
                <Addfollow></Addfollow>
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
        <nut-tabbar-item tab-title="Setting">
            <template #icon>
                <Setting></Setting>
            </template>
        </nut-tabbar-item>
    </nut-tabbar>
</template>
<script>
import { Order, Heart, Category, Setting, Addfollow } from '@nutui/icons-vue';
import PubSub from 'pubsub-js';

export default {
    components: { Order, Heart, Category, Setting, Addfollow },
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
                    this.$router.push('/inbox');
                    break;
                case 2:
                    this.$router.push('/learning');
                    break;
                case 3:
                    this.$router.push('/data');
                    break;
                case 4:
                    this.$router.push('/settings');
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
                this.active = 3;
                break;
            default:
                this.active = 1;
                break;
        }
    },
    mounted() {
        PubSub.subscribe('changeTab', (msg, data) => {
            if (data.message === 'learn') {
                this.active = 2;
            }
        });
    },
    beforeDestroy() {
        PubSub.unsubscribe('changeTab');
    }
}
</script>
<style></style>