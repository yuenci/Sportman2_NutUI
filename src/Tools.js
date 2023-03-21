import { async } from '@firebase/util';
import { url } from './config.js'
import StatusContainer from './statusContainer.js';
import FBStore from './storeHandler.js';

const fbStore = new FBStore();

async function fetchs(method, url, data) {
    let options = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    let response = await fetch(url, options)
    let json = await response.json()
    return json
}


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


async function getTodaysPlan() {
    let dailyWordsNum = StatusContainer.settingsCache.dailyWordsNum;
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            num: dailyWordsNum
        })
    }
    let response = await fetch(url + '/plan', options)
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

async function getRenRen(word) {
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            word: word
        })
    }
    let response = await fetch(url + '/renren', options);
    let json = await response.json()
    return json.res;
}

async function reportWordBug(id, bug) {
    let data = {
        _id: id,
        bug: bug
    }
    let res = await fetchs('POST', url + '/report', data);
    return res;
}

async function starWord(id, star) {
    let data = {
        _id: id,
        star: star
    }
    let res = await fetchs('POST', url + '/star', data);
    return res;
}


async function getTodayPlanNum() {
    let response = await fetch(url + '/days')
    let json = await response.json()
    return json;
}

export {
    logLearingTime, getDuration, getSettings, setSetting, submitBug,
    getTodaysPlan, getRenRen, reportWordBug, starWord, getTodayPlanNum
}

