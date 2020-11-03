precision mediump float;
attribute vec4 aVertexPosition;

void main() {
  vec4 pos = aVertexPosition;
  pos.z = 1.0 * sin(0.4 * pos.x + 0.2) * sin(0.4 * pos.y + 0.2);
  gl_Position = pos;
}