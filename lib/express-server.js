var express = require('express');

// app is the name of our express server object
var app = express();

app.use(express.static('./public'));

// Even though views are possible, we only have one in the POC
// Going between views in vanilla JS poses problems with the "state"
app.set('view engine', 'html')
app.set('views', './views')

// Slash refers to the "ROOT" level
// Here we tell app to show "layout.html" when user comes to entry page
app.route('/')
.get(function(req, res) {
	res.sendFile('layout.html', { root: 'views' })
})

var srv = app.listen(3000, function() {
	console.log('Listening on '+3000)
})

// Some magic that links peerjs webRTC to the server, thus enabling direct peer-to-peer comms
app.use('/peerjs', require('peer').ExpressPeerServer(srv, {
	debug: true
}))
