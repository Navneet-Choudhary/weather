const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
app.set('views', './src/views')
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


const weatherRoute = require('./src/routes/weather')


app.use("/", weatherRoute);

app.listen(3000, function() {
  console.log("Server is running  on port 3000");
})
