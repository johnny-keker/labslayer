import {Mesh, RepeatWrapping, ShaderMaterial, PlaneGeometry, TextureLoader } from "three";
import lavaTextureFile from '../../textures/lava.jpg';

const vShader = `
uniform float uPhase;

varying vec2 vTexcoord;

void main() {
  vec4 pos = vec4(position, 1.0);
  pos.z = 1.0 * sin(0.4 * pos.x + uPhase) * sin(0.4 * pos.y + uPhase);
  vTexcoord = vec2(round(pos.x) / 40.0, round(pos.y) / 40.0);
  gl_Position = projectionMatrix * modelViewMatrix * pos;
}`

const fShader = `
varying vec2 vTexcoord;

uniform sampler2D uTexture;

void main() {
  gl_FragColor = texture2D(uTexture, vTexcoord);
  //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`

export default class Lava {
  constructor(uniforms) {
    const textureLoader = new TextureLoader();

    let lavaTexture = textureLoader.load(lavaTextureFile);
    lavaTexture.wrapS = RepeatWrapping;
    lavaTexture.wrapT = RepeatWrapping;
    lavaTexture.repeat.set(100, 100);
    uniforms.uTexture = { type: "t", value: lavaTexture };

    let lavaMaterial = new ShaderMaterial({vertexShader: vShader, fragmentShader: fShader, uniforms});
    let plane = new Mesh(new PlaneGeometry(540, 540, 100, 100), lavaMaterial);
    plane.geometry.vertices
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -20.0;
    plane.position.z -= 605;
    this.plane = plane;
  }
}