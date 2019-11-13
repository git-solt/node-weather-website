const request = require('request')


const forecast = (longitude, latitude, callback) => {

  const url = `https://api.darksky.net/forecast/6cc77fac98e4253f89b2c0648eb4a8c1/${latitude},${longitude}?lang=no&units=si&exclude=flags,alerts,hourly,minutely`

  request({
    url,
    json: true
  }, (error, {body}) => {
    if(error) {
      callback('Unable to connecto to service. Check connection')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, {
        instance: body.currently,
        time: body.currently.time,
        summary: body.currently.summary,
        temperature: body.currently.temperature,
        daily: body.daily.data[0]
      })
    }
  })
}

module.exports = forecast