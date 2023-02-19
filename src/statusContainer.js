export default class StatusContainer {
    static getWords = {};
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
}