<template>
    <nut-tabbar @tab-switch="tabSwitch" class="tabbar-bottom">
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
    components: { Order, Heart, Category }
}
</script>
<style>

</style>