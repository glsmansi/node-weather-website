const request = require('request')

const forecast = (a, b, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b02c8c68c4cadeeb83db62abb4663d2f&query=' + a + ',' + b + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to load page', undefined)
        } else if (body.error) {
            callback("unable to load page. please try again", undefined)
        } else {
            callback(undefined, body.location.lat + ' is latitude ' + body.location.lon + ' is longitude')
        }
    })

}

module.exports = forecast