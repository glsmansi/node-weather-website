const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather ',
        name: 'mansi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is the help desk. Can contact to us for any queries',
        title: 'Weather App',
        name: 'Mansi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mansi Gubba'
    })
    // res.send([{
    //     name: 'Mansi',
    // }, {
    //     name: 'Sara'
    // }])
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'no address specified'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }


            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is sunny',
    //     location: 'India',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        name: 'MANSI',
        errorMessage: 'Help article not Found'
    })
})

app.get('*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        name: 'MANSI',
        errorMessage: 'Page not Found'
    })
})

app.listen(port, () => {
    console.log("listening on port " + port)
})