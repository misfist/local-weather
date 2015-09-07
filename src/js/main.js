$(document).ready(function() {

    console.log('main.js');

    const APIKEY = 'ae5ad98abb4a0a8b51d04136004b8061';

    // Get user IP
    $.getJSON( 'http://ip-api.com/json/', 
        function( data ) { 
            // console.log( data.city );
            // console.log( data.region );
            // console.log( data.lon );
            // console.log( data.lat );
            // console.log( data.zip );

            // Add city and state to page
            $( '#location .location' ).text( data.city + ', ' + data.region );

            // Default units
            var units = 'imperial';

            // Run the weather function
            loadWeather( units );

            $( '#weather-toggle' ).find( 'a#imperial' ).addClass( 'active' );

            // Set fahrenheit to active by default
            $( '#weather-toggle' ).on( 'click', 'a', function( event ) {

                //console.log( '$( this )', $( this ).attr( 'id' ) );

                // Set units to the value of clicked element
                units = $( this ).attr( 'id' );

                $( '#weather-toggle' ).find( 'a' ).removeClass( 'active' );
                $( this ).addClass( 'active' );

                // Run the weather function
                loadWeather( units );


            } );


            // Load weather function
            function loadWeather( units ) {

                $.getJSON( 'http://api.openweathermap.org/data/2.5/weather?lat=' + data.lat + '&lon=' + data.lon + '&units=' + units +'&APPID=' + APIKEY, function( weather ) {
                    console.log( weather );

                    console.log( 'weather.main.temp', weather.main.temp );
                    console.log( 'weather.main.temp_min', weather.main.temp_min );
                    console.log( 'weather.main.temp_max', weather.main.temp_max );
                    console.log( 'weather.weather[0].main', weather.weather[0].main );

                    // Add weather.main as body class
                    var weatherClass = weather.weather[0].description.split(' ').join('-');
                    var unitsClass = ( units === 'imperial' ) ? 'wi wi-fahrenheit' : 'wi wi-celsius';

                    //console.log(unitsClass);

                    $( 'body' ).addClass( weatherClass );
                    $( 'body' ).addClass( units );
            
                    $( '#current-temp' ).html( Math.round( weather.main.temp ) );
                    $( '#current-temp' ).append( '<span id="units" class="wi">' );
                    $( '#high' ).text( Math.round( weather.main.temp_max ) );
                    $( '#low' ).text( Math.round( weather.main.temp_min ) );
                    $( '#description .description' ).text( weather.weather[0].main );
                    $( '#wind .wind' ).text( weather.wind.speed );
                    $( '#units' ).addClass( unitsClass );

                } );


            }

        }


    );

    // ae5ad98abb4a0a8b51d04136004b8061

    // look up zip code based on ip
    // https://freegeoip.net/json/ip-address
    // api.openweathermap.org/data/2.5/weather?q=London,uk
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139

    // or look up lat / lon based on ip-address
    // return data in form
    // {"ip":"104.162.71.231","country_code":"US","country_name":"United States","region_code":"NY","region_name":"New York","city":"Brooklyn","zip_code":"11215","time_zone":"America/New_York","latitude":40.662,"longitude":-73.986,"metro_code":501}

    //http://ip-api.com/json
    //     {
    //     "as": "AS12271 Time Warner Cable Internet LLC",
    //     "city": "Brooklyn",
    //     "country": "United States",
    //     "countryCode": "US",
    //     "isp": "Time Warner Cable",
    //     "lat": 40.6234,
    //     "lon": -74.0288,
    //     "org": "Time Warner Cable",
    //     "query": "104.162.71.231",
    //     "region": "NY",
    //     "regionName": "New York",
    //     "status": "success",
    //     "timezone": "America/New_York",
    //     "zip": "11209"

    // }

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
