require('dotenv').config();
var express = require("express");
var app = express();
var PORT = process.env.PORT || 5000;
var path = require('path');
var axios = require('axios');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get('/wordsearch/:word', (req, res) => {
    console.log(req.params.word);
    var queryURL = 'https://wordsapiv1.p.rapidapi.com/words/' + req.params.word;
    axios.get(queryURL, {
        headers: {
            "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
            "X-RapidAPI-Key": `${process.env.XKeys}`,
            'Accept': 'application/json'
        }
    }).then(response => { res.json(response.data) }).catch(err => res.send(err));
});

app.get('/translate/:query', (req, res) => {
    var queryURL = 'https://api.mymemory.translated.net/get?' + req.params.query;
    axios.get(queryURL).then(response => res.json(response.data));
});

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