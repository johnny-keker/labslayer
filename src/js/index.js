import "./../css/style.css";

import {
  Scene,
  Vector3,
  Raycaster,
  AudioListener
} from "three";

import Camera from './classes/camera';
import Renderer from './classes/renderer';
import Level from './classes/level';
import * as TWEEN from "@tweenjs/tween.js";
import Light from "./classes/light";

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

  let renderer = new Renderer(container, canvas);

  canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

  
  const camera = new Camera(renderer.threeRenderer);

  //window.onkeydown = function(e) { if (e.keyCode == 27) mouseLocked = false; }
  //document.onmousemove = onMouseMove;

  canvas.onclick = function() {
    player.onclick();
  }

  const uniforms = {
    uPhase: { value: 0.0 }
  }

  const listener = new AudioListener();
  camera.threeCamera.add(listener);

  let player = new Player(scene, camera.threeCamera, null, container, listener);
  const level = new Level(scene, uniforms, camera.threeCamera, player);
  player.level = level;

  const light = new Light(scene, camera.threeCamera);

  function update(delta) {
      TWEEN.update();
  }

  let prevTime = performance.now();

  function animate() {
    requestAnimationFrame(animate);
    uniforms.uPhase.value += 0.1;
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