precision mediump float;
// input vertex position
attribute vec4 aVertexPosition;

// provided
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uPhase;

void main() {
  vec4 pos = aVertexPosition;
  pos.z = 1.0 * sin(0.4 * pos.x + uPhase) * sin(0.4 * pos.y + uPhase);
  // TODO: pos * model * view?
  gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * pos;
}
