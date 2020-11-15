import Floor from './floor';
import Lava from './lava';
import Wall from './wall';

let wallDefinitions = [
  { g: [150, 0, 10, Math.PI], inv: false },  // w1
  { g: [300, -75, -140, Math.PI / 2], inv: false}, // w2
  { g: [300, 75, -140, -Math.PI / 2], inv: false}, // w3
  //{ g: [450, 0, -380, 0], inv: true}, // w4
  { g: [240, -195, -290, Math.PI], inv: false}, // w5
]

export default class Level {
  constructor(scene, uniforms) {
    this.floor = new Floor();
    this.floor.planes.forEach(e => {
      scene.add(e);
    });
    scene.add(new Lava(uniforms).plane);
    this.walls = [];
    wallDefinitions.forEach(wd => {
      let wall = new Wall(wd.g, wd.inv);
      this.walls.push(wall.plane);
      if (!wd.inv) scene.add(wall.plane);
    })
    
  }

  moveLevel(x, z) {
    this.elements.forEach(e => {
      e.position.x += x;
      e.position.z += z;
    })
  }
}