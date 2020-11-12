import { PerspectiveCamera, Vector3 } from "three";

// Class that creates and updates the main camera
export default class Camera {
  constructor(renderer) {
    const fov = 60;
    const near = 0.1;
    const far = 1000;
    const aspect = renderer.domElement.width / renderer.domElement.height;

    // Create and position a Perspective Camera
    this.threeCamera = new PerspectiveCamera(fov, aspect, near, far);
    this.threeCamera.position.set(0, 0, 0);
    this.threeCamera.up = new Vector3(0, 0, 1);

    // Initial sizing
    this.updateSize(renderer);

    // Listeners
    window.addEventListener("resize", () => this.updateSize(renderer), false);
  }

  updateSize(renderer) {
    // Multiply by dpr in case it is retina device
    // const width = renderer.domElement.width * Config.dpr;
    // const height = renderer.domElement.height * Config.dpr;
    // this.threeCamera.aspect =  width / height;
    this.threeCamera.aspect =
      renderer.domElement.width / renderer.domElement.height;

    // Always call updateProjectionMatrix on camera change
    this.threeCamera.updateProjectionMatrix();
  }
}