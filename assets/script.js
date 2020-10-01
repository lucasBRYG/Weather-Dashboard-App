var weatherData;
var temperature;
var forcast;
var apiKey = "cda0d2203893e7ce64f2ac18afeff339";
// var queryUrl = "api.openweathermap.org/data/2.5/weather?q=London&appid=" + apiKey;
var searchButtonDiv = $("#search-bar");
var userHistoryDiv = $("#user-history");
var historyArray = [];
console.log(typeof historyArray);

$(document).ready(function(){

  if(!localStorage.getItem("return")){
    localStorage.setItem("user-history", JSON.stringify(historyArray));
    localStorage.setItem("return", "true")
  }

  renderPastSearches()

  searchButtonDiv.on("click", function(){
    var nextSearch = $("#city-search").val().trim();
    historyArray = JSON.parse(localStorage.getItem("user-history"));
    console.log(typeof historyArray);
    historyArray.unshift(nextSearch);
    console.log(typeof historyArray);
    localStorage.setItem("user-history", JSON.stringify(historyArray));
    console.log(typeof historyArray);
    // $.ajax({
    //   url: "http://api.openweathermap.org/data/2.5/weather?q=" + nextSearch + "&appid=" + apiKey,
    //   method: "GET"
    // }).then(function(response) {
    //   console.log(response);
    //   weatherData = response;
    // });

    renderPastSearches();
    $(nextSearch).text("");
  })

  // $.ajax({
  //   url: "http://api.openweathermap.org/data/2.5/weather?q=Baltimore&appid=cda0d2203893e7ce64f2ac18afeff339",
  //   method: "GET"
  // }).then(function(response) {
  //   console.log(response);
  // });

  function renderPastSearches (){
    var userHistory = $("#user-history");
    $(userHistory).empty();
    historyArray = JSON.parse(localStorage.getItem("user-history"));
    console.log(typeof historyArray)
    console.log(historyArray)
    console.log(historyArray.length)
    for (var i = 0; i < historyArray.length; i++){
      console.log(historyArray[i]);
     $("#user-history").prepend("<tr class = 'border' id = 'row" + i + "'>" + JSON.stringify(historyArray[i]) + "</tr>");
    }
    $("#history-table").append()
  }

});

gg