var peer = null
var peerId = null
var conn = null
// var clientIds = [];

function initializePeerConnection() {

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
}