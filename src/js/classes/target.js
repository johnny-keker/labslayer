import {Mesh, MeshPhongMaterial, MeshStandardMaterial, PlaneGeometry, BoxGeometry, RepeatWrapping, TextureLoader} from "three";

let mat = new MeshStandardMaterial({color: 0x00ff00});
let targetInfos = [
  { pX: 0, pZ: -605 },  // w1
]

export default class Target {
  constructor() {
    this.planes = [];

    targetInfos.forEach(wI => {
      var plane = new Mesh(new BoxGeometry(50, 50, 50, 50, 50, 50), mat);
      plane.position.x += wI.pX;
      plane.position.z += wI.pZ;
      plane.position.y = 25;
      //plane.castShadow = true;
      this.planes.push(plane);
    });
  }
}