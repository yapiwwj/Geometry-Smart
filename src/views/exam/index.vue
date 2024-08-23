<template>
  <div ref="container" class="container" style="width: 65vw; height: 40vw"></div>
  <el-button @click="addBox">添加长方体</el-button>
  <el-button @click="addCone">添加锥体</el-button>
  <el-button @click="addCylinder">添加圆柱体</el-button>
  <el-button @click="addSphere">添加球体</el-button>
  <el-button @click="clearAll">清除所有几何体</el-button>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { BoxHelper } from 'three';

const container = ref(null);
let scene, camera, renderer, controls, transformControls, boxHelper;
const settings = reactive({
  Cone: {
    height: 2,
    radius: 2,
    segments: 4,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
  },
  Cylinder: {
    height: 1,
    radius: 1,
    segments: 4,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
  },
  Sphere: {
    radius: 2,
    widthSegments: 128,
    heightSegments: 256,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
  },
  Box: {
    width: 4,
    height: 2,
    depth: 2,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
  },
});

onMounted(() => {
  initThree();
});

function initThree() {
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(new THREE.Color('#aaaaaa'));

  container.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  transformControls = new TransformControls(camera, renderer.domElement);
  scene.add(transformControls);

  transformControls.addEventListener('change', () => {
    renderer.render(scene, camera);
  });

  transformControls.addEventListener('dragging-changed', (event) => {
    controls.enabled = !event.value;
  });

  transformControls.addEventListener('objectChange', () => {
    const object = transformControls.object;
    if (object) {
      console.log('Updated position:', object.position);
    }
  });

  container.value.addEventListener('mousedown', onMouseDown);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  if (boxHelper) {
    boxHelper.update();
  }
  renderer.render(scene, camera);
}

function addBox() {
  const geometry = new THREE.BoxGeometry(
    settings.Box.height,
    settings.Box.width,
    settings.Box.depth
  );
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.type = 'Box';
  scene.add(mesh);
  mesh.position.set(settings.Box.positionX, settings.Box.positionY, settings.Box.positionZ);
  updateDraggableObjects();
}

function addCone() {
  const geometry = new THREE.ConeGeometry(
    settings.Cone.height,
    settings.Cone.radius,
    settings.Cone.segments
  );
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.type = 'Cone';
  scene.add(mesh);
  mesh.position.set(settings.Cone.positionX, settings.Cone.positionY, settings.Cone.positionZ);
  updateDraggableObjects();
}

function addCylinder() {
  const geometry = new THREE.CylinderGeometry(
    settings.Cylinder.height,
    settings.Cylinder.radius,
    settings.Cylinder.segments
  );
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.type = 'Cylinder';
  scene.add(mesh);
  mesh.position.set(settings.Cylinder.positionX, settings.Cylinder.positionY, settings.Cylinder.positionZ);
  updateDraggableObjects();
}

function addSphere() {
  const geometry = new THREE.SphereGeometry(
    settings.Sphere.radius,
    settings.Sphere.widthSegments,
    settings.Sphere.heightSegments
  );
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.type = 'Sphere';
  scene.add(mesh);
  mesh.position.set(settings.Sphere.positionX, settings.Sphere.positionY, settings.Sphere.positionZ);
  updateDraggableObjects();
}

function updateDraggableObjects() {
  const draggableObjects = scene.children.filter((obj) => obj instanceof THREE.Mesh);

  draggableObjects.forEach((obj) => {
    obj.userData.isSelected = false;
    obj.addEventListener('click', () => {
      selectObject(obj);
    });
  });
}

function selectObject(object) {
  if (transformControls.object) {
    transformControls.detach();
    if (boxHelper) {
      scene.remove(boxHelper);
      boxHelper = null;
    }
  }

  transformControls.setMode('translate'); // Set the mode to 'translate' for moving along axes
  transformControls.attach(object);
  boxHelper = new BoxHelper(object, 0xffff00); // Yellow color for the bounding box
  scene.add(boxHelper);

  object.userData.isSelected = true;
}

function clearAll() {
  const meshes = scene.children.filter((obj) => obj instanceof THREE.Mesh);
  meshes.forEach((mesh) => scene.remove(mesh));
  if (transformControls.object) {
    transformControls.detach();
  }
  if (boxHelper) {
    scene.remove(boxHelper);
    boxHelper = null;
  }
}

function onMouseDown(event) {
  event.preventDefault();
  const rect = renderer.domElement.getBoundingClientRect();
  const mouse = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    selectObject(intersects[0].object);
  }
}
</script>

<style>
.container {
  border: 1px solid #ddd;
}
</style>
