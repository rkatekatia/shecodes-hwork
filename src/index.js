let now = new Date()
let indexDay = now.getDay()
let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

let day = days[indexDay]
let hour = now.getHours()
if (hour < 10) {
  hour = `0${hour}`
}
let minutes = now.getMinutes()
if (minutes < 10) {
  minutes = `0${minutes}`
}

let today = document.querySelector('#current-day')
today.innerHTML = `${day}, ${hour}:${minutes}`

///Select city

function currentWeather(response) {
  let temp = Math.round(response.data.main.temp)
  let currentTemp = document.querySelector('#current-temp')
  currentTemp.innerHTML = `${temp}°C`

  let currentHumidity = response.data.main.humidity
  let humidity = document.querySelector('#humidity')
  humidity.innerHTML = `Humidity: ${currentHumidity}%`

  let currentWind = Math.round(response.data.wind.speed)
  let wind = document.querySelector('#wind')
  wind.innerHTML = `Wind: ${currentWind} km/h`

  let cityName = document.querySelector('h1')
  cityName.innerHTML = response.data.name
}

function showCity(city) {
  let apiKey = '9fd9c2bff678d83f4a84f9e1bbc28a9d'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(currentWeather)
}

function selectCity(event) {
  event.preventDefault()
  let city = document.querySelector('#input-city').value
  showCity(city)
}

let searchButton = document.querySelector('#search-button')
searchButton.addEventListener('click', selectCity)

///Current geolocation

function myLocation(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude

  let apiKey = '9fd9c2bff678d83f4a84f9e1bbc28a9d'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(currentWeather)
}

function getLocation(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(myLocation)
}

let myLocationBtn = document.querySelector('#my-location')
myLocationBtn.addEventListener('click', getLocation)
