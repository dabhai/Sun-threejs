import * as THREE from "./three/build/three.module.js";

// Public variables
let scene, camera, light, renderer, texture, geometry, sun, material;
let zoom = 50;
let ZoomIn;
function Init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.z = zoom;
  light = new THREE.AmbientLight(0xffffff, 0.1);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // The ball:
  geometry = new THREE.SphereGeometry(16, 32, 32);
  texture = new THREE.TextureLoader().load("./assets/textures/sun.png");
  material = new THREE.MeshBasicMaterial({ map: texture });
  sun = new THREE.Mesh(geometry, material);
  scene.add(sun);
  scene.add(light);

  // Controller
  let controller = document.getElementById("Controller");
  let output = document.getElementById("slidervalue");
  controller.oninput = function () {
    output.textContent = this.value;
    zoom = parseFloat(this.value);
    updateCameraPosition();
  };
  zoom = parseFloat(controller.value);
}

function updateCameraPosition() {
  // Adjust camera position based on zoom value
  ZoomIn = 100 - zoom;
  camera.position.z = ZoomIn;
}

function animate() {
  requestAnimationFrame(animate);
  sun.rotation.y += 0.1;
  renderer.render(scene, camera);
}

Init();
animate();
