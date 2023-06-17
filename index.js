const express = require('express');
const app = express();
const port = 8000;

// use express router
app.use('/', require('./routes'));

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