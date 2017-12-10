const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  var APIKEY='AIzaSyBjdERQ1zETO1gchXKH38ZD1B_tF2n9fHE';

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${APIKEY}&address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (body.status === "OK") {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Address not found');
    } else {
      callback('Unable to connect to servers');
    }
  });
}

module.exports.geocodeAddress = geocodeAddress;






