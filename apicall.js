document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').onsubmit = function () {
        const city_selected = document.querySelector('#city').value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_selected}&appid=0d0715be6bc7128de95c97da7d096973`).
            then(response => response.json()).
            then(weather_data => {
                console.log(weather_data);
                var outerdiv = document.createElement('div');
                outerdiv.id = "outerdiv"
                var innerdiv = document.createElement('div');
                innerdiv.id = "innerdiv"
                innerdiv.className="time_pad"
                var description = document.createElement('div');
                var div = document.createElement('div');
                div.innerHTML = `The weather is now ${weather_data.weather[0].main}`;
                div.id = "current_weather"
                if(weather_data.weather[0].main=="Rain"){
                    div.style.background="url('https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png')"
                } else {
                    div.style.background= "url('https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png')"
                }
                description.innerHTML = `If you look out of your window you'll see ${weather_data.weather[0].description}`;
                description.id = "description"
                var tempdiv = document.createElement('div');
                tempdiv.innerHTML = `It's now ${weather_data.main.temp} degrees`;
                tempdiv.id = "tempdiv"
                var feels = document.createElement('div');
                feels.innerHTML = `It feels like ${ weather_data.main.feels_like }`;
                feels.id = "feels"

                innerdiv.appendChild(description);
                innerdiv.appendChild(tempdiv);
                innerdiv.appendChild(feels);
                div.appendChild(innerdiv);
                outerdiv.appendChild(div);
                document.body.appendChild(outerdiv);
            })
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city_selected}&appid=0d0715be6bc7128de95c97da7d096973`).
            then(response => response.json()).
            then(forecast_data => {
                console.log(forecast_data);
            for(let i=0; i<40; i++) {
                console.log(forecast_data.list[i].weather[0].main);
                var outerforecastdiv = document.createElement('div');
                outerforecastdiv.id = "outerforecastdiv"
                var div = document.createElement('div');
                div.className ="weather"
                div.innerHTML = forecast_data.list[i].weather[0].main;
                var div_time= document.createElement('div');
                div_time.id='time';
                div_time.innerHTML=forecast_data.list[i].dt_txt;
                div_time.className = 'time_pad';
                div.appendChild(div_time);
                outerforecastdiv.appendChild(div);
                if(forecast_data.list[i].weather[0].main=="Rain"){
                    div.style.background="url('https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png')"
                } else {
                    div.style.background= "url('https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png')"
                }
                
                document.body.appendChild(outerforecastdiv);
            }
            $('.time_pad').hover(function() {
                $(this).fadeTo(1,1);
            },function() {
                $(this).fadeTo(1,0);
            });
            })
        return false;
    }
})
