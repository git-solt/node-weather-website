



const locationInput = document.querySelector('input')
const btn = document.querySelector('button')
const weatherForm = document.querySelector('form')
const forecastMsg = document.querySelector('#forecastMsg')
const noForecast = document.querySelector('#no-forecast')


btn.disabled = true


locationInput.addEventListener('input', (e) => {
  
  btn.disabled = !locationInput.value
  
})

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = e.target.elements.location.value.trim()

  forecastMsg.textContent = 'Loading....'

  fetch('/weather?address=' + location)
    .then((response) => {
      
      response.json()
        .then((data) => {
          
          if (data.error) {

            forecastMsg.textContent = ''

            noForecast.textContent = data.error

          } else {

            noForecast.textContent = ''

            forecastMsg.textContent = 'Location: ' + data.location + ' Forecast: ' + data.forecast + ', current temperature is ' + data.temperature + ' °C'

          }
        })
    })

  e.target.elements.location.value = ''

  btn.disabled = true
})