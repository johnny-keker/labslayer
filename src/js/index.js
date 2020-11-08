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
let playerX = 0;
let playerY = 0;

var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

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
    if (x < -70) x = -70;
    else if (x > 70) x = 70;
    if (y < -180) y = 180;
    else if (y > 180) y = -180;
    //document.querySelector('.slider__x').value = x;    
    //document.querySelector('.slider__y').value = y;
    rotations[1] = y;
    rotations[0] = x;
    //redrawScene();
  });

  requestAnimationFrame(render);
}

function render(time) {
  phase += 0.05;
  twgl.resizeCanvasToDisplaySize(gl.canvas);

  /* ---------------- */
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  /* ---------------- */

  var lavaWidth = 1;
  var lavaLength = 1;

  // okay this boy handles the size of the lava lake. would be nice to divide its dims
  // by sceen size to make it actually square
  // actualy we can rotate and translate it too
  var modelMatrix = new Float32Array([lavaWidth, 0, 0, 0, 0, 1, 0, 0, 0, 0, lavaLength, 0, 0, 0, 0, 1]);


  var projectionMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  
  var viewMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

  projectionMatrix = matrix.perspective(projectionMatrix,
    45,
    gl.canvas.clientWidth / gl.canvas.clientHeight,
    0.1,
    1000);
  projectionMatrix = matrix.rotate(projectionMatrix, rotations);

  // we need to rotate lava lake to make it horizontal and
  // we need to move it down a bit
  modelMatrix = matrix.rotate(modelMatrix, [-90, 0, 0]);
  modelMatrix = matrix.translate(modelMatrix, 0, -20, 0);

  // if (pressedKeys[87]) {
  //   playerX += Math.cos(matrix.radToDeg(rotations[1]));
  //   playerY += Math.sin(matrix.radToDeg(rotations[1]));
  //   //modelViewMatrix = matrix.translate(modelViewMatrix, playerX, 0, playerY);
  // }
    

  const uniforms = {
    uPhase: phase,
    uModelMatrix: modelMatrix,
    uViewMatrix: viewMatrix,
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