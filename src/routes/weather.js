const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', function(req, res) {
    res.render('weather', {
        city: null,
        des: null,
        icon: null,
        temp: null,
        country: null,
        pressure: null,
        humidity: null,
        mintemp: null,
        maxtemp: null,
        windspeed: null,
        winddirection: null
    });
})

router.post("/", async(req, res) => {

    const city = req.body.cityName;
    const apiKey = "ad5fc35b66c4ba8308f9191b955607a8";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;    
    
    try {
        await fetch(url)
        .then(res => res.json())
        .then(weatherData => {
            if (weatherData.message === 'city not found') {
                res.render('weather', {
                    city: weatherData.message,
                    des: null,
                    icon: null,
                    temp: null,
                    country: null,
                    pressure: null,
                    humidity: null,
                    mintemp: null,
                    maxtemp: null,
                    windspeed: null,
                    winddirection: null
            })
        } else {
            const city = weatherData.name;
            const country = weatherData.sys.country;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const temp = weatherData.main.temp;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;
            const mintemp = weatherData.main.temp_min;
            const maxtemp = weatherData.main.temp_max;
            const windspeed = weatherData.wind.speed;
            const winddirection = weatherData.wind.deg;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.render('weather', {
                city,des,icon,temp,country,pressure,humidity,mintemp,maxtemp,windspeed,winddirection
            });
         }
      });

    } catch (err) {
        res.render('weather', {
            city: 'Error! Try Again',
            des: null,
            icon: null,
            temp: null,
            country: null,
            pressure: null,
            humidity: null,
            mintemp: null,
            maxtemp: null,
            windspeed: null,
            winddirection: null
        })
    } 

})


  module.exports = router;