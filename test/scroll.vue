<template>
    <div>
        <div v-for="(item, index) in visibleWords" :key="index">
            <WordCard :word="item[0]" :explain="item[1]" />
        </div>
        <div ref="sentinel" style="height: 1px;"></div>
    </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import WordCard from "./WordCard.vue";

export default {
    components: { WordCard },
    props: {
        words: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const visibleWordsCount = 20; // 每次加载20个单词
        const visibleWordsIndex = ref(0); // 当前可见单词数组的索引

        const visibleWords = ref([]);
        const allWordsLoaded = ref(false);

        // 计算当前可见的单词数组
        watchEffect(() => {
            const start = visibleWordsIndex.value;
            const end = start + visibleWordsCount;
            visibleWords.value = props.words.slice(start, end);
            allWordsLoaded.value = end >= props.words.length;
        });

        // 加载更多单词
        const loadMore = () => {
            visibleWordsIndex.value += visibleWordsCount;
        };

        // IntersectionObserver 回调函数，用来监听 Sentinel 元素是否进入视窗
        const handleIntersection = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !allWordsLoaded.value) {
                    loadMore();
                }
            });
        };

        // 创建 IntersectionObserver 实例
        const observer = ref(
            new IntersectionObserver(handleIntersection, {
                rootMargin: "0px",
                threshold: 1.0
            })
        );

        // 监听 Sentinel 元素
        watchEffect(() => {
            observer.value.observe($refs.sentinel);
        });

        return {
            visibleWords,
            allWordsLoaded,
            $refs
        };
    }
};
</script>
