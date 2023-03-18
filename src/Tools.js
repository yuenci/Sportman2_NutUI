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

export { logLearingTime, getDuration, getSettings, setSetting, submitBug }

