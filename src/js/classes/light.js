import {PointLight, DirectionalLight, HemisphereLight, CameraHelper} from "three";

export default function x(scene) {
    var hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.3);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 0.8, 0.5);
    hemiLight.position.set(0, 30, 0);
    scene.add(hemiLight);


    var dirLight = new DirectionalLight(0xffffff, 0.3);

    dirLight.position.set(-50, 80, 0);

    dirLight.castShadow = true;

    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.bias=0.0001;
    dirLight.target.position.set(20, -2, 0);

    dirLight.shadow.radius = 1;

    scene.add(dirLight);
    scene.add(dirLight.target);

    // var helper = new CameraHelper(dirLight.shadow.camera);
    // scene.add(helper);

    let pointLight = new PointLight(0xffff55, 3);
    pointLight.distance = 12;
    pointLight.position.set(0, 0, 40);
    pointLight.castShadow = true;
    scene.add(pointLight);
}