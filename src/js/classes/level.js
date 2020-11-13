import Floor from './floor';
import Lava from './lava';

export default class Level {
  constructor(scene, uniforms) {
    this.elements = new Floor().planes;
    this.elements.push(new Lava(uniforms).plane);
    this.elements.forEach(e => {
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