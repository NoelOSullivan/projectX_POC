function launchClient() {

	document.getElementById("interfaceConnection").style.display = "none";
	document.getElementById("interFaceClient").style.display = "block";

	initializePeerConnection();

	peer.on('open', function () {
		// TT.d Graphic interface for logging in. We can use this horrible browser prompt for the moment
		var destId = prompt("Enter host ID:")
		conn = peer.connect(destId, {
			reliable: true
		})
		conn.on('open', function () {
			// Event fired by success of the peer connection of CLIENT to the server, via a HOST ID
			// The client and the host have shaken hands. THey can now talk directly
			conn.on('data', function (data) {
				// Unused : we dont send stuff to the client yet
				// console.log('Received', data);
			});
			// TT.d - Interface for getting what you need from the gyroscope
			// What we need will be different depending on what we want to do
			testForOrientation();
		})
	})
}

function callHost(action) {
	conn.send([action]);
}

function testForOrientation() {
	// We tell our window to listen for orientation changes on the gyroscope
	window.addEventListener('deviceorientation', function (event) {
		// In the event of changes, 
		conn.send([event.alpha, event.beta, event.gamma]);
	});
}