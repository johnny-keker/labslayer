import { WebGLRenderer, PCFShadowMap, GammaEncoding } from "three";

// Main webGL renderer class
export default class Renderer {
  constructor(container, canvas) {
    // Properties
    this.container = container;

    // Create WebGL renderer and set its antialias
    this.threeRenderer = new WebGLRenderer({ antialias: true, canvas: canvas });

    this.threeRenderer.outputEncoding = GammaEncoding;
    this.threeRenderer.setPixelRatio(window.devicePixelRatio); // For retina

    // Appends canvas
    container.appendChild(this.threeRenderer.domElement);
    // Shadow map options
    //this.threeRenderer.shadowMap.enabled = true;
    //this.threeRenderer.shadowMap.type = PCFShadowMap;
    // this.threeRenderer.shadowMap.type = PCFSoftShadowMap;

    // Initial size update set to canvas container
    this.updateSize();

    // Listeners
    document.addEventListener(
      "DOMContentLoaded",
      () => this.updateSize(),
      false
    );
    window.addEventListener("resize", () => this.updateSize(), false);
  }

  updateSize() {
    // this.threeRenderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
  }

  render(scene, camera) {
    // Renders scene to canvas target
    this.threeRenderer.render(scene, camera);
  }
}