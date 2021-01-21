var express = require('express')

var app = express()

app.use(express.static('./public'))

// app.set('view engine', 'jade')
app.set('view engine', 'html')
app.set('views', './views')

app.route('/')
.get(function(req, res) {
	// res.render('layout.html')
	res.sendFile('layout.html', { root: 'views' })
})

var srv = app.listen(3000, function() {
	console.log('Listening on '+3000)
})

app.use('/peerjs', require('peer').ExpressPeerServer(srv, {
	debug: true
}))
