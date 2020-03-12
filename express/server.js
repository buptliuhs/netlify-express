'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const body = '<h1>Hello from Express.js!</h1>'
             + '<script src="https://www.google.com/recaptcha/api.js?render=6LemsuAUAAAAAKzrKt3BzrCOyN86FJRDD48MlXQm"></script>'
             + '<script>'
             + '  grecaptcha.ready(function() {'
             + '    grecaptcha.execute(\'6LemsuAUAAAAAKzrKt3BzrCOyN86FJRDD48MlXQm\', {action: \'homepage\'}).then(function(token) {'
             + '    console.log(token);'
             + '  });'
             + '});'
             + '</script>';
  res.write(body);
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
