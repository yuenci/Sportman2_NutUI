<template lang="">
    <div class="cells-container">
        <div class="input-cell">
            <div class="tip-text">Word</div>
            <nut-input  v-model="word"  placeholder="Type a word" />
        </div>
         <div class="input-cell">
            <div class="tip-text">Explain</div>
             <nut-textarea v-model="explain" :rows="5" autosize limit-show max-length="140" placeholder="Enter the explain" />
        </div>
         <div class="input-cell">
            <div class="tip-text">Learner example</div>
            <nut-textarea v-model="learnerExample" :rows="5" autosize limit-show max-length="140" placeholder="Enter the Learner example" />
        </div>
         <div class="input-cell">
            <div class="tip-text">Dictory example</div>
            <nut-textarea v-model="dictoryExample" :rows="5" autosize limit-show max-length="140"  placeholder="Enter the Dictory example" />
        </div>
        <nut-button block type="primary" class="enter-btn" @click="addWord">Yes !</nut-button>
    </div>
    
</template>
<script>
import { showNotify } from '@nutui/nutui';

export default {
    data() {
        return {
            word: '',
            explain: '',
            learnerExample: '',
            dictoryExample: '',
        }
    },
    methods: {
        addWord() {
            let url = "http://127.0.0.1:4999"
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

.tip-text {
    font-size: 14px;
    color: #909ca4;
    margin: 10px 28px;
}

.input-cell {
    margin-bottom: 30px;
}
</style>