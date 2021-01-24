function launchHost() {

	// This is a vanilla.js technique for controlling the display of a DOM element
	// display:none removes from the DOM. visibility:hidden merely hides
	// In modern applications we avoid telling things what to do
	document.getElementById("interfaceConnection").style.display = "none";
	document.getElementById("interFaceHost").style.display = "block";
	document.getElementById("starfieldHider").style.visibility = "hidden";

	initCanvas();

	initializePeerConnection("h");

	peer.on('open', function () {
		// Event fired by success of the peer connection of HOST to the server
		console.log("HOST ID : ", peerId);
	})
	peer.on('connection', function (conn) {
		// Event fired by reception of data package from a client
		conn.on('data', function (data) {
			console.log('Received', data);
			// TT.d Interface for receiving demands (Graphic Object, Behaviour, Layer ...)
			// TT.d Interface for direccting demands to correct functions
			switch (data[0]) {
				case "circle":
					drawCircle();
					break;
				case "square":
					drawSquare();
					break;
				default:
					Starfield.projectXhandleOrientation(data);
			}
		});
	})
}