import Floor from './floor';
import Lava from './lava';
import Wall from './wall';

let wallDefinitions = [
  { g: [150, 0, 10, Math.PI], inv: false },  // w1
  { g: [300, -75, -140, Math.PI / 2], inv: false}, // w2
  { g: [300, 75, -140, -Math.PI / 2], inv: false}, // w3
  { g: [450, 0, -380, 0], inv: true} // w4
]

export default class Level {
  constructor(scene, uniforms) {
    this.elements = new Floor().planes;
    this.elements.push(new Lava(uniforms).plane);
    this.elements.forEach(e => {
      scene.add(e);
    });
    this.walls = [];
    wallDefinitions.forEach(wd => {
      let wall = new Wall(wd.g, wd.inv);
      this.walls.push(wall);
      if (!wd.inv) scene.add(wall.plane);
    })
    
  }

  moveLevel(x, z) {
    this.elements.forEach(e => {
      e.position.x += x;
      e.position.z += z;
    })
  }

  validatePlayerPosition(x, z) {
    for (let i = 0; i < this.walls.length; i++) {
      let res = this.walls[i].validatePosition(x, z);
      if (res[0]) return res;
    }
    return [false, 0, 0];
  }
}