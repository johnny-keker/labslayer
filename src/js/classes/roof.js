import {Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, TextureLoader} from "three";

let mat = new MeshStandardMaterial({color: 0x9c2913});
let planeInfos = [
  { sX: 150, sY: 1230, pX: 0, pZ: -605 },
  { sX: 240, sY: 630, pX: 195, pZ: -605 },
  { sX: 240, sY: 630, pX: -195, pZ: -605 },
]

export default class Floor {
  constructor() {
    this.planes = [];

    planeInfos.forEach(pI => {
      var plane = new Mesh(new PlaneGeometry(pI.sX, pI.sY, 1, 1), mat);
      plane.rotation.x = Math.PI / 2;
      plane.position.y = 52.0;
      plane.position.x += pI.pX;
      plane.position.z += pI.pZ;
      //plane.castShadow = true;
      this.planes.push(plane)
    });
  }
}