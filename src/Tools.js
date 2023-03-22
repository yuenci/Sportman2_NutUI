import { async } from '@firebase/util';
import { url, PEXELS_Key } from './config.js'
import StatusContainer from './statusContainer.js';
import FBStore from './storeHandler.js';
import { configs } from './config.js';

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

async function chatWithChatGPT(message, word) {
    let data = {
        message: message,
        word: word
    }
    let res = await fetchs('POST', url + '/chat', data);
    return res;
}

async function getImage(word) {
    let options = {
        headers: {
            Authorization: PEXELS_Key
        }
    };
    let response = await fetch(`https://api.pexels.com/v1/search?query=${word}&per_page=1`, options);
    let json = await response.json();
    return json;
}

async function addWord(data) {
    let res = await fetchs('POST', url + '/word', data);
    return res;
}

async function speechS(text) {
    const SPEECH_REGION = configs.serviceRegion;
    const SPEECH_KEY = configs.subscriptionKey;

    const url = `https://${SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const data = `<speak version='1.0' xml:lang='en-US'>
                        <voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>
                            ${text}
                        </voice>
                        </speak>`;

    const requestOptions = {
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": SPEECH_KEY,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
            "User-Agent": "curl"
        },
        body: data
    };


    // fetch(url, requestOptions)
    //     .then(response => response.arrayBuffer())
    //     .then(data => {
    //         //console.log(data);
    //         const blob = new Blob([data], { type: "audio/mp3" });
    //         const url = window.URL.createObjectURL(blob);
    //         return url;
    //     })
    //     .catch(error => console.log(error));


    let response = await fetch(url, requestOptions)
    let bufferData = await response.arrayBuffer();
    const blob = new Blob([bufferData], { type: "audio/mp3" });
    return window.URL.createObjectURL(blob)


}

export {
    logLearingTime, getDuration, getSettings, setSetting, submitBug,
    getTodaysPlan, getRenRen, reportWordBug, starWord, getTodayPlanNum,
    chatWithChatGPT, getImage, addWord, speechS
}

