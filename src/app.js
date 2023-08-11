const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Antonio'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Antonio'
    });
});

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Help',
        name: 'Antonio',
        helpText: 'This is a help message.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    } 

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error
            });  
        }
        
        forecast(longitude, latitude, (error, forecast) => {
            if(error) {
                return res.send({
                    error
                });  
            }
            
            res.send({
                forecast,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    } 

    console.log(req.query.search)
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help Article',
        name: 'Antonio',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Antonio',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});