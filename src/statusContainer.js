export default class StatusContainer {
    static getWords = {};
    static getWordsArray = [];
    static currentWord = '';
    static startTimeStamp = 0;
    static fetchWords() {
        return new Promise((resolve, reject) => {
            fetch('/output.json')
                .then(response => response.json())
                .then(data => {
                    StatusContainer.getWords = data;
                    resolve(data);
                });
        });
    }

    static fetchWordsArray() {
        return new Promise((resolve, reject) => {
            fetch('/output.json')
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    let arrayData = StatusContainer.dictToArray(data);
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


    static defaultSetting = {
        cardDisplayMode: 1,
    };
}