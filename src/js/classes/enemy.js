import {Mesh, MeshStandardMaterial, ConeGeometry, SphereGeometry, Vector3, Raycaster, ArrowHelper} from "three";

let mat1 = new MeshStandardMaterial({color: 0xa5b5a9});
let mat2 = new MeshStandardMaterial({color: 0x1da33f});

export default class Enemy {
  constructor(bullets, player, scene, pX, pZ, walls) {
    this.scene = scene;
    this.timer = 1.5;
    this.player = player;
    this.bullets = bullets;
    this.walls = walls;

    var downCone = new Mesh(new ConeGeometry(10, 30), mat1);
    downCone.position.x = pX;
    downCone.position.z = pZ;
    downCone.position.y = -10;
    scene.add(downCone);

    var sphere = new Mesh(new SphereGeometry(10, 10), mat2);
    sphere.position.x = pX;
    sphere.position.z = pZ;
    sphere.position.y = 15;
    scene.add(sphere);
    this.sphere = sphere;
    //this.arrow = new ArrowHelper(new Vector3(0, 0, -1), this.sphere.position, 100, Math.random() * 0xffffff );
    //scene.add(this.arrow);
    //this.direction = new Vector3();
    
    var upCone = new Mesh(new ConeGeometry(10, 30), mat1);
    upCone.rotation.x = Math.PI;
    upCone.position.x = pX;
    upCone.position.z = pZ;
    upCone.position.y = 40;
    scene.add(upCone);
  }

  shoot(playerPosition) {
    this.sphere.lookAt(playerPosition);
    let ray = new Raycaster(this.sphere.position, this.sphere.getWorldDirection().normalize(), 0, 2000);
    let playerSphere = new Mesh(new SphereGeometry(1, 1), mat1);
    playerSphere.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
    playerSphere.updateMatrixWorld();
    //this.scene.remove(this.arrow);
    //this.arrow = new ArrowHelper( this.sphere.getWorldDirection().normalize(), this.sphere.position, 100, Math.random() * 0xffffff );
    //this.scene.add(this.arrow);
    let playerDis = ray.intersectObject(playerSphere)[0].distance;
    let wIntersect = ray.intersectObjects(this.walls)[0];
    let minWallDis = 0;
    if (wIntersect === undefined)
      minWallDis = 1000;
    else
      minWallDis = wIntersect.distance;
    if (minWallDis < playerDis) return;


    var bullet = new Mesh(new SphereGeometry(8, 8), mat2);
    bullet.position.copy(this.sphere.position);
    bullet.lookAt(playerPosition);
    this.bullets.push({object: bullet, dis: minWallDis});
    this.scene.add(bullet);
  }

  update(time) {
    this.timer -= time;
    if (this.timer <= 0) {
      this.shoot(this.player.position);
      this.timer = 1.5;
    }
  }
}