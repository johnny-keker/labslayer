import {Mesh, MeshPhongMaterial, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, TextureLoader} from "three";

let mat = new MeshStandardMaterial({color: 0x9c2913});
let wallInfos = [
  { sX: 150, pX: 0, pZ: 10, r: Math.PI },  // w1
  { sX: 300, pX: -75, pZ: -140, r: Math.PI / 2 }, // w2
  { sX: 300, pX: 75, pZ: -140, r: -Math.PI / 2 }, // w3
  { sX: 240, pX: -195, pZ: -290, r: Math.PI }, // w4
  { sX: 240, pX: 195, pZ: -290, r: Math.PI }, // w5
  { sX: 240, pX: -195, pZ: -290, r: Math.PI }, // w6
  { sX: 630, pX: -315, pZ: -605, r: Math.PI / 2 }, // w7
  { sX: 630, pX: 315, pZ: -605, r: -Math.PI / 2 }, // w8
  { sX: 240, pX: -195, pZ: -920, r: 0 }, // w9
  { sX: 240, pX: 195, pZ: -920, r: 0 }, // w10
  { sX: 150, pX: 0, pZ: -1220, r: 0 },  // w11
  { sX: 300, pX: -75, pZ: -1070, r: Math.PI / 2 }, // w12
  { sX: 300, pX: 75, pZ: -1070, r: -Math.PI / 2 }, // w13
]



export default class Wall {
  constructor() {
    this.planes = [];

    wallInfos.forEach(wI => {
      var plane = new Mesh(new PlaneGeometry(wI.sX, 70, 1, 1), mat);
      plane.rotation.y = wI.r;
      plane.position.x += wI.pX;
      plane.position.z += wI.pZ;
      plane.position.y = 17;
      //plane.castShadow = true;
      this.planes.push(plane);
    });
  }
}