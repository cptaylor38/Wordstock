require('dotenv').config();
var express = require("express");
var app = express();
var PORT = process.env.PORT || 5000;
var path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static(__dirname))
app.use(express.static(__dirname + "/public"));

require("./routes/api_routes")(app);

app.get("/translate", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/translate.html"));
});
app.get('/dictionary', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/dictionary.html"));
})


app.listen(PORT || process.env.PORT, function () {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});

module.exports = app;