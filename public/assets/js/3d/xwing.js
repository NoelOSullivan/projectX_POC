if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("xwingCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var xwingScene = [];

    BABYLON.SceneLoader.Load("./assets/3Dmodels/gltf/xwing/", "scene.gltf", engine, function(newScene) {
        newScene.executeWhenReady(function() {

            xwingScene = newScene;

            xwingScene.clearColor = new BABYLON.Color4(0, 0, 0, 0.000000000000001);

            var lastData1 = null;
            var lastData2 = null;

            var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0.6, new BABYLON.Vector3(0, 0, 1.5), xwingScene);

            camera.setTarget(BABYLON.Vector3.Zero());
            // camera.attachControl(canvas, true);

            // Places the camera "behind" the xwing
            camera.alpha = -1.57; // = -90deg in radians

            var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -10, 10), xwingScene)

            light.intensity = 5;

            cameraStartPositionAlpha = null;

            for (var i = 0; i < xwingScene.meshes.length; i++) {
                xwingScene.meshes[i].rotation.z += 10;
            }

            xwingScene.control = function(data) {

                // The "data" is received from the gyroscope. An array with three values.
                // The following are different attempts at converting this data into a pleasant flying experience.

                //-----------------------------------------------------------------------------

                for (var i = 0; i < xwingScene.meshes.length; i++) {
                    // Tried to rotate the meshes but the wings fly off.
                    // Ideally we should control the model.
                    // mesh.rotation = new BABYLON.Vector3(pitch, yaw, roll);
                    // xwingScene.meshes[i].rotation.z += 10;
                    // xwingScene.meshes[i].rotate(BABYLON.Axis.Y, data[2], BABYLON.Space.LOCAL);
                    // xwingScene.meshes[i].rotate(BABYLON.Axis.X, pitch, BABYLON.Space.LOCAL);
                    // xwingScene.meshes[i].rotate(BABYLON.Axis.Z, data[1], BABYLON.Space.LOCAL);
                }

                //-----------------------------------------------------------------------------

                if (data[2] >= lastData2) {
                    lastData2 = data[2];
                    camera.alpha += 0.005;
                    if (camera.alpha > -1) camera.alpha = -1;
                } else {
                    if (data[2] <= lastData2) {
                        lastData2 = data[2];
                        camera.alpha -= 0.005;
                        if (camera.alpha < -2.2) camera.alpha = -2.2;
                    }
                }

                if (data[1] >= lastData1) {
                    lastData1 = data[1];
                    camera.beta -= 0.0005;
                    if (camera.beta < 1) camera.beta = 1;
                } else {
                    if (data[1] <= lastData1) {
                        lastData1 = data[1];
                        camera.beta += 0.0005;
                        if (camera.beta > 1.6) camera.beta = 1.6;
                    }
                }

                //-----------------------------------------------------------------------------

                // if (cameraStartPositionAlpha === null) {
                //     cameraStartPositionAlpha = data[0];
                // }

                // if (data[0] > cameraStartPositionAlpha + 10) {
                //     camera.alpha -= 0.005;
                // } else {
                //     if (data[0] < cameraStartPositionAlpha - 10) {
                //         camera.alpha += 0.005;
                //     }
                // }

                //-----------------------------------------------------------------------------
            }

            engine.runRenderLoop(function() {
                // You can bypass the gyroscope and call the control function, in order to manually change values of things ;-)
                // xwingScene.control();
                xwingScene.render();
            });
        });




    });


}