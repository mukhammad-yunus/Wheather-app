const weatherEl = document.getElementById('weather')
const formEl = document.querySelector('form')
const cityName = document.getElementById('city-input')
const apiKey = '0815e83cc2d12319ef0557ad6668e857'
formEl.addEventListener('submit', (e)=>{
    e.preventDefault()
    const cityValue = cityName.value
    getWeatherInfo(cityValue)

})

async function getWeatherInfo(cityValue){
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
          )

        if(!res.ok){
            throw new Error('Network response is not okay')
        }
        const data = await res.json()
        
        const icon = data.weather[0].icon
        const temp = Math.round(data.main.temp)
        const description = data.weather[0].description
        const feels = Math.round(data.main.feels_like)
        const humidity = data.main.humidity
        const windSpeed = data.wind.speed


        document.getElementById('weather').innerHTML =  `
        <p class="city">Weather in <span class="bold">${cityValue.charAt(0).toUpperCase() + cityValue.slice(1)}</span></p>
        <div class="weather-data">
            <div class="weather">
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
                <p class="temperature">${temp}°C</p>
            </div>
            <p class="description">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        </div>
        <div class="flex-column">
            <p>Feels like:<span class="bold">${feels}°C</span></p>
            <p>Humidity: <span class="bold">${humidity}%</span></p>
            <p>Wind speed:<span class="bold">${windSpeed} m/s</span></p>
        </div>`

        
    } catch (error) {
        document.getElementById('weather').innerHTML =  `<div class="error-message">Invalid city name. Try again and make sure that the spelling is correct.</div>`
    }
}
