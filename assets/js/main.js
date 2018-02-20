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
(function() {
  var ipData;
  var ipURL = 'https://api.ipdata.co';
  var weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
  var weatherAPIKey = 'af7142e69f8d39cab74a170b9c4aa9bf';

  $.ajax({
    type: "GET",
    url: ipURL,
    dataType: "jsonp",
    success: function (data) {
      ipData = data;
      //console.log(ipData);

      $( '#location' ).text( data.city + ', ' + data.region );

        // Default units
        var units = 'imperial';

        // Call get weather function
        loadWeather( units );

        // Set default units to fahrenheit
        $( '#weather-toggle' ).find( 'a#imperial' ).addClass( 'active' );


        // If unit toggle is clicked
        $( '#weather-toggle a' ).click(function( event ) {

            // Set units to the value of clicked element
            units = $( this ).attr( 'id' );

            $( '#weather-toggle' ).find( 'a' ).removeClass( 'active' );
            $( this ).addClass( 'active' );

            // Run the weather function
            loadWeather( units );

        } );

        // Get weather data function
        function loadWeather( units ) {

            $.getJSON( weatherURL, {
                lat: data.latitude,
                lon: data.longitude,
                units: units,
                APPID: weatherAPIKey
            })
            .done( function( weather ) {

                // Add weather.main as body class
                var weatherClass = weather.weather[0].description.split(' ').join('-');
                var unitsClass = ( units === 'imperial' ) ? 'wi wi-fahrenheit' : 'wi wi-celsius';

                // Get sunrise and sunset
                var sunrise = new Date( weather.sys.sunrise * 1000 ).toLocaleTimeString();
                var sunset = new Date( weather.sys.sunset * 1000 ).toLocaleTimeString();
                var currentConditions = weather.weather[0].main;

                // Add body classes
                $( 'body' ).addClass( weatherClass ).addClass( units );

                // Render mark-up and weather data
                $( '#current-temp' ).html( Math.round( weather.main.temp ) );
                $( '#current-temp' ).append( '<span id="units" class="wi">' );
                $( '#high' ).text( Math.round( weather.main.temp_max ) );
                $( '#low' ).text( Math.round( weather.main.temp_min ) );
                $( '#description' ).html( currentConditions );
                $( '#wind .wind' ).text( weather.wind.speed );
                $( '#units' ).addClass( unitsClass );
                $( '#sunrise' ).find( '.localtime' ).text( sunrise );
                $( '#sunset' ).find( '.localtime' ).text( sunset );
                $( '#localtime' ).text( new Date().toLocaleTimeString() );
                var weatherIconEl = $( '#current-conditions .icon' );
                var currentConditionsLowerCase = currentConditions.toLowerCase();

              // Add some icons
              // Could do this easily with CSS, but need to get the char codes
              if( currentConditionsLowerCase.includes( 'rain' ) ) {
                 weatherIconEl.addClass( 'wi-rain' );
              } else if( currentConditionsLowerCase.includes( 'snow' ) ) {
                 weatherIconEl.addClass( 'wi-snow' );
              } else if( currentConditionsLowerCase.includes( 'cloud' ) ) {
                 weatherIconEl.addClass( 'wi-cloudy' );
              }
              else if( currentConditionsLowerCase.includes( 'clear' ) || currentConditionsLowerCase.includes( 'sunny' ) ) {
                weatherIconEl.addClass( 'wi-day-sunny' );
              }
              else if( currentConditionsLowerCase.includes( 'fog' ) || currentConditionsLowerCase.includes( 'mist' ) ) {
                 weatherIconEl.addClass( 'wi-fog' );
              } else if( currentConditionsLowerCase.includes( 'wind' ) ) {
                 weatherIconEl.addClass( 'wi-windy' );
              }

            })
            .fail(function( jqxhr, textStatus, error ) {

                var err = textStatus + ", " + error;
                console.error( "Request Failed: " + err );

            });

        };
    }
  });

  // Get local date helper
  function getLocalDate( utcDate ) {
      var utcSeconds = utcDate;
      var date = new Date(0);
      date.setUTCSeconds( utcSeconds );
      return date;
  }

})();
