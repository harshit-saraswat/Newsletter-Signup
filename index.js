const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

app = express();

app.use(express.static("static"));

app.use(bodyParser.urlencoded(
  { extended: true }
));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  console.log(fname+lname+email);
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});