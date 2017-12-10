const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      var encodedAddress = encodeURIComponent(address);
      request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBjdERQ1zETO1gchXKH38ZD1B_tF2n9fHE&address=${encodedAddress}`,
        json: true
      }, (error, response, body) => {
        if (body.status === "OK") {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        } else if (body.status === 'ZERO_RESULTS') {
          reject('Address not found');
        } else {
          reject('Unable to connect to servers');
        }
      });
    });

};

geocodeAddress('123232').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});