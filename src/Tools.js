import { url } from './config.js'


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


export { logLearingTime }

