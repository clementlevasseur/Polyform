var BABYLON = require("BABYLONJS");

Polyform = (function() {

    var pf = function() {};

    pf.prototype.init = function(canvas) {

        this.nbTriangle = 20;
        this.area = new BABYLON.Vector3(10, 10, 10);
        this.points = [];

        this.engine = new BABYLON.Engine(canvas, true);

        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color3(0, 1, 0);

        var camera = new BABYLON.ArcRotateCamera("camera1", 0.1, 0.1, 10, new BABYLON.Vector3(0, 5, -10), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);

        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = .5;

        var x, y, z;
        for (var i = 0; i < this.nbTriangle*3; i++) {
            var position = this.area.clone();

            position.x *= Math.random() - 0.5;
            position.y *= Math.random() - 0.5;
            position.z *= Math.random() - 0.5;

            this.points.push(position);
        }

        var vertices = [];
        var indices = [];
        for (var i = 0; i < this.points.length; i++) {
            vertices.push(this.points[i].x, this.points[i].y, this.points[i].z);
            indices.push(i);
        }   

        console.log(this.points);
        this.vd = new BABYLON.VertexData();
        this.vd.set(vertices, BABYLON.VertexBuffer.PositionKind);

        this.mesh = new BABYLON.Mesh('main', this.scene);
        this.vd.applyToMesh(this.mesh);
        this.mesh.setIndices(indices);
    };


    pf.prototype.render = function() {

        // Register a render loop to repeatedly render the scene
        this.engine.runRenderLoop(function() {
            this.scene.render();
        }.bind(this));
        // Watch for browser/canvas resize events
        window.addEventListener("resize", function() {
            this.engine.resize();
        }.bind(this));

    };

    return pf;
})();