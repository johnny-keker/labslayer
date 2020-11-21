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

    this.scene = scene;
    this.player = player;

    
    //this.targets = new Target(scene);
    //this.targets.planes.forEach(e => {
    //  scene.add(e);
    //});
  }

  update(time) {
    this.enemies.forEach(e => {e.update(time)});
    if (this.bullets.length == 0) return;
    for (let i = this.bullets.length - 1; i > 0; i--)
    {
      let b = this.bullets[i];
      let vec = new Vector3();
      vec.setFromMatrixColumn(b.object.matrix, 0);
      vec.crossVectors(new Vector3(0, 1, 0), vec);
      b.object.position.addScaledVector(vec, -2);
      b.dis -= 2;
      let playerDistance = b.object.position.distanceTo(this.player.position);
      if (playerDistance <= 10) {
        this.scene.remove(b.object);
        this.bullets.splice(i, 1);
        console.log("player hit!");
        i--;
      }
      else if (b.dis <= 0) {
        this.scene.remove(b.object);
        this.bullets.splice(i, 1);
        i--; 
      }
      //console.log(this.bullets);
    }
  }

  moveLevel(x, z) {
    this.elements.forEach(e => {
      e.position.x += x;
      e.position.z += z;
    })
  }
}