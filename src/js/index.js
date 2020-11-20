import "./../css/style.css";

import {
  Scene,
  Vector3,
  Raycaster
} from "three";

import Camera from './classes/camera';
import Renderer from './classes/renderer';
import Level from './classes/level';
import * as TWEEN from "@tweenjs/tween.js";
import Light from "./classes/light";
import hud from "../hud/HUD_gun.png";

import {WEBGL} from "three/examples/jsm/WebGL.js";
import Player from "./classes/player";

if (WEBGL.isWebGLAvailable()) {
  init();
} else {
  let warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}

function init() {
  let container = document.body;
  const scene = new Scene();

  const canvas = document.createElement("CANVAS");
  document.body.appendChild(canvas);

  const image = document.createElement("img");
  image.src = hud;
  container.appendChild(image);

  let renderer = new Renderer(container, canvas);

  canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

  
  const camera = new Camera(renderer.threeRenderer);

  //window.onkeydown = function(e) { if (e.keyCode == 27) mouseLocked = false; }
  //document.onmousemove = onMouseMove;

  canvas.onclick = function() {
    player.onclick();
  }

  image.onclick = function() {
    player.onclick();
  }
  /*
  document.addEventListener('mousedown', function(event) {
    vector.set(0, 0, -1);
    vector.unproject(camera.threeCamera);
    gun_ray.set(camera.threeCamera.position, vector.sub(camera.threeCamera.position).normalize());
    let intersections = gun_ray.intersectObjects(level.targets.planes);
    if (intersections.length > 0) {
      console.log('HIT');
      level.targets.shoot(controls.getObject().position);
    }
    else
      console.log('MISS');
  });
  */

  const uniforms = {
    uPhase: { value: 0.0 }
  }

  const level = new Level(scene, uniforms, camera.threeCamera);

  let player = new Player(scene, camera.threeCamera, level, container);

  const light = new Light(scene, camera.threeCamera);

  function update(delta) {
      TWEEN.update();
  }

  let prevTime = performance.now();

  function animate() {
    requestAnimationFrame(animate);
    //delta = clock.getDelta();
    //update(delta);
    uniforms.uPhase.value += 0.1;
    //lava.rotation.z += 1;
    //camera.threeCamera.rotation.y += 0.01;
    //camera.threeCamera.rotation.x += 0.01;
    //console.log(camera.threeCamera.rotation.x);
    const time = performance.now();
    if (player.controls.isLocked === true) {
      const delta = (time - prevTime) / 1000;
    
      player.update(delta);
      level.update(delta);
    }
    prevTime = time;
    light.updateSpotlight(time);
    renderer.render(scene, camera.threeCamera);
  }

  animate();
}