const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1vbnR2bCIsImEiOiJjbGwxOGw0ejgxbzI3M2xsbHU0Y3p6NmE1In0.bAZjwjlF1K7Pvr-CCbud_g&limit=1';

    request({
        url,
        json:true
    }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services.', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location.', undefined);
        } else {            
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    });
}

module.exports = geocode