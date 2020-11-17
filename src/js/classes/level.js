import Floor from './floor';
import Lava from './lava';
import Wall from './wall';
import Roof from './roof';
import Target from './target';
import Enemy from './enemy';
import { Vector3 } from 'three';

export default class Level {
  constructor(scene, uniforms, player) {
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
    this.bullets = [];

    this.enemies = [
      new Enemy(this.bullets, player, scene, 270, -335, this.walls.planes)
    ];

    
    //this.targets = new Target(scene);
    //this.targets.planes.forEach(e => {
    //  scene.add(e);
    //});
  }

  update(time) {
    this.enemies.forEach(e => {e.update(time)});
    if (this.bullets.length == 0) return;
    this.bullets.forEach(b => {
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