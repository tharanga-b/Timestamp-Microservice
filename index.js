// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


app.get('/api', function (req, res) {
	res.json({ 'unix': Math.floor(new Date().getTime() / 1000), 'utc': new Date().toUTCString() })
})

app.get("/api/:date", function (req, res) {
	let { date } = req.params

	let intDate = parseInt(date)

	if (!isNaN(Date.parse(date))) {
		res.json({ 'unix': Date.parse(date), 'utc': new Date(Date.parse(date)).toUTCString() })
	} else {
		if (new Date(intDate) instanceof Date) {
			res.json({ 'unix': intDate, 'utc': (new Date(intDate)).toUTCString() })
		}
		else {
			res.json({ error: 'invalid Date' })
		}
	}
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
