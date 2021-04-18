'use strict';
const log = console.log
log('Express server')

const express = require('express')
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '/pub')))

app.use('/favicon.ico', express.static(path.join(__dirname, '/pub/img/favicon.ico')));

app.get(['/', '/home'], (req, res) => {
	res.sendFile(path.join(__dirname + '/pub/home.html'));
})

app.get('/examples', (req, res) => {
	res.sendFile(path.join(__dirname + '/pub/examples.html'));
})

app.get('/api', (req, res) => {
	res.sendFile(path.join(__dirname + '/pub/api.html'));
})

app.get('/download', function(req, res){
	const file = path.join(__dirname + '/pub/Stocktopia.zip');
	res.download(file);
  });


app.get('/problem', (req, res) => {
	res.status(200).send('Error occurred')
})


const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})

