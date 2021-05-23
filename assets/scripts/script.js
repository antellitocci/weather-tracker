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
                $("#current-weather").html(
                    "<span><h2>" + name + " (5/23/2021) <img src='http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png'/></h2>" +
                    "<h5>Temperature: " + data.current.temp + " &#176;F</h5>" +
                    "<h5>Wind: " + data.current.wind_speed + " MPH</h5>" +
                    "<h5>Humidity: " + data.current.humidity + "%</h5>" +
                    "<h5>U/V Index: " + data.current.uvi + "</h5>"
                    
                );
            });
        }
        else{
            console.log("These are not the APIs you're looking for.");
        }
    });

};

getCityCoordinates(cityElem);