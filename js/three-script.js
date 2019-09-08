var container = document.body;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
camera.position.set( 400, 200, 0 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );
container.appendChild( renderer.domElement );

controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 500;
// controls.maxPolarAngle = Math.PI / 2;

var cachedTextures = {};
// controls = new THREE.TrackballControls( camera, renderer.domElement );
//   controls.rotateSpeed = 1.0;
//   controls.zoomSpeed = 1.2;
//   controls.panSpeed = 0.8;
//   controls.noZoom = false;
//   controls.noPan = false;
//   controls.staticMoving = true;
//   controls.dynamicDampingFactor = 0.3;

window.addEventListener("resize", function(){
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect	= window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
camera.position.z = 8;

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
var textureLoader = new THREE.TextureLoader();

var skyboxGeometry = new THREE.SphereBufferGeometry( 1000, 64, 64 );
skyboxGeometry.scale( - 1, 1, 1 );
// var skyboxTexture = textureLoader.load( 'assets/images/locations/phoenix/360/phoenix_01.jpg' );
var skyboxMaterial = new THREE.MeshBasicMaterial(  );
var skyboxMesh = new THREE.Mesh( skyboxGeometry, skyboxMaterial );
scene.add( skyboxMesh );

// var stats = new Stats();
// container.appendChild( stats.dom );

// var snowParticleCount = 2000;
// var snowSprite = textureLoader.load( 'assets/images/sprites/snowflake1.png' );
// var snowParticleMaterial = new THREE.PointCloudMaterial({
//    color: 0xFFFFFF,
//    size: 4,
//    blending: THREE.AdditiveBlending,
//    depthTest: false,
//    transparent: true,
//    map: snowSprite,
// });
// var snowParticlesGeometry = new THREE.Geometry;
// for (var i = 0; i < snowParticleCount; i++) {
//     var pX = Math.random()*1000 - 500,
//     pY = Math.random()*1000 - 250,
//     pZ = Math.random()*1000 - 500,
//     particle = new THREE.Vector3(pX, pY, pZ);
//     particle.velocity = {};
//     particle.velocity.y = -1;
//     snowParticlesGeometry.vertices.push(particle);
// }
// var snowParticlesPointCloud = new THREE.PointCloud(snowParticlesGeometry, snowParticleMaterial);

// scene.add(snowParticlesPointCloud);

// var updateSnowParticles = function(){
//   var pCount = snowParticleCount;
//   while (pCount--) {
//     let particle = snowParticlesGeometry.vertices[pCount];
//     if (particle.y < -200) {
//       particle.y = 1000;
//       particle.velocity.y = -1.2;
//     }
//
//     particle.velocity.y -= Math.random() * .02;
//
//     particle.y += particle.velocity.y;
//   }
//
//   snowParticlesGeometry.verticesNeedUpdate = true;
// };
var particlesShown = false;
var particleSystem = new AFrameParticleSystem();
particleSystem.init();
// scene.add(aFrameParticleSystem.particleGroup.mesh);

// scene.remove(aFrameParticleSystem.particleGroup.mesh);
// aFrameParticleSystem.data.preset="rain";
// aFrameParticleSystem.update();
// scene.add(aFrameParticleSystem.particleGroup.mesh);

// var geometry = new THREE.BufferGeometry();
// var textureLoader = new THREE.TextureLoader();
// var sparkSprite = textureLoader.load( 'assets/images/sprites/spark1.png' );
// var vertices = [];
// for ( var i = 0; i < 10000; i ++ ) {
//   var x = Math.random() * 2000 - 1000;
//   var y = Math.random() * 2000 - 1000;
//   var z = Math.random() * 2000 - 1000;
//   vertices.push( x, y, z );
// }
// geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
// var color = [ 1.0, 0.2, 0.5 ];
// var sprite = sparkSprite;
// var size = 15;
// var material = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
// material.color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );
// var particles = new THREE.Points( geometry, material );
// particles.rotation.x = Math.random() * 6;
// particles.rotation.y = Math.random() * 6;
// particles.rotation.z = Math.random() * 6;
// // scene.add( particles );
//
// var updateSparkParticles = function(delta){
//   particles.rotation.y +=  delta * 1;
// };

var clock = new THREE.Clock();

var update = function(){

  var delta = clock.getDelta();
  // mixer.update( delta );
  controls.update( delta );
  // updateSnowParticles();
  // updateSparkParticles(delta);
  // stats.update();
  // console.log(stats);
  // console.log(stats.fps);
  if(particlesShown){
    particleSystem.tick(null,delta);
  }

}

var render = function(){
  renderer.render( scene, camera );
}

var appLoop = function() {
  requestAnimationFrame( appLoop );

  update();
  render();
}

if ( THREE.WEBGL.isWebGLAvailable() ) {
  appLoop();
} else {

  var warning = WEBGL.getWebGLErrorMessage();
  document.getElementById( 'three-container' ).appendChild( warning );
}

function setBackground(background){
  console.log("setBackground!", background);
  let panorama=background.panorama;
  let particles=background.particles;
  if(cachedTextures[panorama]==null){

    loadingText.html("Loading background 360 image...");
    loadingHint.removeClass("d-none");
    cachedTextures[panorama] = textureLoader.load( panorama,
      function (texture) {
        console.log("Texture loaded!", texture);
        loadingHint.addClass("d-none");

        skyboxMesh.material.map = cachedTextures[panorama];
        skyboxMesh.material.needsUpdate = true;

        if(particlesShown){
          scene.remove(particleSystem.particleGroup.mesh);
          particlesShown = false;
        }
        if(particles!=null){
          particleSystem.data.preset=particles;
          particleSystem.update();
          scene.add(particleSystem.particleGroup.mesh);
          particlesShown = true;
        }
      });

  }
  else{
    skyboxMesh.material.map = cachedTextures[panorama];
    skyboxMesh.material.needsUpdate = true;

    if(particlesShown){
      scene.remove(particleSystem.particleGroup.mesh);
      particlesShown = false;
    }
    if(particles!=null){
      particleSystem.data.preset=particles;
      particleSystem.update();
      scene.add(particleSystem.particleGroup.mesh);
      particlesShown = true;
    }
  }

  // skyboxMesh.material.map = cachedTextures[panorama];
  // skyboxMesh.material.needsUpdate = true;

  // if(cachedTextures[src]==null) cachedTextures[src] = textureLoader.load( src,
  //   function (texture) {
  //     console.log("Texture loaded!", texture);
  //   });
  // skyboxMesh.material.map = cachedTextures[src];
  // skyboxMesh.material.needsUpdate = true;
}

function setSkyboxTexture(src){
  if(cachedTextures[src]==null) cachedTextures[src] = textureLoader.load( src,
    function (texture) {
      console.log("Texture loaded!", texture);
    });
  skyboxMesh.material.map = cachedTextures[src];
  skyboxMesh.material.needsUpdate = true;
}

// function preloadTexture(src){
//   if(cachedTextures[src]==null) cachedTextures[src] = textureLoader.load( src,
//     function (texture) {
//       console.log("Texture loaded!", texture);
//     });
// }

function setParticles(newParticles){
  if(particlesShown){
    scene.remove(particleSystem.particleGroup.mesh);
    particlesShown = false;
  }
  if(newParticles!=null){
    particleSystem.data.preset=newParticles;
    particleSystem.update();
    scene.add(particleSystem.particleGroup.mesh);
    particlesShown = true;
  }
}
