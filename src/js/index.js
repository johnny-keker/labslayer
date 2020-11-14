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

import {WEBGL} from "three/examples/jsm/WebGL.js";
import { PointerLockControls } from "./classes/controls";

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

let moveForward = false;
let moveLeft = false;
let moveBackward = false;
let moveRight = false;
let canJump = true;

function degToRad(d) {
  return d * Math.PI / 180;
}

function init() {
  let container = document.body;
  let scene = new Scene();

  const canvas = document.createElement("CANVAS");
  document.body.appendChild(canvas);

  const image = document.createElement("img");
  image.src = "../hud/HUD-1.png";
  container.appendChild(image);

  let renderer = new Renderer(container, canvas);

  canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

  let camera = new Camera(renderer.threeRenderer);

  let controls = new PointerLockControls(camera.threeCamera, container);

  //window.onkeydown = function(e) { if (e.keyCode == 27) mouseLocked = false; }
  //document.onmousemove = onMouseMove;

  canvas.onclick = function() {
    controls.lock();
  }

  image.onclick = function() {
    controls.lock();
  }

  scene.add(controls.getObject());


  const onKeyDown = function (event) {
    switch ( event.keyCode ) {
      case 38: // up
      case 87: // w
        moveForward = true;
        break;
      case 37: // left
      case 65: // a
        moveLeft = true;
        break;
      case 40: // down
      case 83: // s
        moveBackward = true;
        break;
      case 39: // right
      case 68: // d
        moveRight = true;
        break;
      case 32: // space
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;
    }
  };

  const onKeyUp = function (event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = false;
        break;
      case 37: // left
      case 65: // a
        moveLeft = false;
        break;
      case 40: // down
      case 83: // s
        moveBackward = false;
        break;
      case 39: // right
      case 68: // d
        moveRight = false;
        break;
    }
  };

  //let raycaster = new Raycaster( new Vector3(), new Vector3( 0, - 1, 0 ), 0, 10 );

  document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

  const uniforms = {
    uPhase: { value: 0.0 }
  }

  const level = new Level(scene, uniforms);

  const light = new Light(scene, camera.threeCamera);

  function update(delta) {
      TWEEN.update();
  }

  const velocity = new Vector3();
  const direction = new Vector3();
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
    if (controls.isLocked === true) {
      //raycaster.ray.origin.copy(controls.getObject().position);
      //raycaster.ray.origin.y -= 10;
      //const intersections = raycaster.intersectObjects( objects );
      //const onObject = intersections.length > 0;

      const delta = (time - prevTime) / 1000;

      velocity.x -= velocity.x * 7.0 * delta;
      velocity.z -= velocity.z * 7.0 * delta;

      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize(); // this ensures consistent movements in all directions

      if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;
      /*
      let onObject = false;
      if (onObject === true) {
        velocity.y = Math.max( 0, velocity.y );
        canJump = true;
      }
      */

      controls.moveRight(-velocity.x * delta);
      controls.moveForward(-velocity.z * delta);

      var [match, nX, nZ] = level.validatePlayerPosition(camera.threeCamera.position.x, camera.threeCamera.position.z);
      if (match) {
        camera.threeCamera.position.set(nX, 10, nZ);
      }

      controls.getObject().position.y += (velocity.y * delta); // new behavior

      if (controls.getObject().position.y < 10) {
        velocity.y = 0;
        controls.getObject().position.y = 10;
        canJump = true;
      }
      //console.log(camera.threeCamera.position);
    }
    prevTime = time;
    light.updateSpotlight(time);
    renderer.render( scene, camera.threeCamera );
  }

  animate();
}