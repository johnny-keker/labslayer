import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import bossModel from "../../boss/tower.obj";
import {Color, EquirectangularReflectionMapping, Mesh, MeshPhysicalMaterial, TextureLoader, MeshStandardMaterial, SphereGeometry, Raycaster,
  BoxGeometry} from "three";
import bossColorTexture from "../../boss/color.png";
import Ash from './shootParticles';

let mat1 = new MeshStandardMaterial({color: 0xa5b5a9});
const PI_20 = Math.PI / 20;

export default class Boss {
  constructor(scene, bullets, walls, particles) {
    const loader = new OBJLoader();
    this.object = null;
    this.timeout = 5;
    this.current_rotation = 0;
    this.current_bullets_count = 0;
    this.bullets = bullets;
    this.scene = scene;
    this.walls = walls;
    this.hitbox = new Mesh(new BoxGeometry(45, 300, 45));
    this.hitbox.position.set(0, 0, -605);
    this.hitbox.visible = false;
    this.killed = false;
    this.particles = particles;
    scene.add(this.hitbox);

    loader.load(
      // resource URL
      bossModel,
      // called when resource is loaded
      (object) => {

          let textureLoader = new TextureLoader();


          // object.children[c]
          let textureCube = textureLoader.load(bossColorTexture, function () {});
          //
          // object.material.transparent = true;
          textureCube.mapping = EquirectangularReflectionMapping;
          textureCube.needsUpdate = true;

          object.traverse(function (child) {

              if (child instanceof Mesh) {
                  child.material = new MeshPhysicalMaterial();
                  child.material.map = textureCube;
                  child.material.envMap = textureCube;
                  child.castShadow = true;
                  child.receiveShadow = true;
              }

          });

          object.castShadow = true;
          object.receiveShadow = true;

          object.position.set(0, -23, -605);
          object.scale.set(0.15, 0.15, 0.15);
          scene.add(object);
          this.object = object;
      },

      // called when loading is in progresses
      function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      function (error) {
          console.log('An error happened');
      }
    );
  }

  onhit() {
    if (this.killed) return;
    this.scene.remove(this.object);
    this.scene.remove(this.hitbox);
    this.killed = true;
    this.particles.push(new Ash(this.scene, this.hitbox.position, 30, 400, 200));
  }

  update(delta) {
    if (this.killed) return;
    this.timeout -= delta;
    if (this.timeout > 0) return;
    var bullet = new Mesh(new SphereGeometry(8, 8), mat1);
    bullet.position.set(0, 10, -605);
    bullet.rotation.y = this.current_rotation;

    let ray = new Raycaster(bullet.position, bullet.getWorldDirection().normalize(), 0, 2000);
    let wIntersect = ray.intersectObjects(this.walls)[0];
    let minWallDis = 0;
    if (wIntersect === undefined)
      minWallDis = 1000;
    else
      minWallDis = wIntersect.distance;

    this.current_rotation += PI_20;
    this.bullets.push({object: bullet, dis: minWallDis});
    this.scene.add(bullet);
    this.current_bullets_count++;
    if (this.current_bullets_count == 40) {
      this.timeout = 5.0;
      this.current_rotation = 0;
    }
    else
      this.timeout = 1.0;
  }
}