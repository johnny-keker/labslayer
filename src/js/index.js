import "./../css/style.css";

import {
  Scene,
  Vector3
} from "three";

import Camera from './classes/camera';
import Renderer from './classes/renderer';
import * as Lava from './classes/lava';
import * as TWEEN from "@tweenjs/tween.js";
import * as Light from "./classes/light";

import {WEBGL} from "three/examples/jsm/WebGL.js";

if (WEBGL.isWebGLAvailable()) {
  init();
} else {
  let warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}

let x = 0;
let y = 0;
let mouseLocked = false;
let rotations = [0,0,0];

function degToRad(d) {
  return d * Math.PI / 180;
}

function init() {
  let container = document.body;
  let scene = new Scene();

  const canvas = document.createElement("CANVAS");
  document.body.appendChild(canvas);

  let renderer = new Renderer(container, canvas);

  canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

  canvas.onclick = function() {
    canvas.requestPointerLock();
    mouseLocked = true;
  }

  let camera = new Camera(renderer.threeRenderer);

  console.log(camera.threeCamera.rotation);

  window.onkeydown = function(e) { if (e.keyCode == 27) mouseLocked = false; }
  document.onmousemove = updatePosition;

  function updatePosition(e) {
    if (!mouseLocked) return;
    x += e.movementX;//matrix.radToDeg(radX);
    y += e.movementY;//matrix.radToDeg(radY);
    if (x < -180) x = 180;
    else if (x > 180) x = -180;
    if (y < -70) y = -70;
    else if (y > 70) y = 70;
    camera.threeCamera.rotation.setFromVector3(new Vector3(0, -degToRad(x), 0));
    //console.log(camera.threeCamera.position);
    //camera.threeCamera.rotation.y += degToRad(e.movementX);
  }

  const uniforms = {
    uPhase: { value: 0.0 }
  }

  const lava = Lava.default(uniforms);
  scene.add(lava);

  Light.default(scene);

  function update(delta) {
      TWEEN.update();
  }

  function animate() {
    requestAnimationFrame(animate);
    //delta = clock.getDelta();
    //update(delta);
    uniforms.uPhase.value += 0.1;
    renderer.render(scene, camera.threeCamera);
    //lava.rotation.z += 1;
    //camera.threeCamera.rotation.y += 0.01;
    //camera.threeCamera.rotation.x += 0.01;
    //console.log(camera.threeCamera.rotation.x);
  }

  animate();
}