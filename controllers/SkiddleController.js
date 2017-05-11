const request = require('request-promise');
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var dd2= dd +6;

//to get correct date format
if(dd<10) {
  dd='0'+dd;
}

if(dd2<10) {
  dd='0'+dd;
}

if(mm<10) {
  mm='0'+mm;
}

today = yyyy+'-'+mm+'-'+dd;
var tomorrow = yyyy+'-'+mm+'-'+dd2;

//Make request to API, must have tickets avaliable 
const eventsIndex = (req, res, next) => {
  request({
    url: 'http://www.skiddle.com/api/v1/events/',
    method: 'GET',
    qs: {
      latitude: 51.507558,
      longitude: -0.127625,
      radius: 10,
      ticketsavailable: 1,
      minDate: today,
      maxDate: tomorrow,
      eventcode: 'LIVE',
      api_key: process.env.SKIDDLE_KEY
    },
    json: true
  })
  .then((data) => {
    console.log(data);
    res.render('statics/map', {data: data.results});

  })
  .catch(next);
};

module.exports = {eventsIndex};
