const twgl = require('twgl.js')

import "../css/style.css"
import * as compiler from "./shaders-compiler"
import * as geometry from "./geometry-helper"
import * as matrix from "./matrices"
import Mouse from './mouse.js';

let gl;
let programs;
let arrays;
let bufferInfo;
let phase = 0;
let plane;
let rotations = [0, 0, 0];

async function main() {
  const canvas = document.createElement("CANVAS");
  document.body.appendChild(canvas);
  gl = canvas.getContext("webgl");

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  if (gl == null) {
    alert("Sorry, buddy - your browser or machine dont support WEB-GL(");
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  programs = { lava: await compiler.initLavaShader(gl, twgl) };

  plane = geometry.generatePlane(1000, 1000);
  arrays = {
    aVertexPosition: plane.positions
  };
  bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

  new Mouse(canvas, (radX, radY) => {
    let x = matrix.radToDeg(radX);
    let y = matrix.radToDeg(radY);
    if (x < -180) x = 180;
    else if (x > 180) x = -180;
    if (y < -180) y = 180;
    else if (y > 180) y = -180;
    //document.querySelector('.slider__x').value = x;    
    //document.querySelector('.slider__y').value = y;
    rotations[1] = y;
    //redrawScene();
  });

  requestAnimationFrame(render);
}

function render(time) {
  phase += 0.05;
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
  var projectionMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  var modelViewMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

  projectionMatrix = matrix.perspective(projectionMatrix,
    45,
    gl.canvas.clientWidth / gl.canvas.clientHeight,
    0.1,
    1000);
  projectionMatrix = matrix.rotate(projectionMatrix, rotations)
  modelViewMatrix = matrix.translate(modelViewMatrix, 500, -20, 0);
  modelViewMatrix = matrix.rotate(modelViewMatrix, [-90, 0, 0]);

  const uniforms = {
    uPhase: phase,
    uModelViewMatrix: modelViewMatrix,
    uProjectionMatrix: projectionMatrix
    //vTexcoord: plane.texcoors
  }

  gl.useProgram(programs.lava.program);
  twgl.setBuffersAndAttributes(gl, programs.lava, bufferInfo);
  twgl.setUniforms(programs.lava, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);
  //console.log('f');
  requestAnimationFrame(render);
}

document.addEventListener('DOMContentLoaded', main);