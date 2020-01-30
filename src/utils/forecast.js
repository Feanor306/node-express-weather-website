const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/" + process.env.DARKSKY_KEY + "/" + encodeURIComponent(lattitude) + "," + encodeURIComponent(longitude) + "?units=si"
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            callback(undefined, {
                // CLEANUP LATER
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability,
                now: body.currently,
                hours: body.hourly,
                days: body.daily,
                stringForm: body.currently.summary + ". Temperature: " + body.currently.temperature + "C (MIN " + body.daily.data[0].temperatureMin + "C - MAX " + body.daily.data[0].temperatureMax + "C). Chance of rain: " + body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast