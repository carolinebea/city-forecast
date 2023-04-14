var apiKey = "73d640c5e6eec0cd55e1a81b5c1be77c"
var cityBtn = document.querySelector("#cityBtn")






$("#searchBtn").on("click", function(){
  console.log("clicked")
  var searchValue = $("#searchValue").val()
  console.log(searchValue)

geoCode(searchValue) 

})

$("#cityBtn").on("click", function(){
  console.log("clicked")
})

function geoCode(cityValue) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    currentWthr(data[0].lat, data[0].lon)
    getForecast(data[0].lat, data[0].lon)
  })
}

// function add(a, b, c){
//  var total = a + b + c
// console.log(total)
// return total
// }

// add(1, 5, 150)


//setting up the clear function.



function currentWthr(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    var weatherCard = $("<div>").addClass("card-style")
    var date = $("<h2>").text("Date: " + moment.unix(data.dt).format("MM/DD/YY"))
    var cityName = $("<h2>").text(data.name)
    var temp = $("<h2>").text("Temperature: " + data.main.temp + " F" )
    var humidity = $("<h2>").text("Humidity: " + data.main.humidity) 
    var windSpeed = $("<h2>").text("Wind Speed: " + data.wind.speed)
    weatherCard.append(cityName, date, temp, humidity, windSpeed)
    $(".currentWthr").append(weatherCard)
    weatherCard.text = ""
  })
}


function getForecast(lat, lon) {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
  .then(response => response.json())
  .then(data => {
    console.log(data)

    for (var i = 4; i<data.list.length; i = i + 8){
      console.log(data.list[i])
      var weatherCard = $("<div>").addClass("forecast-card-style")
      var date = $("<p>").text("Date: " + moment.unix(data.list[i].dt).format("MM/DD/YY")) 
      var temp = $("<p>").text("Temp: " + data.list[i].main.temp)
      var humidity = $("<p>").text("Humidity: " + data.list[i].main.humidity)
      var windSpeed = $("<p>").text("Wind Speed: " + data.list[i].wind.speed)





      weatherCard.append(date, temp, humidity, windSpeed)
      $(".forecast").append(weatherCard)
    }
  })
}