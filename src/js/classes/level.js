import Floor from './floor';
import Lava from './lava';
import Wall from './wall';
import Roof from './roof';
import Target from './target';
import { Vector3 } from 'three';

export default class Level {
  constructor(scene, uniforms) {
    this.floor = new Floor();
    this.floor.planes.forEach(e => {
      scene.add(e);
    });
    this.roof = new Roof();
    this.roof.planes.forEach(e => {
      scene.add(e);
    });
    scene.add(new Lava(uniforms).plane);
    this.walls = new Wall();
    this.walls.planes.forEach(e => {
      scene.add(e);
    });
    this.targets = new Target(scene);
    this.targets.planes.forEach(e => {
      scene.add(e);
    });
  }

  update() {
    if (this.targets.bullets.length == 0) return;
    this.targets.bullets.forEach(b => {
      let vec = new Vector3();
      vec.setFromMatrixColumn( b.matrix, 0 );
      vec.crossVectors( new Vector3(0, 1, 0), vec );
      b.position.addScaledVector(vec, -2);
    });
  }

  moveLevel(x, z) {
    this.elements.forEach(e => {
      e.position.x += x;
      e.position.z += z;
    })
  }
}