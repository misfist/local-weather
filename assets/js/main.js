$(document).ready(function() {

    console.log('main.js');

    // get ip of users

    // look up zip code based on ip
    // https://freegeoip.net/json/ip-address

    // or look up lat / lon based on ip-address
    // return data in form
    // {"ip":"104.162.71.231","country_code":"US","country_name":"United States","region_code":"NY","region_name":"New York","city":"Brooklyn","zip_code":"11215","time_zone":"America/New_York","latitude":40.662,"longitude":-73.986,"metro_code":501}

    // get weather info based on zip code
    // api.openweathermap.org/data/2.5/weather?zip=94040,us
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=imperial
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric
    // return data in form
    // {"coord":{"lon":139,"lat":35},
    // "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
    // "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
    // "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
    // "wind":{"speed":7.31,"deg":187.002},
    // "rain":{"3h":0},
    // "clouds":{"all":92},
    // "dt":1369824698,
    // "id":1851632,
    // "name":"Shuzenji",
    // "cod":200}

    // get icon
    // change background based on
    // https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.5/css/weather-icons.min.css

});
