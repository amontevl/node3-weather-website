const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0e57637d3a91430c4ed1e51e4d0ec54c&units=m&query=' + latitude + ',' + longitude + '';

    request({
        url,
        json:true
    }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined);
        } else if(body.error) {
            callback('Unable to find location.', undefined);
        } else {            
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.');
        }
    });
}

module.exports = forecast