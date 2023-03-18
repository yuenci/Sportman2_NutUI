import { url } from "./config";
export default class StatusContainer {
    static getWords = null;
    static getWordsArray = null;
    static currentWord = '';
    static startTimeStamp = 0;
    static wordStartTimeStamp = 0;
    static settingsCache = null;
    static todaysPlanArray = null;
    static startTodaysPlan = false;

    static fetchWords() {
        return new Promise((resolve, reject) => {
            if (StatusContainer.getWords) {
                resolve(StatusContainer.getWords);
            }

            fetch(url + '/words')
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    let dictData = StatusContainer.arrayToDict(data.allWords);
                    StatusContainer.getWords = dictData;
                    resolve(data);
                }).catch(err => {
                    console.log(err);
                });
        });
    }

    static fetchWordsArray() {
        return new Promise((resolve, reject) => {
            if (StatusContainer.getWordsArray) {
                resolve(StatusContainer.getWordsArray);
            }
            fetch(url + '/words')
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    let arrayData = StatusContainer.dictToArray(data.allWords);
                    StatusContainer.getWordsArray = arrayData;
                    resolve(arrayData);
                }).catch(err => {
                    console.log(err);
                });
        });
    }

    static dictToArray(dict) {
        let arr = [];
        for (let key in dict) {
            arr.push([dict[key].word, dict[key].explain, dict[key].learner_example, dict[key]._id]);
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