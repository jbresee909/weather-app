const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// GET HOME PAGE
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Justin'
    })
})

//GET HELP PAGE
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Justin',
        message: 'This is an example help message'
    })
})

//GET ABOUT PAGE
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Justin'
    })
})

//GET WEATHER PAGE
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 


    res.send({
        products: []
    })
})

// CATCH ERRORS FOR UNFOUND PAGES
app.get('/help/*', (req, res) => {
    res.render('error_404', {
        title: 'Error Page',
        error_message: 'Help Page Not Found',
        name: 'Justin'
    })
})

app.get('*', (req, res) => {
    res.render('error_404', {
        title: 'Error Page',
        error_message: '404 page not found',
        name: 'Justin'
    })
})

// SET UP SERVER TO LISTEN ON PORT 3000
app.listen(port, () => {
    console.log('Server is up on port' + port)
})
