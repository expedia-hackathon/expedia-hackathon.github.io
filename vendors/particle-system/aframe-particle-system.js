function AFrameParticleSystem(params) {

   this.defaultData= {
       preset: null,
       maxAge: 6,
       positionSpread: { x: 0, y: 0, z: 0 },
       type: SPE.distributions.BOX,
       rotationAxis: 'x',
       rotationAngle: 0,
       rotationAngleSpread: 0,
       accelerationValue: { x: 0, y: -10, z: 0 },
       accelerationSpread: { x: 10, y: 0, z: 10 },
       velocityValue: { x: 0, y: 25, z: 0 },
       velocitySpread: { x: 10, y: 7.5, z: 10 },
       dragValue: 0,
       dragSpread: 0,
       dragRandomise: false,
       color: [ '#0000FF', '#FF0000' ],
       size: 1,
       direction: 1,
       duration: null,
       particleCount: 1000,
       texture: 'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/star2.png',
       randomise: false,
       opacity: [ '1' ],
       maxParticleCount: 250000,
       blending: THREE.AdditiveBlending,
       enabled: true
   }

   this.data={};
   Object.keys(this.defaultData).forEach(key=>{
     this.data[key]=this.defaultData[key];
   });

   if(params!=null){
     Object.keys(params).forEach(key=>{
       this.data[key]=params[key];
     });
   }

  this.init = function() {

      this.presets = {};

      /* preset settings can be overwritten */

      this.presets['dust'] = {
          maxAge: 20,
          positionSpread: {x:1000,y:1000,z:1000},
          rotationAngle: 3.14,
          accelerationValue: {x: 0, y: 0, z: 0},
          accelerationSpread: {x: 0, y: 0, z: 0},
          velocityValue: {x: 10, y: 3, z: 10},
          velocitySpread: {x: 0.5, y: 1, z: 0.5},
          color: ['#FFFFFF'],
          particleCount: 100,
          texture: 'vendors/particle-system/sprites/smokeparticle.png',
          size: 25
      };

      this.presets['star'] = {
          maxAge: 20,
          positionSpread: {x:1000,y:1000,z:1000},
          rotationAngle: 3.14,
          accelerationValue: {x: 0, y: 0, z: 0},
          accelerationSpread: {x: 0, y: 0, z: 0},
          velocityValue: {x: 10, y: 3, z: 10},
          velocitySpread: {x: 0.5, y: 1, z: 0.5},
          color: ['#FFFFFF'],
          particleCount: 100,
          texture: 'vendors/particle-system/sprites/star.png',
          size: 28
      };

      this.presets['snowflake2'] = {
          maxAge: 20,
          positionSpread: {x:1000,y:1000,z:1000},
          rotationAngle: 3.14,
          accelerationValue: {x: 0, y: 0, z: 0},
          accelerationSpread: {x: 0, y: 0, z: 0},
          velocityValue: {x: 10, y: 30, z: 10},
          velocitySpread: {x: 0.5, y: 1, z: 0.5},
          color: ['#FFFFFF'],
          particleCount: 500,
          texture: 'vendors/particle-system/sprites/snowflake2.png',
          size: 30
      };

      this.presets['shockwave'] = {
          maxAge: 20,
          positionSpread: {x:1000,y:1000,z:1000},
          rotationAngle: 3.14,
          accelerationValue: {x: 0, y: 0, z: 0},
          accelerationSpread: {x: 0, y: 0, z: 0},
          velocityValue: {x: 10, y: 3, z: 10},
          velocitySpread: {x: 0.5, y: 1, z: 0.5},
          color: ['#FFFFFF'],
          particleCount: 150,
          texture: 'vendors/particle-system/sprites/shockwave.png',
          size: 25
      };

      this.presets['bubble'] = {
          maxAge: 20,
          positionSpread: {x:1000,y:1000,z:1000},
          rotationAngle: 3.14,
          accelerationValue: {x: 0, y: 0, z: 0},
          accelerationSpread: {x: 0, y: 0, z: 0},
          velocityValue: {x: 10, y: 3, z: 10},
          velocitySpread: {x: 0.5, y: 1, z: 0.5},
          color: ['#EC7063','#F39C12'],
          particleCount: 150,
          texture: 'vendors/particle-system/sprites/bubble.png',
          size: 50
      };

      this.presets['cloud'] = {
          maxAge: 20,
          positionSpread: {x:1000,y:1000,z:1000},
          rotationAngle: 3.14,
          accelerationValue: {x: 0, y: 0, z: 0},
          accelerationSpread: {x: 0, y: 0, z: 0},
          velocityValue: {x: 10, y: 3, z: 10},
          velocitySpread: {x: 0.5, y: 1, z: 0.5},
          color: ['#FFFFFF'],
          particleCount: 20,
          maxParticleCount: 30,
          texture: 'vendors/particle-system/sprites/cloud.png',
          size: 500
      };

      this.presets['snow'] = {
          maxAge: 20,
          positionSpread: {x:1000,y:1000,z:1000},
          rotationAngle: 3.14,
          accelerationValue: {x: 0, y: 0, z: 0},
          accelerationSpread: {x: 0.2, y: 0, z: 0.2},
          velocityValue: {x: 0, y: 80, z: 0},
          velocitySpread: {x: 2, y: 0, z: 2},
          color: ['#FFFFFF'],
          particleCount: 1000,
          texture: 'vendors/particle-system/sprites/smokeparticle.png',
          size: 25
      };

      this.presets['rain'] = {
          maxAge: 1,
          positionSpread: {x:1000,y:1000,z:1000},
          rotationAngle: 3.14,
          accelerationValue: {x: 0, y: 3, z: 0},
          accelerationSpread: {x: 2, y: 1, z: 2},
          velocityValue: {x: 0, y: 500, z: 0},
          velocitySpread: {x: 10, y: 50, z: 10},
          color: ['#FFFFFF'],
          size: 5,
          particleCount: 1000,
          texture: 'vendors/particle-system/sprites/raindrop.png'
      };

      this.update();
  }

  // this.resetData = function() {
  //   Object.keys(this.defaultData).forEach(key=>{
  //     this.data[key]=this.defaultData[key];
  //   });
  // }

  this.update = function() {

      // Remove old particle group.
      // if (this.particleGroup) {
      //     // this.el.removeObject3D('particle-system');
      //
      // }

      // Set the selected preset, if any, or use an empty object to keep schema defaults
      if(this.data.preset!=null){
        let preset = this.presets[this.data.preset] || {};

        Object.keys(this.defaultData).forEach(key=>{
          if(preset[key]!=null) this.data[key]=preset[key];
          else this.data[key]=this.defaultData[key];
        });
      }


      // Get custom, preset, or default data for each property defined in the schema
      // for (var key in this.data) {
      //     this.data[key] = this.applyPreset(key);
      // }

      this.initParticleSystem(this.data);

      if(this.data.enabled === true) {
          this.startParticles()
      } else {
          this.stopParticles()
      }
  }

  this.applyPreset = function(key) {
      // !this.attrValue[key] = the user did not set a custom value
      // this.preset[key] = there exists a value for this key in the selected preset

      if (this.preset[key]) {
          return this.preset[key];
      } else {
          // Otherwise stick to the user or schema default value
          return this.data[key];
      }
  }

  this.tick = function(time, dt) {

      this.particleGroup.tick(dt);

  }

  this.startParticles = function() {
      this.particleGroup.emitters.forEach(function(em) { em.enable() });
  }

  this.stopParticles= function() {
      this.particleGroup.emitters.forEach(function(em) { em.disable() });
  }

  this.initParticleSystem= function(settings) {

      var loader = new THREE.TextureLoader();

      var particle_texture = loader.load(
          settings.texture,
          function (texture) {
              return texture;
          },
          function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (xhr) {
            console.log('An error occurred');
          }
      );

      this.particleGroup = new SPE.Group({
          texture: {
              value: particle_texture
          },
          maxParticleCount: settings.maxParticleCount,
          blending: settings.blending
      });

      var emitter = new SPE.Emitter({
          maxAge: {
              value: settings.maxAge
          },
          type: {
              value: settings.type
          },
          position: {
              spread: new THREE.Vector3(settings.positionSpread.x, settings.positionSpread.y, settings.positionSpread.z),
              randomise: settings.randomise
              //spreadClamp: new THREE.Vector3( 2, 2, 2 ),
              //radius: 4
          },
          rotation: {
              axis: (settings.rotationAxis=='x'?new THREE.Vector3(1, 0, 0):(settings.rotationAxis=='y'?new THREE.Vector3(0, 1, 0):(settings.rotationAxis=='z'?new THREE.Vector3(0, 0, 1):new THREE.Vector3(0, 1, 0)))),
              angle: settings.rotationAngle,
              angleSpread: settings.rotationAngleSpread,
              static: true
          },
          acceleration: {
              value: new THREE.Vector3(settings.accelerationValue.x, settings.accelerationValue.y, settings.accelerationValue.z),
              spread: new THREE.Vector3(settings.accelerationSpread.x, settings.accelerationSpread.y, settings.accelerationSpread.z)
          },
          velocity: {
              value: new THREE.Vector3(settings.velocityValue.x, settings.velocityValue.y, settings.velocityValue.z),
              spread: new THREE.Vector3(settings.velocitySpread.x, settings.velocitySpread.y, settings.velocitySpread.z)
          },
          drag: {
              value: new THREE.Vector3(settings.dragValue.x, settings.dragValue.y, settings.dragValue.z),
              spread: new THREE.Vector3(settings.dragSpread.x, settings.dragSpread.y, settings.dragSpread.z),
              randomise: settings.dragRandomise
          },
          color: {
              value: settings.color.map(function(c) { return new THREE.Color(c); })
          },
          size: {
              value: settings.size
          },
          /*wiggle: { value: 4, spread: 2 }, //settings.wiggle,*/
          /*drag: {
              value: settings.drag
          },*/
          direction: {
              value: settings.direction
          },
          duration: settings.duration,
          opacity: { value: settings.opacity.map(function (o) { return parseFloat(o); }) },
          particleCount: settings.particleCount
      });

      this.particleGroup.addEmitter(emitter);
      this.particleGroup.mesh.frustumCulled = false;
      // this.el.setObject3D('particle-system', this.particleGroup.mesh);
  }
}
