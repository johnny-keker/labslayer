import Floor from './floor';
import Lava from './lava';
import Wall from './wall';
import Roof from './roof';
import Target from './target';

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
    this.targets = new Target();
    this.targets.planes.forEach(e => {
      scene.add(e);
    });
  }

  moveLevel(x, z) {
    this.elements.forEach(e => {
      e.position.x += x;
      e.position.z += z;
    })
  }
}