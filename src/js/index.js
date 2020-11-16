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
        if (canJump === true) velocity.y += 200;
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

  var vector = new Vector3(0, 0, -1);

  let raycaster = new Raycaster( new Vector3(), new Vector3( 0, - 1, 0 ), 0, 30 );
  let gun_ray = new Raycaster( new Vector3(), new Vector3(0, -1, 0 ), 0, 1200);

  //let raycaster = new Raycaster( new Vector3(), new Vector3( 0, - 1, 0 ), 0, 10 );

  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );
  document.addEventListener('mousedown', function(event) {
    vector.set(0, 0, -1);
    vector.unproject(camera.threeCamera);
    gun_ray.set(camera.threeCamera.position, vector.sub(camera.threeCamera.position).normalize());
    let intersections = gun_ray.intersectObjects(level.targets.planes);
    if (intersections.length > 0)
      console.log('HIT');
    else
      console.log('MISS');
  });

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
      const delta = (time - prevTime) / 1000;

      velocity.x -= velocity.x * 7.0 * delta;
      velocity.z -= velocity.z * 7.0 * delta;

      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize(); // this ensures consistent movements in all directions

      if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

      var oldPosition = camera.threeCamera.position;
      /*
      let onObject = false;
      if (onObject === true) {
        velocity.y = Math.max( 0, velocity.y );
        canJump = true;
      }
      */
      let intersections;
      var newPosition = camera.threeCamera.position;

      newPosition = controls.moveRight(-velocity.x * delta);
      raycaster.ray.origin.copy(newPosition);
      intersections = raycaster.intersectObjects(level.floor.planes);
      if (intersections.length == 0) newPosition = oldPosition;
      oldPosition = newPosition;

      newPosition = controls.moveForward(-velocity.z * delta, newPosition);
      raycaster.ray.origin.copy(newPosition);
      intersections = raycaster.intersectObjects(level.floor.planes);
      if (intersections.length == 0) newPosition = oldPosition;

      
      controls.getObject().position.set(newPosition.x, newPosition.y, newPosition.z);

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