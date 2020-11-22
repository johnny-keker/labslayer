import {BufferGeometry, TextureLoader, Float32BufferAttribute, PointsMaterial, Points, AdditiveBlending } from 'three'
import snowlake from '../../textures/snowflake.png'

export default class Ash {
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