(function() {
  (function($) {
    return $.fn.localtime = function() {
      var fmtDate, fmtZero;
      fmtZero = function(str) {
        return ('0' + str).slice(-2);
      };
      fmtDate = function(d) {
        var hour, meridiem;
        hour = d.getHours();
        if (hour < 12) {
          meridiem = "AM";
        } else {
          meridiem = "PM";
        }
        if (hour === 0) { hour = 12; }
        if (hour > 12) { hour = hour - 12; }
        //return hour + ":" + fmtZero(d.getMinutes()) + " " + meridiem + " " + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        return hour + ":" + fmtZero(d.getMinutes()) + " " + meridiem;
      };
      return this.each(function() {
        var tagText;
        tagText = $(this).html();
        $(this).html(fmtDate(new Date(tagText)));
        return $(this).attr("title", tagText);
      });
    };
  })(jQuery);
}).call(this);
// STEPS

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




$(document).ready(function() {

    console.log('main.js');

    // API key for api.openweathermap.org
    const APIKEY = 'ae5ad98abb4a0a8b51d04136004b8061';

    // IP lookup service URL
    var ipUrl = 'http://ip-api.com/json/';

    // Weather service URL
    var weatherServiceUrl = 'http://api.openweathermap.org/data/2.5/weather';

    // Get IP
    $.getJSON( ipUrl )
    .done( function( data ) {

        console.log( data );

        // Add city and state to page
        $( '#location' ).text( data.city + ', ' + data.region );

        // Default units (imperial = fahrenheit, metric = celsius)
        var units = 'imperial';

        // Call get weather function
        loadWeather( units );

        // Set default units to fahrenheit
        $( '#weather-toggle' ).find( 'a#imperial' ).addClass( 'active' );


        // If unit toggle is clicked
        $( '#weather-toggle' ).on( 'click', 'a', function( event ) {

            // Set units to the value of clicked element
            units = $( this ).attr( 'id' );

            $( '#weather-toggle' ).find( 'a' ).removeClass( 'active' );
            $( this ).addClass( 'active' );

            // Run the weather function
            loadWeather( units );

        } );

        // Get weather data function
        function loadWeather( units ) {

            $.getJSON( weatherServiceUrl, {
                lat: data.lat,
                lon: data.lon,
                units: units,
                APIKEY: APIKEY
            })
            .done( function( weather ) {

                console.log( weather );

                // Add weather.main as body class
                var weatherClass = weather.weather[0].description.split(' ').join('-');
                var unitsClass = ( units === 'imperial' ) ? 'wi wi-fahrenheit' : 'wi wi-celsius';

                // Get sunrise and sunset
                var sunrise = getLocalDate( weather.sys.sunrise );
                var sunset = getLocalDate( weather.sys.sunset );

                console.log( sunrise );
                console.log( sunset );

                // Add body classes
                $( 'body' ).addClass( weatherClass ).addClass( units );
        
                // Render mark-up and weather data
                $( '#current-temp' ).html( Math.round( weather.main.temp ) );
                $( '#current-temp' ).append( '<span id="units" class="wi">' );
                $( '#high' ).text( Math.round( weather.main.temp_max ) );
                $( '#low' ).text( Math.round( weather.main.temp_min ) );
                $( '#description' ).text( weather.weather[0].main );
                $( '#wind .wind' ).text( weather.wind.speed );
                $( '#units' ).addClass( unitsClass );
                $( '#sunrise' ).find( '.localtime' ).text( sunrise );
                $( '#sunset' ).find( '.localtime' ).text( sunset );

                $( 'span.localtime' ).localtime();

            })
            .fail(function( jqxhr, textStatus, error ) {

                var err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );

            });

        };

        // Get local date helper
        function getLocalDate( utcDate ) {
            var utcSeconds = utcDate;
            var date = new Date(0);
            date.setUTCSeconds( utcSeconds );
            return date;
        }


    })
    .fail(function( jqxhr, textStatus, error ) {

        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );

    });




// End
});
