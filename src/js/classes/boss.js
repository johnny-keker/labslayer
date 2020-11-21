import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import bossModel from "../../boss/tower.obj";
import {Color, EquirectangularReflectionMapping, Mesh, MeshPhysicalMaterial, TextureLoader} from "three";
import bossColorTexture from "../../boss/color.png";

export default class Boss {
  constructor(scene) {
    const loader = new OBJLoader();
    loader.load(
      // resource URL
      bossModel,
      // called when resource is loaded
      function (object) {

          let textureLoader = new TextureLoader();


          // object.children[c]
          let textureCube = textureLoader.load(bossColorTexture, function () {

          });
          //
          // object.material.transparent = true;
          textureCube.mapping = EquirectangularReflectionMapping;
          textureCube.needsUpdate = true;

          object.traverse(function (child) {

              if (child instanceof Mesh) {
                  child.material = new MeshPhysicalMaterial();
                  child.material.map = textureCube;
                  child.material.envMap = textureCube;
                  child.castShadow = true;
                  child.receiveShadow = true;
              }

          });

          //object.castShadow = true;
          //object.receiveShadow = true;

          object.position.set(0, -20, -605);
          object.scale.set(0.15, 0.15, 0.15);
          scene.add(object);
      },

      // called when loading is in progresses
      function (xhr) {

          console.log((xhr.loaded / xhr.total * 100) + '% loaded');

      },
      // called when loading has errors
      function (error) {

          console.log('An error happened');

      }
  );
  }
}