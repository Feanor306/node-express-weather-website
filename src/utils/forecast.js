const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/939b8e9f68876cd94daad95214ad5fa9/" + encodeURIComponent(lattitude) + "," + encodeURIComponent(longitude) + "?units=si"
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            callback(undefined,{
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability,
                stringForm: body.currently.summary + ". Temperature: " + body.currently.temperature + "C. Chance of rain: " + body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast