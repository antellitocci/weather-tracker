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
                var currentDay = moment(data.current.dt, "X").format("L");
                var cityInfo = (name + " (" + currentDay + ") ").toString();
                console.log(cityInfo);
                var currentIcon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
                var currentTemp = data.current.temp;
                var currentWind = data.current.wind_speed;
                var currentHumidity = data.current.humidity;
                var currentUV = data.current.uvi;

                //get future weather information day 1 loop through the array? yes
                for (var i = 1; i < 6; i ++){

                    var futureDate = moment(data.daily[i].dt, "X").format("L");
                    var futureIcon = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                    var futureTemp = data.daily[i].temp.max;
                    var futureWind = data.daily[i].wind_speed;
                    var futureHumid = data.daily[i].humidity;
                    var futureUV = data.daily[i].uvi;

                    createFiveDayWeather(futureDate, futureIcon, futureTemp, futureWind, futureHumid, futureUV);
                }
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
    uviColor(uvi, cityUVIInfoElem);
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

function createFiveDayWeather(date, icon, temp, wind, humidity, uvi){
    //create elements for daily weather boxes
    var weatherCardCellElem = $("<div>").addClass("cell");
    var weatherCardElem = $("<div>").addClass("card flex-child-auto").attr("style", "margin: 10px 0px 10px 30px; padding: 10px;");
    var weatherCardDateElem = $("<h4>").text(date);
    var weatherCardIconElem = $("<img>").attr("src", icon);
    weatherCardIconElem.css("height", "60px");
    weatherCardIconElem.css("width", "60px");
    var weatherCardTempElem = $("<p>").html("Temperature: " + temp + "&#176;F");
    var weatherCardWindElem = $("<p>").html("Wind: " + wind + " MPH");
    var weatherCardHumidElem = $("<p>").html("Humidity: " + humidity + "%");
    var weatherCardUVIElem = $("<p>").text("UV Index: ");
    var weatherCardUVISpanElem = $("<span>").text(uvi);

    uviColor(uvi, weatherCardUVISpanElem);

    weatherCardUVIElem.append(weatherCardUVISpanElem);

    weatherCardElem.append(weatherCardDateElem);
    weatherCardElem.append(weatherCardIconElem);
    weatherCardElem.append(weatherCardTempElem);
    weatherCardElem.append(weatherCardWindElem);
    weatherCardElem.append(weatherCardHumidElem);
    weatherCardElem.append(weatherCardUVIElem);
    
    weatherCardCellElem.append(weatherCardElem);

    $("#daily-weather").append(weatherCardCellElem);

};

function uviColor(uvi, uviElement){
    //apply class to UVI span element
    if (uvi <= 2){
        uviElement.addClass("is-low");
        uviElement.removeClass("is-moderate");
        uviElement.removeClass("is-high");
        uviElement.removeClass("is-very-high");
    }
    else if (uvi > 2 && uvi <= 5){
        uviElement.removeClass("is-low");
        uviElement.addClass("is-moderate");
        uviElement.removeClass("is-high");
        uviElement.removeClass("is-very-high");
    }
    else if (uvi > 5 && uvi <= 7){
        uviElement.removeClass("is-low");
        uviElement.removeClass("is-moderate");
        uviElement.addClass("is-high");
        uviElement.removeClass("is-very-high");
    }
    else{
        uviElement.removeClass("is-low");
        uviElement.removeClass("is-moderate");
        uviElement.removeClass("is-high");
        uviElement.addClass("is-very-high");                   
    }
};

getCityCoordinates(cityElem);