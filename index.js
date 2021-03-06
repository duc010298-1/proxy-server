const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/update-url', function (req, res) {
    res.sendFile(__dirname + '/home.html');
});

app.post('/update-url', (req, res) => {
    const urlStr = req.body.url;

    const url = new URL(urlStr);
    const origin = url.origin;
    const pathname = url.pathname;

    app.use(require('json-proxy').initialize({
        proxy: {
            forward: {
                '/(.*)': origin + '/$1',
            },
        },
    }));
    res.redirect(pathname);
});

app.listen(process.env.PORT || 2005, () => console.log('Server running...'));
