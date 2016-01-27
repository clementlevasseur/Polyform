var BABYLON = require("BABYLONJS");

Polyform = (function () {

   var pf = function () {};

   pf.prototype.init = function (canvas) {
      this.engine = new BABYLON.Engine(canvas, true);

      this.scene = new BABYLON.Scene(this.engine);
      this.scene.clearColor = new BABYLON.Color3(0, 1, 0);

      var camera = new BABYLON.ArcRotateCamera("camera1", 0.1, 0.1, 10, new BABYLON.Vector3(0, 5, -10), this.scene);
      camera.setTarget(BABYLON.Vector3.Zero());
      camera.attachControl(canvas, false);

      var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
      light.intensity = .5;

      var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, this.scene);
      sphere.position.y = 1;

      var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, this.scene);
   };


   pf.prototype.render = function () {

      // Register a render loop to repeatedly render the scene
      this.engine.runRenderLoop(function () {
         this.scene.render();
      }.bind(this));
      // Watch for browser/canvas resize events
      window.addEventListener("resize", function () {
         this.engine.resize();
      });
      
   };

   return pf;
})();
