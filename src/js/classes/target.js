import {Mesh, MeshPhongMaterial, MeshStandardMaterial, PlaneGeometry, BoxGeometry, SphereGeometry, RepeatWrapping, TextureLoader, Vector3} from "three";

let mat = new MeshStandardMaterial({color: 0x00ff00});
let targetInfos = [
  { pX: 0, pZ: -605 },  // w1
]

export default class Target {
  constructor(scene) {
    this.scene = scene;
    this.planes = [];

    targetInfos.forEach(wI => {
      var plane = new Mesh(new BoxGeometry(50, 50, 50, 50, 50, 50), mat);
      plane.position.x += wI.pX;
      plane.position.z += wI.pZ;
      plane.position.y = 25;
      //plane.castShadow = true;
      this.planes.push(plane);
    });
    this.bullets = [];
  }

  shoot(playerPosition) {
    var bullet = new Mesh(new SphereGeometry(10, 10, 10), mat);
    bullet.position.copy(this.planes[0].position);
    bullet.lookAt(playerPosition);
    this.bullets.push(bullet);
    this.scene.add(bullet);
  }
}