

module.exports = function (app) {
    app.get('/wordsearch/:query', (req, res) => {
        console.log('api_routes' + req);

        ajax.get({
            url: req.params.query,
            method: 'GET',
            headers: {
                "X-Mashape-Key": `${process.env.XKey}`,
                'Accept': 'application/json'
            },
            success: function (response) {
                console.log(response);
                return response;
            }
        })
    });


    app.get('/translate/:query', (req, res) => {
        console.log(req);
        ajax.get(req.params.query).then(res => res.json(res));
    })
}




