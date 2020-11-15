import {Mesh, MeshPhongMaterial, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, TextureLoader} from "three";

let mat = new MeshStandardMaterial({color: 0x9c2913});

export default class Wall {
  constructor([sX, pX, pZ, r], invisible) {
    this.sX = sX;
    this.pX = pX;
    this.pZ = pZ;
    this.r = r;
    this.invisible = invisible;

    if (!invisible) {
      var plane = new Mesh(new PlaneGeometry(sX, 70, 1, 1), mat);
      plane.rotation.y = r;
      plane.position.x += pX;
      plane.position.z += pZ;
      plane.position.y = 17;
      //plane.castShadow = true;
      this.plane = plane;
    }

    switch (this.r) {
      case Math.PI:
      case 0:
        this.lEdge = pX - (sX / 2);
        this.rEdge = pX + (sX / 2);
        this.barrier = pZ > 0 ? pZ - 0.5 : pZ + 0.5;
        break;
      case Math.PI / 2:
      case -Math.PI / 2:
        this.lEdge = pZ - (sX / 2);
        this.rEdge = pZ + (sX / 2);
        this.barrier = pX > 0 ? pX - 0.5 : pX + 0.5;
        break;
    }
  }
}