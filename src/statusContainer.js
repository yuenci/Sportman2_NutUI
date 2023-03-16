import { url } from "./config";
export default class StatusContainer {
    static getWords = {};
    static getWordsArray = [];
    static currentWord = '';
    static startTimeStamp = 0;
    static fetchWords() {
        return new Promise((resolve, reject) => {
            fetch(url + '/words')
                .then(response => response.json())
                .then(data => {
                    let dictData = StatusContainer.arrayToDict(data.allWords);
                    StatusContainer.getWords = dictData;
                    resolve(data);
                });
        });
    }

    static fetchWordsArray() {
        return new Promise((resolve, reject) => {
            fetch(url + '/words')
                .then(response => response.json())
                .then(data => {
                    //console.log(data);

                    let arrayData = StatusContainer.dictToArray(data.allWords);
                    StatusContainer.getWordsArray = arrayData;
                    resolve(arrayData);
                });
        });
    }

    static dictToArray(dict) {
        let arr = [];
        for (let key in dict) {
            arr.push([dict[key].word, dict[key].explain, dict[key].learner_example]);
        }
        return arr;
    }

    static arrayToDict(arr) {
        let dict = {};
        for (let i = 0; i < arr.length; i++) {
            let currentWordObj = arr[i];
            dict[currentWordObj.word] = currentWordObj;
        }
        return dict;
    }


    static defaultSetting = {
        cardDisplayMode: 1,
    };
}