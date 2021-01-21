// (function () {

// if (!util.supports.data) {
// 	$('.no-support').show().next().hide()
// 	return
// }

var peer = null
var peerId = null
var conn = null
var opponent = {
	peerId: null
}
var turn = false
var ended = false
var grid = [
	[],
	[],
	[],
	[],
	[],
	[],
	[]
]





// $('#game .grid tr td').on('mousedown', function (event) {
// 	event.preventDefault()
// 	if (!turn) {
// 		return
// 	}

// 	var i = $(this).index()
// 	if (grid[i].length == 6) {
// 		return
// 	}

// 	grid[i].push(peerId)
// 	$('#game .grid tr:eq(' + (6 - grid[i].length) + ') td:eq(' + i + ') .slot').addClass('filled')

// 	$('#game .alert p').text("Waiting for opponent's move")
// 	turn = false

// 	conn.send(['move', i])

// 	process()
// })


function initialize() {

	peer = new Peer('', {
		host: location.hostname,
		port: location.port || (location.protocol === 'https:' ? 443 : 80),
		path: '/peerjs',
		debug: 3
	})
	peer.on('open', function (id) {
		console.log("id", peerId);
		peerId = id
	})
	peer.on('error', function (err) {
		alert('' + err)
	})

	// Heroku HTTP routing timeout rule (https://devcenter.heroku.com/articles/websockets#timeouts) workaround
	// function ping() {
	// 	console.log(peer)
	// 	peer.socket.send({
	// 		type: 'ping'
	// 	})
	// 	setTimeout(ping, 16000)
	// }
	// ping()
}

//-------------------------------

function launchHost() {
	console.log("LAUNCH HOST");
	start();
}

function launchClient() {
	console.log("LAUNCH CLIENT");
	join();
}


//-------------------------------

function start() {

	document.getElementById("startButton").style.visibility = "hidden";
	document.getElementById("joinButton").style.visibility = "hidden";
	document.getElementById("interFaceHost").style.display = "block";

	initCanvas();


	initialize()
	peer.on('open', function () {
		console.log("HOST OPEN peerid", peerId);
		// $('#game .alert p').text('Waiting for opponent').append($('<span class="pull-right"></span>').text('Peer ID: ' + peerId))
		// $('#game').show().siblings('section').hide()
		// alert('Ask your friend to join using your peer ID: ' + peerId)
	})
	peer.on('connection', function (conn) {
		// if (conn) {
		// 	c.close()
		// 	return
		// }
		// conn = c
		turn = true
		console.log("CONNECTION TO HOST");

		var that = this;
		conn.on('data', function (data) {
			console.log('Received', data);
			drawCircle();
		});
		// conn.on('data', function (data) {
		// 	console.log("DATA", data);
		// 	// data === 'hello'
		// })
		// $('#game .alert p').text('Your move!')
		// begin()
	})
	// peer.on('data', function(data) {
	// 	console.log("DATA",data);
	// 	// data === 'hello'
	// })
}

function join() {

	document.getElementById("startButton").style.visibility = "hidden";
	document.getElementById("joinButton").style.visibility = "hidden";
	document.getElementById("interFaceClient").style.display = "block";

	initialize()
	peer.on('open', function () {
		console.log("CLIENT OPEN");
		var destId = prompt("Hosts's peer ID:")
		console.log("destId", destId);
		conn = peer.connect(destId, {
			reliable: true
		})
		conn.on('open', function () {
			console.log("CONN ON CLIENT");

			conn.on('data', function (data) {
				console.log('Received', data);
			});
			// 	opponent.peerId = destId
			// 	$('#game .alert p').text("Waiting for opponent's move")
			// 	$('#game').show().siblings('section').hide()
			// 	turn = false
			// 	begin()
			testForOrientation();
		})
	})
}

function callHost() {
	console.log("CALL HOST");
	conn.send(['Come in Orson'])
}

function testForOrientation() {
	window.addEventListener('deviceorientation', function (event) {
		console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
		conn.send([event.alpha, event.beta, event.gamma]);
	});
}

// $('a[href="#start"]').on('click', function (event) {
// 	event.preventDefault()
// 	start()
// })
// $('a[href="#join"]').on('click', function (event) {
// 	event.preventDefault()
// 	join()
// })

// $('#game .grid td').on('mouseenter', function () {
// 	$('#game .grid tr td:nth-child(' + ($(this).index() + 1) + ')').addClass('hover')
// })
// $('#game .grid td').on('mouseleave', function () {
// 	$('#game .grid tr td:nth-child(' + ($(this).index() + 1) + ')').removeClass('hover')
// })

// })()