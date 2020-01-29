const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const name = "Feanor306"

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name,
        message: "This will contain helpful information in the future!"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address missing or invalid."
        })
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if(error) return res.send({ error })
        
        forecast(lattitude, longitude, (error, forecastData) => {
            if(error) return res.send({ error })
            
            res.send({
                address: req.query.address,
                location,
                forecastData: forecastData.stringForm//JSON.stringify(forecastData)
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name,
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name,
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})