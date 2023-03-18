<template>
    <div class="cells-container">
        <div class="input-cell">
            <div class="tip-text">Word</div>
            <nut-input v-model="word" placeholder="Type a word" />
        </div>
        <div class="input-cell">
            <div class="tip-text">Explain</div>
            <nut-textarea v-model="explain" :rows="5" autosize limit-show max-length="140"
                placeholder="Enter the explain" />
        </div>
        <div class="input-cell">
            <div class="tip-text">Learner example</div>
            <nut-textarea v-model="learnerExample" :rows="5" autosize limit-show max-length="140"
                placeholder="Enter the Learner example" />
        </div>
        <div class="input-cell">
            <div class="tip-text">Dictory example</div>
            <nut-textarea v-model="dictoryExample" :rows="5" autosize limit-show max-length="140"
                placeholder="Enter the Dictory example" />
        </div>
        <div class="input-cell">
            <div class="tip-text">Tags</div>
            <nut-cell-group>
                <div class="tag-con">
                    <nut-tag v-for="tag in tags" :key="tag" closeable @close="removeTag" type="primary" class="tag">{{ tag
                    }}</nut-tag>

                </div>

                <!-- <nut-tag  v-if="show" closeable @close="close" type="primary">标签</nut-tag> -->

                <nut-input v-model="currentTag" placeholder="Type a tag" @keyup.enter="addTag" />
            </nut-cell-group>
        </div>
        <nut-button block type="primary" class="enter-btn" @click="addWord">Yes !</nut-button>

    </div>
</template>
<script>
import { showNotify } from '@nutui/nutui';
import { remove } from '@vue/shared';
import { url } from '../config';

export default {
    data() {
        return {
            word: '',
            explain: '',
            learnerExample: '',
            dictoryExample: '',
            currentTag: '',
            tags: [],
            show: true,
        }
    },
    methods: {
        addWord() {
            //console.log(this.word, this.explain, this.learnerExample, this.dictoryExample);
            // ues fetch send post request
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    word: this.word,
                    explain: this.explain,
                    learnerExample: this.learnerExample.split('\n'),
                    dictoryExample: this.dictoryExample.split('\n'),
                    tags: this.tags,
                }),
            }
            if (!this.valid()) return;
            fetch(`${url}/word`, options)
                .then((res) => {
                    res.json();
                    showNotify.success('Add word success');
                })
                .then((res) => {
                    console.log(res);
                });
        },
        valid() {
            // if (this.word === '' || this.explain === '' || this.learnerExample === '' || this.dictoryExample === '') {
            if (this.word === '') {
                showNotify.warn('Please enter the word');
                return false;
            }
            return true;
        },
        close() {
            this.show = false;
        },
        addTag() {
            if (this.currentTag === '') return;

            if (this.tags.includes(this.currentTag)) {
                showNotify.warn(`tag ${this.currentTag} is already exist`);
                return;
            }

            this.tags.push(this.currentTag);
            this.currentTag = '';
        },
        removeTag(event) {
            let val = event.target.parentNode.innerText;
            let newTags = this.tags.filter((tag) => tag !== val);
            this.tags = newTags;
        }
    },
};
</script>
<style scoped>
.cells-container {
    background-color: #fafafa;
    overflow: auto;
    box-sizing: border-box;
    padding: 0px 0px;
    height: calc(100vh - 50px - 45px);
    padding: 0 5px;
}

.cells-container::-webkit-scrollbar {
    display: none;
}
</style>

<style>
.tip-text {
    font-size: 14px;
    color: #909ca4;
    margin: 10px 28px;
}

.input-cell {
    margin-bottom: 30px;
}

.tag {
    margin: 0 3px;
}

.tag-con {
    min-height: 21px;
    margin: 0 28px;
}
</style>