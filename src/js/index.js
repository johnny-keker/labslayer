const twgl = require('twgl.js')

import "../css/style.css"
import * as matrix from "./matrices"
import Mouse from './mouse.js'
import Lava from './classes/lava'


let gl;
let phase = 0;
let rotations = [0, 0, 0];
let playerX = 0;
let playerY = 0;
let lava;
let viewMatrix;
let projectionMatrix;

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

  lava = new Lava(twgl, gl);

  // this thing controls cameras coordinate system. need to investigate more.
  viewMatrix = new Float32Array(
    [1, 0, 0, 0,
     0, 1, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1]);

  // dis boy is quite complicated
  projectionMatrix = new Float32Array(
    [1, 0, 0, 0,
     0, 1, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1]);

  projectionMatrix = matrix.perspective(projectionMatrix,
    45,
    gl.canvas.clientWidth / gl.canvas.clientHeight,
    0.1,
    1000);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  new Mouse(canvas, (radX, radY) => {
    let x = matrix.radToDeg(radX);
    let y = matrix.radToDeg(radY);
    if (x < -70) x = -70;
    else if (x > 70) x = 70;
    if (y < -180) y = 180;
    else if (y > 180) y = -180;
    rotations[1] = y;
    rotations[0] = x;
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

  projectionMatrix = matrix.rotate(projectionMatrix, rotations);

  lava.draw(phase, viewMatrix, projectionMatrix);

  requestAnimationFrame(render);
}

document.addEventListener('DOMContentLoaded', main);