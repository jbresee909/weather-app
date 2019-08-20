const request = require('request')


const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/53e0b2ab61d2712dbe3c0272de05b930/' + latitude + ',' + longitude
    request({url: url, json: true}, (error,{ body }) => {
        if (error) {
            callback('Not connected to the Internet', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'The current temperature is ' + body.currently.temperature + '. There is curreenlt a humidity level of ' + body.currently.humidity); 
        }
    })
    }

module.exports = forecast