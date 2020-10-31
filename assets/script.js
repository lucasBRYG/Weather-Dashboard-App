
const searchButtonDiv = $("#search-bar");
const userHistoryDiv = $("#user-history");
let historyArray = [];


$(document).ready(function(){

  if(!localStorage.getItem("return")){
    localStorage.setItem("user-history", JSON.stringify(historyArray));
    localStorage.setItem("return", "true");
  }

  renderPastSearches();
    
  searchButtonDiv.on("click", function(){

    let nextSearch = $("#city-search").val().trim();

    const key = "cda0d2203893e7ce64f2ac18afeff339";
    const weaatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + nextSearch + "&units=imperial&appid=" + key
    const dailyURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + nextSearch + "&cnt=5&units=imperial&appid=" + nextSearch + "&appid=" + key;

    $.ajax({
      url: weaatherURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response)
      $("#city-name").text(response.name);
      let lat = response.coord.lat;
      let long = response.coord.lon;
      const oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + key
      $.ajax({
        url: oneCall,
        method: "GET"
        }).then(function(response) {
        
        renderWeather(response);

        console.log(response);
      });

    });

    historyArray = JSON.parse(localStorage.getItem("user-history"));
    historyArray.unshift(nextSearch);
    localStorage.setItem("user-history", JSON.stringify(historyArray));
    renderPastSearches()

  });

});

function renderPastSearches (){

  $(userHistoryDiv).empty();
  historyArray = JSON.parse(localStorage.getItem("user-history"));
  for (var i = 0; i < 15; i++){
    if(historyArray[i]){
      $(userHistoryDiv).append("<tr id = 'search-history-" + i + "><th scope = 'row'></th><td>" + historyArray[i] + "</td></tr>");
    }
  }

}



function renderWeather(response) {
  
  //$("#weather-icon").att("source", .data.weather.weathericonURL);
  $("#temp-data").append("Current Temperature : " + response.current.temp);
  $("#hum-data").append("Humidity : " + response.current.humidity);
  $("#wind-data").append("Wind Speed : " + response.current.wind_speed);
  console.log(response.current.wind_speed)
  $("#uvi-data").append("UV Index : " + response.current.uvi);
  console.log(response.current.uvi)

  for (let i = 0; i < 5; i++){
    let todayWeather = response.daily[i];
    let date = getDate(todayWeather.dt);
    $("#five-day-cards").append('<div class="col-md-2dot4"><div id="five-day-1" class="card mb-1"><div class="card-body"><h6>' + date + '</h6><img src = http://openweathermap.org/img/wn/' + todayWeather.weather[0].icon + '@2x.png class="weather-icon" height="auto" width="auto" alt = "Weather Icon"><p class="temp-5 small">Expected Temperature : ' + todayWeather.temp.day + '</p><p class="hum-5 small">Expected Humidity : ' + todayWeather.humidity + '</p></div></div></div>');
  }
}

function getDate(unix) {
  millSecs = unix * 1000;
  dateOb = new Date(millSecs);
  let date = dateOb.toLocaleString("en-US", {month: "long"}) + " " + dateOb.getDate();
  return date;
}

// https://www.trilogyed.com/about/careers/


































// function apiCalls(searchParam){
//   $.ajax({
//     url: queryUrl,
//     method: "GET"
//   }).then(function(response) {
//     localStorage.setItem("weather-object", response);
//   });
// 