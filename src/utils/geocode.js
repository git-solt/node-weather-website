
const request = require('request')


const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYXBpc29sdCIsImEiOiJjazJybTQ4YnYwcmJzM2NvM3B4dnNsaHIwIn0.VnaWAqw1Qnqgm00xQqHzKg&limit=1'

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to service')
    } else if (body.features.length < 1) {
      callback('Unable to find location. Please try a different search')
    } else {
      const {features} = body
      const {place_name, center} = features[0]
      callback(undefined, {
        location: place_name,
        latitude: center[1],
        longitude: center[0]
      })
    }
  })

}

module.exports = geocode