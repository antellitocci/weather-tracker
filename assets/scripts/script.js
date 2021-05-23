//need to do on submit to pass this to the get city coordinates
var cityElem = "Indianapolis";
//$("#user-search").val().trim();

function getCityCoordinates(city){

    var coorApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7928ba41b57ce7723b35f96aa0990fef";

    fetch(coorApiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                getCityWeather(data.coord.lat, data.coord.lon, data.name);
            });
        }
        else{
            //modal to alert them something went wrong
            console.log("oops");
        }
    });

};

function getCityWeather(lat, long, name){
    console.log(lat);
    console.log(long);

    var weathApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="+ long + "&units=imperial&appid=7928ba41b57ce7723b35f96aa0990fef";

    fetch(weathApiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                //clear old information for all weather elements (TO DO)
                //get current info from data
                var currentDay = moment(data.current.dt, "s").format("L");
                var cityInfo = (name + " (" + currentDay + ") ").toString();
                console.log(cityInfo);
                var currentIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
                var currentTemp = data.current.temp;
                var currentWind = data.current.wind_speed;
                var currentHumidity = data.current.humidity;
                var currentUV = data.current.uvi;

                //get future weather information day 1
                //get future weather information day 2
                //get future weather information day 3
                //get future weather information day 4
                //get future weather information day 5
                //pass current weather information to the current weather info box
                createCurrentWeatherInfo(cityInfo, currentIcon, currentTemp, currentWind, currentHumidity, currentUV);

            });
        }
        else{
            console.log("These are not the APIs you're looking for.");
        }
    });

};

//create current weather info box (take information from the api)
function createCurrentWeatherInfo(info, icon, temp, wind, humidity, uvi){
                //create elements for main weather box
                var cityInfoElem = $("<h2>").text(info);
                var cityWeatherIconElem = $("<img>").attr("src", icon);
                var cityTempElem = $("<h5>").html("Temperature: " + temp + "&#176;F");
                var cityWindElem = $("<h5>").html("Wind: " + wind + " MPH");
                var cityHumidElem = $("<h5>").html("Humidity: " + humidity + "%");
                var cityUVIElem = $("<h5>").text("UV Index: ");
                var cityUVIInfoElem = $("<span>").text(uvi);
                //apply class to UVI span element
                if (uvi <= 2){
                    cityUVIInfoElem.addClass("is-low");
                    cityUVIInfoElem.removeClass("is-moderate");
                    cityUVIInfoElem.removeClass("is-high");
                    cityUVIInfoElem.removeClass("is-very-high");
                }
                else if (uvi > 2 && uvi <= 5){
                    cityUVIInfoElem.removeClass("is-low");
                    cityUVIInfoElem.addClass("is-moderate");
                    cityUVIInfoElem.removeClass("is-high");
                    cityUVIInfoElem.removeClass("is-very-high");
                }
                else if (uvi > 5 && uvi <= 7){
                    cityUVIInfoElem.removeClass("is-low");
                    cityUVIInfoElem.removeClass("is-moderate");
                    cityUVIInfoElem.addClass("is-high");
                    cityUVIInfoElem.removeClass("is-very-high");
                }
                else{
                    cityUVIInfoElem.removeClass("is-low");
                    cityUVIInfoElem.removeClass("is-moderate");
                    cityUVIInfoElem.removeClass("is-high");
                    cityUVIInfoElem.addClass("is-very-high");                   
                }
                //append complimentary items prior to adding everything to info
                cityInfoElem.append(cityWeatherIconElem);
                cityUVIElem.append(cityUVIInfoElem);

                //append items to main weather info section
                $("#current-weather").append(cityInfoElem);
                $("#current-weather").append(cityTempElem);
                $("#current-weather").append(cityWindElem);
                $("#current-weather").append(cityHumidElem);
                $("#current-weather").append(cityUVIElem);
};

function createFiveDayWeather(){

};

getCityCoordinates(cityElem);