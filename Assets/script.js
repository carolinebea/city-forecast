var apiKey = "73d640c5e6eec0cd55e1a81b5c1be77c"



$("#searchBtn").on("click", function(){
  console.log("clicked")
  var searchValue = $("#searchValue").val()
  console.log(searchValue)

geoCode(searchValue) 
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


function currentWthr(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    var weatherCard = $("<div>").addClass("card-style")

    var cityName = $("<h2>").text(data.name)
    var temp = $("<h2>").text("Temperature: " + data.main.temp + " F" )
    var humidity = $("<h2>").text("Humidity: " + data.main.humidity) 
    var windSpeed = $("<h2>").text("Wind Speed: " + data.wind.speed)
    weatherCard.append(cityName, temp, humidity, windSpeed)
    $(".currentWthr").append(weatherCard)
  })
}


function getForecast(lat, lon) {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)

    for (var i = 4; i<data.list.length; i = i + 8){
      console.log(data.list[i])

      







    }
  })
}