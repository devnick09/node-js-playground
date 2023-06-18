const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));

app.use(expressLayout);
// extract style and script from sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.send('<h1>Hello, world</h1>');
})

app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`listening on port: ${port}`);

})