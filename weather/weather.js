var request = require('request');

var getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/a88ae7e3249f0c8be2b249f3de2bce34/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to forecast.io service.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;
