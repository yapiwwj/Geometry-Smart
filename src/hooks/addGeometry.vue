<script setup type="module">
import * as THREE from 'three'
import { DragControls } from 'three/addons/controls/DragControls.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { ArrowDown } from '@element-plus/icons-vue'

let container
let camera, scene, renderer, dragControl, controls, group, grid
let enableSelection = false
const objects = []
const mouse = new THREE.Vector2(),
  raycaster = new THREE.Raycaster()

init()

function init() {
  container = document.createElement('div')
  document.body.appendChild(container)

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.z = 10

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)

  grid = new THREE.GridHelper(10, 10, 0x444444, 0x444444)
  grid.material.transparent = true
  grid.material.opacity = 0.6
  grid.translateY(-0.5)
  scene.add(grid)

  group = new THREE.Group()
  scene.add(group)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap

  container.appendChild(renderer.domElement)

  dragControl = new DragControls([...objects], camera, renderer.domElement)
  dragControl.rotateSpeed = 2
  dragControl.addEventListener('drag', render)

  window.addEventListener('resize', onWindowResize)
  document.addEventListener('click', onClick)
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
  dragControl.addEventListener('dragstart', function () {
    controls.enabled = false
  })
  dragControl.addEventListener('dragend', function () {
    controls.enabled = true
  })

  render()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function onKeyDown(event) {
  enableSelection = event.keyCode === 16
  if (event.keyCode === 77) {
    // dragControl.mode = (dragControl.mode === 'translate') ? 'rotate' : 'translate'
    dragControl.mode = dragControl.mode === 'translate' ? 'rotate' : 'translate'
  }
}

function onKeyUp() {
  enableSelection = false
}

const draggableObjects = dragControl.getObjects()

function onClick(event) {
  event.preventDefault()
  if (enableSelection === true) {
    draggableObjects.length = 0

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    const intersections = raycaster.intersectObjects(objects, true)
    if (intersections.length > 0) {
      const object = intersections[0].object
      if (group.children.includes(object) === true) {
        object.material.emissive.set(0x000000)
        scene.attach(object)
      } else {
        object.material.emissive.set(0xaaaaaa)
        group.attach(object)
      }

      dragControl.transformGroup = true
      draggableObjects.push(group)
    }

    if (group.children.length === 0) {
      dragControl.transformGroup = false
      draggableObjects.push(...objects)
    }
  }

  render()
}

controls = new OrbitControls(camera, renderer.domElement)

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

//创建多个类型的几何体
const createBox = () => new THREE.BoxGeometry(1, 1, 1)
const createCone = () => new THREE.ConeGeometry(1, 1, 3)
const createSphere = () => new THREE.SphereGeometry(1, 32, 32)
const geometryCreator = {
  1: createBox,
  2: createCone,
  3: createSphere
}

function addGeometry(n) {
  const createGeometry = geometryCreator[n]
  const geometry = createGeometry()
  const edgesGeometry = new THREE.EdgesGeometry(geometry)
  const material = new THREE.LineBasicMaterial({ color: '#0078d4' })
  const object = new THREE.LineSegments(edgesGeometry, material)
  for (let i = 0; i < 1; i++) {
    object.position.x = Math.random()
    object.position.y = 0
    object.position.z = Math.random()
    scene.add(object)
    objects.push(object)

    draggableObjects.push(...objects)
  }
  //gui
  gui(n, object)
}

//gui
const geometryName = {
  1: '柱体',
  2: '锥体',
  3: '球体'
}

function gui(n, object) {
  const gui = new dat.GUI()
  const data = {
    type: geometryName[n],
    width: 1,
    height: 1,
    depth: 1,
    radius: 1,
    radialSegments: 3, //底棱锥数
    heightSegments: 32
  }
  gui.add(data, 'type').name('几何类型')
  gui
    .add(data, 'width', 1, 10)
    .name('宽度')
    .onChange((value) => {
      object.scale.x = value
    })
  gui
    .add(data, 'height', 1, 10)
    .name('高度')
    .onChange((value) => {
      object.scale.y = value
    })
  gui
    .add(data, 'depth', 1, 10)
    .name('长度')
    .onChange((value) => {
      object.scale.z = value
    })
  // gui.add(data, 'radialSegments', 1, 10).name('棱锥数').onChange(value => {
  //   const newGeometry = new THREE.ConeGeometry(data.radius,data.height,data.radialSegments);
  //   if (object.geometry) {
  //     scene.remove(object); // 从场景中移除旧的对象
  //   }
  //
  // })
}
</script>

<template>
  <div>
    <el-dropdown>
      <el-button type="primary">
        添加几何体
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="addGeometry(1)">柱体</el-dropdown-item>
          <el-dropdown-item @click="addGeometry(2)">锥体</el-dropdown-item>
          <el-dropdown-item @click="addGeometry(3)">球体</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
