const express = require('express');

const app = express();

//MIDDLEWARE
app.use('/report/:name', (req, res, next) => {
    console.log('  ⚠️ The middleware was activated! 🕐', Date.now());
    console.log('Request URL: ', req.originalUrl);
    console.log('You are looking for:', req.params.name);
    console.log(`********************\n`);
    next();
})
app.use('/', (req, res, next) => {
    console.log(`The URL: ${req.originalUrl}`);
    next();
});


//ROUTES
app.get('/', (req, res) => {
    // console.log(`The URL: ${req.originalUrl}`);
    res.send('Main page');
});
app.get('/report', (req, res) => {
    res.send('Report Page');
});
app.get('/report/:name', (req, res) => {
    var content = ['This is a health template for Mr ', req.params.name];
    var body = 'This is a health template for Mr ' + req.params.name;
    res.send(body);
});

//THE PORT ON WHICH THE APP WILL RUN (ON LOCALHOST)
const PORT = 5000;

//Use environment variable which sets the port
const env_port = process.env.PORT || PORT


//LISTEN TO THE SERVER ➡️
app.listen(env_port, () => {
    console.log(`App is listening on PORT=${env_port}`);
});