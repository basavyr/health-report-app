const express = require('express');
const path = require('path');
const fs = require('fs')
const marked = require('marked')

const app = express();

//MIDDLEWARE
app.use('/report/:name', (req, res, next) => {
    console.log('  ⚠️ The middleware was activated! 🕐', Date.now());
    console.log('Request URL: ', req.originalUrl);
    console.log('You are looking for:', req.params.name);
    console.log(`********************\n`);
    next();
})
app.use('/', (err, req, res, next) => {
    console.log(`The URL: ${req.originalUrl}`);
    console.error(err.stack);
    res.status(500).json({ error: error.toString() });
    next();
});


//ROUTES
app.get('/', (req, res) => {
    var readme_path = path.join(__dirname + '../../../README.md');
    var readme_file = fs.readFileSync(readme_path, 'utf8');
    res.send(marked(readme_file.toString()));

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