const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

 var encodedAddress = encodeURIComponent(argv.address);
 var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBjdERQ1zETO1gchXKH38ZD1B_tF2n9fHE&address=${encodedAddress}`;

 axios.get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      //this immediately stops the flow
      throw new Error('Unable to find that address.');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/a88ae7e3249f0c8be2b249f3de2bce34/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl).then((response) => {
      var temperature = response.data.currently.temperature;
      var apparentTemperature = response.data.currently.apparentTemperature;
      console.log(`It's currently ${temperature}, and it feels like ${apparentTemperature}.`);
    });
  })
 .catch((e) => {
   if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API severs.');
   } else {
     console.log(e.message);
   }
 });