export default class StatusContainer {
    static getWords = {};
    static currentWord = '';
    static fetchWords() {
        return new Promise((resolve, reject) => {
            fetch('src/output.json')
                .then(response => response.json())
                .then(data => {
                    StatusContainer.getWords = data;
                    resolve(data);
                });
        });
    }
}