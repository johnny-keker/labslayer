import {PointLight, DirectionalLight, HemisphereLight, CameraHelper, SpotLight} from "three";


export default class Light {
    constructor(scene, camera){
        var hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.3);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 0.8, 0.5);
        hemiLight.position.set(0, 30, 0);
        scene.add(hemiLight);


        var dirLight = new DirectionalLight(0xffffff, 0.1);

        dirLight.position.set(0, 10, 0);

        dirLight.castShadow = true;

        dirLight.shadow.camera.near = 1;
        dirLight.shadow.camera.far = 2;
        dirLight.shadow.camera.left = -0.1;
        dirLight.shadow.camera.bottom = -0.1;
        dirLight.shadow.camera.right = 0.1;
        dirLight.shadow.camera.top = 0.1;
        dirLight.shadow.bias=0.0001;
        dirLight.target.position.set(0, 0, 1);

        dirLight.shadow.radius = 0.1;

        //scene.add(dirLight);
        //scene.add(dirLight.target);

        let spotLight = new SpotLight(0xffffff, 0.5, 150);
        spotLight.power = 15;
        spotLight.angle = 0.4;
        spotLight.decay = 1;
        spotLight.penumbra = 0.1;
        spotLight.distance = 2000;
        camera.add( spotLight.target );
        spotLight.target.position.set( 0, 0, -1 );
        spotLight.position.copy( camera.position );
        scene.add(spotLight)
        this.spotLight = spotLight;
        this.camera = camera;

        //const light = new PointLight( 0xff0000, 1, 200 );
        //camera.add(light);

        //var helper = new CameraHelper(dirLight.shadow.camera);
        //scene.add(helper);

        //let pointLight = new PointLight(0xffff55, 3);
        //pointLight.distance = 12;
        //pointLight.position.set(0, 0, 40);
        //pointLight.castShadow = true;
        //scene.add(pointLight);
    };
    
    updateSpotlight() {
        this.spotLight.position.copy(this.camera.position);
    }
}