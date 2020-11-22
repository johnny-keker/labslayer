import {
  Vector3,
  Raycaster,
  Audio, AudioListener, AudioLoader
} from "three";

import { PointerLockControls } from "./controls";
import hud from "../../hud/HUD_gun.png";
import hud1 from "../../hud/HUD_gun_1.png";
import hud2 from "../../hud/HUD_gun_2.png";
import wasted from "../../hud/wasted.png";
import shoot from "../../sound/shoot.ogg";

let moveForward = false;
let moveLeft = false;
let moveBackward = false;
let moveRight = false;
let canJump = true;

export default class Player {
  constructor(scene, camera, level, container, listener) {
    this.level = level;
    this.camera = camera;
    this.scene = scene;
    let controls = new PointerLockControls(camera, container);
    this.controls = controls;
    this.shootCooldown = 0.6;

    let shootSound = new Audio(listener);
    const audioLoader = new AudioLoader();
    audioLoader.load(shoot, function (buffer) {
      shootSound.setBuffer(buffer);
      shootSound.setLoop(false);
      shootSound.setVolume(0.3);
    });
    this.shootSound = shootSound;


    this.huds = [hud2, hud1, hud];
    this.hudId = 2;
    const hudImage = document.createElement("img");
    hudImage.src = hud;
    container.appendChild(hudImage);
    this.hudImage = hudImage;
    hudImage.onclick = function() {
      controls.lock();
    }
    
    this.gun_direction = new Vector3(0, 0, -1);
    this.gun_ray = new Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 1200);
    this.ground_ray = new Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 30);

    document.addEventListener('keydown', this.onKeyDown, false);
    document.addEventListener('keyup', this.onKeyUp, false);
    document.addEventListener('mousedown', (event) => this.onMouseDown(), false);

    this.velocity = new Vector3();
    this.direction = new Vector3();

    scene.add(this.controls.getObject());
  }

  update(delta) {
    this.shootCooldown -= delta;
    this.velocity.x -= this.velocity.x * 7.0 * delta;
    this.velocity.z -= this.velocity.z * 7.0 * delta;

    this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    this.direction.z = Number(moveForward) - Number(moveBackward);
    this.direction.x = Number(moveRight) - Number(moveLeft);
    this.direction.normalize(); // this ensures consistent movements in all directions
    if (moveForward || moveBackward) this.velocity.z -= this.direction.z * 400.0 * delta;
    if (moveLeft || moveRight) this.velocity.x -= this.direction.x * 400.0 * delta;

    var oldPosition = this.camera.position;

    let intersections;
    var newPosition = this.camera.position;

    newPosition = this.controls.moveRight(-this.velocity.x * delta);
    this.ground_ray.ray.origin.copy(newPosition);
    intersections = this.ground_ray.intersectObjects(this.level.floor.planes);
    if (intersections.length == 0) newPosition = oldPosition;
    oldPosition = newPosition;

    newPosition = this.controls.moveForward(-this.velocity.z * delta, newPosition);
    this.ground_ray.ray.origin.copy(newPosition);
    intersections = this.ground_ray.intersectObjects(this.level.floor.planes);
    if (intersections.length == 0) newPosition = oldPosition;

    
    this.controls.getObject().position.set(newPosition.x, newPosition.y, newPosition.z);

    this.controls.getObject().position.y += (this.velocity.y * delta); // new behavior

    if (this.controls.getObject().position.y < 10) {
      this.velocity.y = 0;
      this.controls.getObject().position.y = 10;
      canJump = true;
    }
  };

  onMouseDown() {
    if (this.shootCooldown > 0) return;
    this.shootCooldown = 0.6;
    this.shootSound.play();
    this.gun_direction.set(0, 0, -1);
    this.gun_direction.unproject(this.camera);
    this.gun_ray.set(this.camera.position, this.gun_direction.sub(this.camera.position).normalize());
    if (this.level.aliveEnemiesCount() != 0) {
    for (let i = 0; i < this.level.enemies.length; i++) {
        let enemy = this.level.enemies[i];
        if (enemy.hp == 0) continue;
        let intersection = this.gun_ray.intersectObjects([enemy.sphere, enemy.upCone, enemy.downCone]);
        if (intersection.length > 0) {
          enemy.onhit();
        }
      };
    } else {
      let intersection = this.gun_ray.intersectObject(this.level.boss.hitbox);
      if (intersection.length > 0) {
        this.level.boss.onhit();
      }
    }
  };

  onclick() {
    this.controls.lock();
  };

  onhit() {
    this.hudId--;
    if (this.hudId == -1) {
      this.controls.unlock();
      this.hudImage.src = wasted;
      this.hudImage.onclick = function() {};
      return;
    }
    this.hudImage.src = this.huds[this.hudId];
  }

  onKeyDown(event) {
    switch (event.keyCode) {
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
        if (canJump === true) this.velocity.y += 200;
        canJump = false;
        break;
    }
  };

  onKeyUp(event) {
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
}