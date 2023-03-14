var search = document.querySelector('.search')
var city = document.querySelector('.city')
var country = document.querySelector('.country')
var temperature = document.querySelector('.temperature')
var description = document.querySelector('.description')
var visibility = document.querySelector('.visibility span')
var winds = document.querySelector('.winds span')
var humidity = document.querySelector('.humidity span')
var time = document.querySelector('.time')
var content = document.querySelector('.content')
var body = document.querySelector('body')

content.classList.add('hide');
async function chanceWeather(){
    let captitalSearch = search.value.trim()
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${captitalSearch}&appid=f199f2bf43c301968eb55028999f472f`
    let data = await fetch(apiURL).then(res => res.json());
    if(data.cod == 200){
        content.classList.remove('hide');
        city.innerText = data.name
        country.innerText = data.sys.country
        temperature.innerText = Math.round(data.main.temp - 273.15) + ' °C'
        description.innerText = data.weather[0].description
        visibility.innerText = data.visibility + 'm'
        winds.innerText = data.wind.speed + 'm/s'
        humidity.innerText = data.main.humidity + '%'
        time.innerText = new Date().toLocaleString('vi')
    }
    else{
        content.classList.add('hide');
    }
    if(Math.round(data.main.temp - 273.15) < 15){
        body.setAttribute('class', 'cold')
    }
    if(data.weather[0].description.includes('rain') == true){
        body.setAttribute('class', 'rain')
    }
    if(data.weather[0].description.includes('rain') == false && Math.round(data.main.temp - 273.15) > 15){
        body.setAttribute('class', 'sun')
    }
    
    if(Math.round(data.main.temp - 273.15) <= 2 && data.weather[0].description.includes('rain') == true){
        body.setAttribute('class', 'sleet')
    }
}

search.addEventListener('keypress', function(e){
    if (e.code === 'Enter'){
        chanceWeather()
    }
})