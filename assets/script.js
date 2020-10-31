
const searchButtonDiv = $("#search-bar");
const userHistoryDiv = $("#user-history");
const clearHistoryDiv = $("#clear-hist")
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
    
    $.ajax({
      url: weaatherURL,
      method: "GET"
    }).then(function(response) {
      $("#city-name").text(response.name);
      let lat = response.coord.lat;
      let long = response.coord.lon;
      const oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + key
      $.ajax({
        url: oneCall,
        method: "GET"
        }).then(function(response) {
        
          historyArray = JSON.parse(localStorage.getItem("user-history"));
          historyArray.unshift(nextSearch);
          localStorage.setItem("user-history", JSON.stringify(historyArray));
          renderPastSearches();
          renderWeather(response);

        });

    });

  });

  clearHistoryDiv.on("click", function() {
    $(userHistoryDiv).empty();
    localStorage.setItem("user-history", "[]")
  });

});

function renderPastSearches (){

  $(userHistoryDiv).empty();
  historyArray = JSON.parse(localStorage.getItem("user-history"));
  for (var i = 0; i < 15; i++){
    if(historyArray[i]){
      $(userHistoryDiv).append("<tr id = 'search-history-" + i + "><th scope = 'row'><td class = 'past-search'>" + historyArray[i] + "</td></th></tr>");
    }
  }

  $(".past-search").on("click", function(event) {

    let nextSearch = $(event.target).text();

    const key = "cda0d2203893e7ce64f2ac18afeff339";
    const weaatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + nextSearch + "&units=imperial&appid=" + key
    
    $.ajax({
      url: weaatherURL,
      method: "GET"
    }).then(function(response) {
      $("#city-name").text(response.name);
      let lat = response.coord.lat;
      let long = response.coord.lon;
      const oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + key
      $.ajax({
        url: oneCall,
        method: "GET"
        }).then(function(response) {
        
          historyArray = JSON.parse(localStorage.getItem("user-history"));
          historyArray.unshift(nextSearch);
          localStorage.setItem("user-history", JSON.stringify(historyArray));
          renderWeather(response);

        });

    });
  });

}

function renderWeather(response) {
  
  $("#weather-icon").attr("source", "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png");
  $("#temp-data").html("Current Temperature : " + response.current.temp);
  $("#hum-data").html("Humidity : " + response.current.humidity);
  $("#wind-data").html("Wind Speed : " + response.current.wind_speed);

  $("#uvi-data").html("UV Index : " + response.current.uvi);

  $("#five-day-cards").empty();
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