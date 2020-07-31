const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const secrets = require("./secrets");
const { response } = require('express');

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

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/" + secrets['list-id'],
    method: "POST",
    headers: {
      "Authorization": "harshit-saraswat " + secrets['api-key']
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(response.statusCode);
    }
  });


});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});