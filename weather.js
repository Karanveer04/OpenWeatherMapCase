$(document).ready(function () {
    $('#sendWeather').click(function () {
        //Get city name from the input field
       var city = $("#city").val();
       // API Id for accessing openweathermap.org
       const APPID = '07897dbfaeebe355c9948e5559b568b1';

       if(city != ''){
           $.ajax({                     // We use ajax method to get the data from the URL
               url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" +
               "&APPID=" + APPID + "",
               type: "GET",
               dataType: "jsonp",       // Return type of data is expected to be JSON text
               success: function (data) {

                   var weatherInfo = displayWeather(data);         // We call the displayWeather and assign it to variable

                   $("#displayResult").html(weatherInfo);          // We choose the div displayResult to show the weatherInfo

                   $("#city").val('');                             // Clear input field
               },
               error: function () {     // Error is thrown if the city is undefined
                   $("#cityError").html("<div class='alert alert-danger text-center'><a href='#' class='close' data-dismiss='alert' " +
                       "aria-label='close'>&times;</a>City Doesn't Exist!</div>");
                   $("#city").val('');
               }

           });
       } else{      // Error is thrown if the input field is empty
           $("#error").html("<div class='alert alert-danger text-center'><a href='#' class='close' data-dismiss='alert' " +
               "aria-label='close'>&times;</a>Fields cannot be empty</div>");
       }
    });
    /*
        This method is used to extract data from the Json file.
     */
    function displayWeather(data) {
        if(data.cod !== 404) {
            return "<h2 class='text-center'>Current Weather for " + data.name + ", " + data.sys.country + "</h2>" +
                "<h4>.</h4>" +
                "<h3 style='padding-left: 145px;' ><strong>Weather</strong>: " + data.weather[0].main + "</h3>" +
                "<h3 style='padding-left: 145px;'><strong>Description</strong>: <img src='http://openweathermap.org/img/w/"
                + data.weather[0].icon + ".png'> " + data.weather[0].description + "</h3>" +
                "<h3 style='padding-left: 145px;'><strong>Temperature</strong>: " + data.main.temp + "&deg;C</h3>" +
                "<h3 style='padding-left: 145px;'><strong>Pressure</strong>: " + data.main.pressure + " hPa</h3>" +
                "<h3 style='padding-left: 145px;'><strong>Humidity</strong>: " + data.main.humidity + "%</h3>" +
                "<h3 style='padding-left: 145px;'><strong>Minimum Temperature</strong>: " + data.main.temp_min + "&deg;C</h3>" +
                "<h3 style='padding-left: 145px;'><strong>Maximum Temperature</strong>: " + data.main.temp_max + "&deg;C</h3>" +
                "<h3 style='padding-left: 145px;'><strong>Wind Speed</strong>: " + data.wind.speed + " m/s</h3>" +
                "<h3 style='padding-left: 145px;'><strong>Wind Direction</strong>: " + data.wind.deg + "&deg;</h3>" +
                "<h3 style='padding-left: 145px;'><strong>Clouds</strong>: " + data.clouds.all + "%</h3>";
        }
    }
});