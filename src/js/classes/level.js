import Floor from './floor';
import Lava from './lava';
import Wall from './wall';
import Roof from './roof';
import Enemy from './enemy';
import Boss from './boss'
import { Vector3 } from 'three';

export default class Level {
  constructor(scene, uniforms, camera, player) {
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
    this.particles = [];

    this.boss = new Boss(scene, this.bullets, this.walls.planes, this.particles);
    this.enemies = [
      new Enemy(this.bullets, camera, scene, -270, -335, this.walls.planes, this.boss, this.particles),
      new Enemy(this.bullets, camera, scene, 270, -335, this.walls.planes, this.boss, this.particles),
      new Enemy(this.bullets, camera, scene, 270, -875, this.walls.planes, this.boss, this.particles),
      new Enemy(this.bullets, camera, scene, -270, -875, this.walls.planes, this.boss, this.particles),
    ];

    this.scene = scene;
    this.camera = camera;
    this.player = player;
  }

  aliveEnemiesCount() {
    return this.enemies.filter(e => e.hp > 0).length;
  }

  update(time) {
    this.enemies.forEach(e => { if(e.hp > 0) e.update(time)});
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (!this.particles[i].update(time)) {
        this.particles.splice(i, 1);
        i--;
      }
    }
    this.boss.update(time);
    if (this.bullets.length == 0) return;
    for (let i = this.bullets.length - 1; i >= 0; i--)
    {
      let b = this.bullets[i];
      let vec = new Vector3();
      vec.setFromMatrixColumn(b.object.matrix, 0);
      vec.crossVectors(new Vector3(0, 1, 0), vec);
      b.object.position.addScaledVector(vec, -3);
      b.dis -= 3;
      let playerDistance = b.object.position.distanceTo(this.camera.position);
      if (playerDistance <= 10) {
        this.scene.remove(b.object);
        this.bullets.splice(i, 1);
        this.player.onhit();
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