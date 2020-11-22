import {BufferGeometry, TextureLoader, Float32BufferAttribute, PointsMaterial, Points, AdditiveBlending, Vector3 } from 'three'
import snowlake from '../../textures/snowflake.png'

class Ash {
  constructor(scene, basePosition, lifespan = 2, s = 50, count = 30) {  
    const geometry = new BufferGeometry();
    const vertices = [];
    this.scene = scene;
    this.lifespan = lifespan;


    const textureLoader = new TextureLoader();

    const sprite1 = textureLoader.load(snowlake);

    for ( let i = 0; i < count; i ++ ) {

      const x = Math.random() * s - (s / 2);
      const y = Math.random() * s - (s / 2);
      const z = Math.random() * s - (s / 2);

      vertices.push( x, y, z );

    }

    geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

    const color = [0.0, 1.0, 0.0];
    const sprite = sprite1;
    const size = 10;

    const materials = new PointsMaterial( { size: size, map: sprite, blending: AdditiveBlending, depthTest: true, transparent: true } );
    materials.color.setRGB( color[ 0 ], color[ 1 ], color[ 2 ] );
    this.materials = materials;

    const particles = new Points( geometry, materials );
    
    particles.position.set(basePosition.x, basePosition.y, basePosition.z);

    scene.add( particles );
    this.particles = particles;
  }

  update(time) {
    this.lifespan -= time;
    if (this.lifespan < 0) {
      this.scene.remove(this.particles);
      return false;
    }
    this.particles.position.y -= time * 10;
    return true;
  }
}

class Fire {
  constructor(scene, camera) {
    const geometry = new BufferGeometry();
    const vertices = [];
    this.scene = scene;
    this.lifespan = 0.1;
    this.camera = camera;


    const textureLoader = new TextureLoader();

    const sprite1 = textureLoader.load(snowlake);

    const x = 0;
    const y = 0;
    const z = 0;

    vertices.push( x, y, z );

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3 ));
    this.geometry = geometry;
    const color = [1.0, 0.2, 0.0];
    const sprite = sprite1;
    const size = 2;

    const materials = new PointsMaterial( { size: size, map: sprite, blending: AdditiveBlending, depthTest: false, transparent: true } );
    materials.color.setRGB( color[ 0 ], color[ 1 ], color[ 2 ] );
    this.materials = materials;

    const particles = new Points( geometry, materials );
    this.particles = particles;
  }

  shoot() {
    this.particles = new Points( this.geometry, this.materials );
    this.particles.position.copy(this.camera.position);
    //this.particles.rotation.copy(this.camera.rotation);
    let vec = new Vector3();
    vec.setFromMatrixColumn(this.camera.matrix, 0);
    vec.crossVectors(new Vector3(0, 1, 0), vec);
    this.particles.position.addScaledVector(vec, 1.5);
    //this.particles.lookAt(this.camera);
    let vec2 = new Vector3();
    this.camera.getWorldDirection(vec2);
    this.particles.position.y += vec2.y * 1.57;
    

    //this.particles.rotation.set(0,0,0);
    this.scene.add(this.particles);
    this.lifespan = 0.1;
  }

  update(time) {
    this.lifespan -= time;
    if (this.lifespan < 0) {
      this.scene.remove(this.particles);
    }
    this.particles.position.copy(this.camera.position);
    //this.particles.rotation.copy(this.camera.rotation);
    let vec = new Vector3();
    vec.setFromMatrixColumn(this.camera.matrix, 0);
    vec.crossVectors(new Vector3(0, 1, 0), vec);
    this.particles.position.addScaledVector(vec, 1.5);
    //this.particles.lookAt(this.camera);
    let vec2 = new Vector3();
    this.camera.getWorldDirection(vec2);
    this.particles.position.y += vec2.y * 1.57;
  }
}

export {Ash, Fire};