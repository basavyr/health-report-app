const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const os = require('os');

const app = express();

//MIDDLEWARE
app.use('/', (req, res, next) => {
    console.log(`The URL: ${req.originalUrl}`);
    // console.error(err.stack);
    // res.status(500).json({ error: error.toString() });
    next();
});

app.use('/report/:name', (req, res, next) => {
    console.log('  ⚠️ The middleware was activated! 🕐', Date.now());
    console.log('Request URL: ', req.originalUrl);
    console.log('You are sending health report to:', req.params.name);
    console.log(`********************\n`);
    next();
})

// app.use(express.static(path.join(__dirname, '/../assets')));
app.use(express.static(path.join(__dirname, '/../public')));
app.set('views', __dirname + '/../public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'pug');

//ROUTES
app.get('/', (req, res) => {
    var readme_path = path.join(__dirname + '/../../../README.md');
    var readme_file = fs.readFileSync(readme_path, 'utf8');
    // res.sendFile(path.join(__dirname + '/../public/index.html'));
    res.render('index.pug', { title: 'Hey', message: 'Hello there!' });
});

app.get('/report', (req, res) => {
    var readme_path = path.join(__dirname + '/../resources/report.md');
    var readme_file = fs.readFileSync(readme_path, 'utf8');
    // res.send(marked(readme_file.toString()));

    var header = 'Stimate domnule Dulea,';
    var today = new Date();
    var message1 = `Astazi,  ${today.toString().slice(0,10)}, totul este OK la domiciliu. Mentionez ca nu am intrat in contact cu niciun confirmat de COVID-19 si ca nu prezint niciun simptom.  `;
    var message2 = `De asemenea, activitatea de munca are loc in conditii ideale.  `;
    var message3 = `Cu stima,  `;
    var message4 = `Robert Poenaru  `;
    var message5 = `DFCTI | Tel. 0756070068 (Personal) | <robert.poenaru@theory.nipne.ro> (Work) | <robert.poenaru@protonmail.ch> (Personal) | Skype: <robert.poenaru@outlook.com>`;
    var home = `Comuna Cosna, Nr. 50, Sat Podu Cosnei, Judetul Suceava, Cod Postal 727191`; //🏚
    var dorm = `Magurele, Nr. 9,  Str. Fizicienilor, Judetul Ilfov, Cod Postal 077125`; //
    var address = `Current working residence: ` + home;

    var body = header + message1 + '\n' + message2 + '\n' + '\n' + message3 + '\n' + message4 + '\n' + '\n' + message5 + '\n' + address;

    res.render('report.pug', {
        title: address,
        header: header,
        content: message1 + message2,
        address: address,
        personal: message5,
        bye1: message3,
        bye2: message4
    });
});

app.get('/report/:name', (req, res) => {
    var head_of_department = '';
    if (req.params.name === 'DFCTI')
        head_of_department = 'Dulea';
    else
    if (req.params.name === 'DFT')
        head_of_department = 'Isar';
    else
        head_of_department = req.params.name;
    var content = ['This is a health template for Mr ', head_of_department];
    head_of_department = head_of_department.charAt(0).toUpperCase() + head_of_department.slice(1);
    var header = `## Stimate domnule ${head_of_department}, \n`;
    var today = new Date();
    var message1 = `Astazi,  ${today.toString().slice(0,10)}, totul este OK la domiciliu. Mentionez ca nu am intrat in contact cu niciun confirmat de COVID-19 si ca nu prezint niciun simptom.  `;
    var message2 = `De asemenea, activitatea de munca are loc in conditii ideale.  `;
    var message3 = `Cu stima,  `;
    var message4 = `Robert Poenaru  `;
    var message5 = `*DFCTI | Tel. 0756070068 (Personal) | <robert.poenaru@theory.nipne.ro> (Work) | <robert.poenaru@protonmail.ch> (Personal) | Skype: <robert.poenaru@outlook.com>*  `;
    var home = `Comuna Cosna, Nr. 50, Sat Podu Cosnei, Judetul Suceava, Cod Postal 727191`; //🏚
    var dorm = `Magurele, Nr. 9,  Str. Fizicienilor, Judetul Ilfov, Cod Postal 077125`; //
    var address = `**Current working residence:** ` + home;
    // var main_page='';
    var body = header + message1 + '\n' +
        message2 + '\n' + '\n' + message3 + '\n' + message4 + '\n' + '\n' + message5 + '\n' + address;
    // console.log(marked(body));
    res.send(marked(body));
});

//THE PORT ON WHICH THE APP WILL RUN (ON LOCALHOST)
const PORT = 5000;

//Use environment variable which sets the port
const env_port = process.env.PORT || PORT


//LISTEN TO THE SERVER ➡️
app.listen(env_port, () => {
    console.log(`App is listening on PORT=${env_port}`);
    console.log(`Access the app at: http://localhost:${env_port}`);
});