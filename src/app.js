const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// Setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)


// Setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: '-__ Weather _-_',
    name: 'Andrew Mead'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpmsg: 'If you need help, relax, be patient and try to think',
    title: 'Help page',
    name: 'Andrew Mead'
  })
})

app.get('/products', (req, res) => {

  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, success) => {
    if (error) {
      return res.send({
        error
      })
    }
    const {longitude, latitude, location} = success
    forecast(longitude, latitude, (error, data) => {
      if(error) {
        res.send({
          error
        })
      }
      res.send({
        location,
        address: req.query.address,
        temperature: data.temperature,
        forecast: data.summary
      })
    })
  })

})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Andrew Mead'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    notfoundMsg: 'Help article not found',
    name: 'Some Noob'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Some Noob',
    notfoundMsg: 'Page not found'
  })
})


app.listen(3001, () => {
  console.log('server is up')
})