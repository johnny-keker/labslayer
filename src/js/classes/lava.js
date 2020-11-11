import texture from "../../textures/00.jpg"
import vShader from "../../shaders/lava_V.glsl"
import fShader from "../../shaders/lava_F.glsl"
import * as geometry from "../geometry-helper"
import * as matrix from "../matrices"

export default class Lava {
  constructor(twgl, gl) {
    this.twgl = twgl;
    this.gl = gl;
    this.progInfo = null;
    this.bufferInfo = this.initBuffers();
    this.texture = this.initTexture();

    // okay this boy handles the size of the lava lake. would be nice to divide its dims
    // by sceen size to make it actually square
    // actualy we can rotate and translate it too
    this.modelMatrix = new Float32Array(
                  [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1]);
    // we need to rotate lava lake to make it horizontal and
    // we need to move it down a bit
    this.modelMatrix = matrix.rotate(this.modelMatrix, [-90, 0, 0]);
    this.modelMatrix = matrix.translate(this.modelMatrix, 0, -20, 0);
  }

  async draw(phase, viewMatrix, projectionMatrix) {
    if (this.progInfo === null) {
      this.progInfo = await this.initProgam();
    }

    const uniforms = {
      uPhase: phase,
      uModelMatrix: this.modelMatrix,
      uViewMatrix: viewMatrix,
      uProjectionMatrix: projectionMatrix,
      uTexture: this.texture
    }

    this.gl.useProgram(this.progInfo.program);
    this.twgl.setBuffersAndAttributes(this.gl, this.progInfo, this.bufferInfo);
    this.twgl.setUniforms(this.progInfo, uniforms);
    this.twgl.drawBufferInfo(this.gl, this.bufferInfo);
  }

  async initProgam() {
    const vertexText = await (await fetch(vShader)).text();
    const fragmentText = await (await fetch(fShader)).text();

    const program = this.twgl.createProgramFromSources(this.gl, [vertexText, fragmentText]);
    const progInfo = this.twgl.createProgramInfoFromProgram(this.gl, program);
    return progInfo;
  }

  initBuffers() {
    let plane = geometry.generatePlane(1000, 1000);
    const arrays = {
      aVertexPosition: plane.positions,
      aTexcoord: plane.texcoors
    };
    return this.twgl.createBufferInfoFromArrays(this.gl, arrays);
  }

  initTexture() {
    return this.twgl.createTextures(this.gl, {lava: {src: texture}}).lava;
  }
}