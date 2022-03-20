const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//get request
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");


});
//post request
app.post("/", function (req, res){

    console.log(req.body.cityname);
    const query = req.body.cityname;

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=cc6037ef26dd535b137305e84db7ceda&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            res.write("The temperature in " +query +" is "+ temp + ", ");
            res.write("Weather condition is: " + weatherDescription);
            res.send();
        })
    });
})

app.listen(4000, function () {
    console.log("Server is up and running on 4000");
})
