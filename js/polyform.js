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

        var light = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), this.scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.intensity = 0.5;

        var x, y, z;
        for (var i = 0; i < this.nbTriangle*3; i++) {
            var position = this.area.clone();
            position.x *= Math.random() - 0.5;
            position.y *= Math.random() - 0.5;
            position.z *= Math.random() - 0.5;

            this.points.push(position);
        }

        var positions = [];
        var indices = [];
        var normals = [];
        for (var i = 0; i < this.points.length; i++) {
            positions.push(this.points[i].x, this.points[i].y, this.points[i].z);
            indices.push(i);
        }   

        this.vd = new BABYLON.VertexData();
        this.vd.positions = positions;
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        this.vd.normals = normals;

        this.mesh = new BABYLON.Mesh('main', this.scene);
        this.vd.applyToMesh(this.mesh, true);
        this.mesh.setIndices(indices);

        this.mesh.material = new BABYLON.StandardMaterial('mainMaterial', this.scene);
        this.mesh.material.backFaceCulling = false;
    };


    pf.prototype.updateMesh = function () {
        this.mesh.updateMeshPositions(function (positions) {
            for (var i = 0; i < this.points.length; i++) {
                positions[i*3] = this.points[i].x;
                positions[i*3+1] = this.points[i].y;
                positions[i*3+2] = this.points[i].z;
            }
        }.bind(this), true) 
    }

    pf.prototype.render = function() {

        // Register a render loop to repeatedly render the scene
        this.engine.runRenderLoop(function() {
            if (this.needUpdate) {
                this.updateMesh();
            }
            this.scene.render();
        }.bind(this));
        // Watch for browser/canvas resize events
        window.addEventListener("resize", function() {
            this.engine.resize();
        }.bind(this));

    };

    return pf;
})();