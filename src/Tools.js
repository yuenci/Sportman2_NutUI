import { async } from '@firebase/util';
import { url } from './config.js'
import StatusContainer from './statusContainer.js';
import FBStore from './storeHandler.js';

const fbStore = new FBStore();

async function logLearingTime(id, time) {
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: id,
            duration: time
        })
    }
    //console.log(options);
    let response = await fetch(url + '/duration', options)
    let json = await response.json()
    return json
}

async function getDuration() {
    let response = await fetch(url + '/duration')
    let json = await response.json()
    return json
}

async function getSettings() {
    const res = await fbStore.readDocument("data", "settings");
    StatusContainer.settingsCache = res;
    return res;
}

async function setSetting(data) {
    const res = await fbStore.update("data", data, "settings");
    return res;
}

async function submitBug(data) {
    const res = await fbStore.write("bugs", data);
    return res;
}

function getTodayDate() {
    // get 20220318
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + "" + month + "" + day;
}

async function getTodaysPlan() {
    let dailyWordsNum = StatusContainer.settingsCache.dailyWordsNum;
    let response = await fetch(url + '/plan?num=' + dailyWordsNum)
    let json = await response.json()

    let planKeys = Object.keys(json.plan);
    let todaysPlan = [];
    for (let word of StatusContainer.getWordsArray) {
        if (planKeys.includes(word[3])) {
            todaysPlan.push(word);
        }
    }
    StatusContainer.todaysPlanArray = todaysPlan;
    // console.log(todaysPlan);
    return todaysPlan;
}

export { logLearingTime, getDuration, getSettings, setSetting, submitBug, getTodaysPlan }

