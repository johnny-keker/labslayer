import {Mesh, MeshPhongMaterial, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, TextureLoader} from "three";

let mat = new MeshStandardMaterial({color: 0x9c2913});
let planeInfos = [
  { sX: 150, sY: 300, pX: 0, pZ: -140 },
  { sX: 630, sY: 90, pX: 0, pZ: -335 },
  { sX: 90, sY: 450, pX: -270, pZ: -605 },
  { sX: 90, sY: 450, pX: 270, pZ: -605 },
  { sX: 630, sY: 90, pX: 0, pZ: -875 },
  { sX: 150, sY: 90, pX: -150, pZ: -605 },
  { sX: 150, sY: 90, pX: 150, pZ: -605 },
  { sX: 150, sY: 150, pX: 0, pZ: -605 },
  { sX: 150, sY: 300, pX: 0, pZ: -1070 }
]

export default class Floor {
  constructor() {
    this.planes = [];

    planeInfos.forEach(pI => {
      var plane = new Mesh(new PlaneGeometry(pI.sX, pI.sY, 1, 1), mat);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -18.0;
      plane.position.x += pI.pX;
      plane.position.z += pI.pZ;
      //plane.castShadow = true;
      this.planes.push(plane)
    });
  }
}