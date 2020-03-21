const express = require('express')
const app = express()
const request = require("request")
const port = 3000

app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('search'))

app.get('/results', (req, res) => {
    let query = req.query.search
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=c3456baf9b180b103c25c36e9473482a"
    request(url, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            let data = JSON.parse(body)
            res.render("results", {data: data});
        }
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))