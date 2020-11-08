import vShader from "../shaders/lava_V.glsl"
import fShader from "../shaders/lava_F.glsl"

export async function initLavaShader(gl, twgl) {
  const vertexText = await (await fetch(vShader)).text();
  const fragmentText = await (await fetch(fShader)).text();

  const program = twgl.createProgramFromSources(gl, [vertexText, fragmentText]);
  const progInfo = twgl.createProgramInfoFromProgram(gl, program);
  return progInfo;
}