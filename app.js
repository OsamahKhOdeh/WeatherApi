const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/" + "index.html");



})

app.post("/",function(req,res){

  const cityName = req.body.cityName ;
  const units = "metric";
  const keyApi = "4b9ea7c27b52fee2c98a772f2af3e44f";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + units + "&appid=" + keyApi;
  https.get(url, function(response) {
    console.log(response.statusCode);;
    response.on('data', function(data) {

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const descr = weatherData.weather[0].description;
      console.log(temp + descr);
      res.write("<h1>The <em>temprature</em> <strong>in</strong> " + cityName + " is " + temp + " degrees celcius</h1>");
      res.write("The weather is currently : " + descr);
      res.send();
    })
  })

})


app.listen(3000, function() {
  console.log("Server is running at port 3000 . ");
})
