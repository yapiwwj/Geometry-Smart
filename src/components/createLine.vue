
<template>
  <div id="app">
    <ul class="button-container">
      <li>
        <el-button
            v-for="(button, index) in buttonList"
            :key="index"
            :style="{ '--position': `${button.id}` }"
            type="primary"
            plain
            @click="handle(button.id)"
        >
          {{ button.name }}
        </el-button>
      </li>
      <li class="upload">
        <div class="import-button-box">
          <el-button type="primary" plain>导入模型</el-button>
          <input type="file" placeholder="shang" @change="importModel" accept=".glb" />
        </div>
      </li>
    </ul>
    <div ref="container" class="container" style="width: 95vw; height: 80vh"></div>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { GUI } from 'dat.gui'
const container = ref(null)
let scene, camera, renderer, controls, gui, dragControls
let lineStart = null
let tempLine = null // Temporarily visualizes the line
let addingLine = false
let tempLines = []
const settings = reactive({
  cone: {
    height: 2,
    radius: 1,
    segments: 3,
    positionX: 0,
    positionY: 0,
    positionZ: 0
  },
  cylinder: {
    height: 2,
    radius: 1,
    segments: 16,
    positionX: 0,
    positionY: 0,
    positionZ: 0
  },
  Sphere: {
    radius: 1,
    widthSegments: 12,
    heightSegments: 12,
    positionX: 0,
    positionY: 0,
    positionZ: 0
  },
  Box:{
    width: 1,
    height: 2,
    depth: 1,
    positionX: 0,
    positionY: 0,
    positionZ: 0
  },
})
const buttonList = ref([
  { id: 0, name: '创建锥体' },
  { id: 1, name: '创建球体' },
  { id: 2, name: '创建立方体' },
  { id: 3, name: '创建圆柱体' },
  { id: 4, name: '创建辅助线' },
  { id: 5, name: '清除' }
])
const handle = (id) => {
  switch (id) {
    case 0:
      addCone()
      break
    case 1:
      addSphere()
      break
    case 2:
      addBox()
      break
    case 3:
      addCylinder()
      break
    case 4:
      startAddingLine()
      break
    case 5:
      destroy()
      break
  }
}
onMounted(() => {
  initThree()
  gui = new GUI()
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mousemove', handleMouseMove)
})
//导入模型
const importModel = (event) => {
  const file = event.target.files[0]
  if (!file) {
    return
  }
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = () => {
    const loader = new GLTFLoader()
    const blob = new Blob([reader.result], { type: file.type })
    const url = URL.createObjectURL(blob)
    loader.load(url, (gltf) => {
      scene.add(gltf.scene)
      URL.revokeObjectURL(url) // 清理内存
    })
  }
}

function initThree() {
  // const width = window.innerWidth
  // const height = window.innerHeight
  const width = container.value.clientWidth
  const height = container.value.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setClearColor(new THREE.Color('#aaaaaa'))

  container.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  const axesHelper = new THREE.AxesHelper(5)
  axesHelper.position.y = -1
  scene.add(axesHelper)

  const gridHelper = new THREE.GridHelper(10, 10)
  gridHelper.position.y = -1
  scene.add(gridHelper)

  const objects = [] // 用于存储可拖拽的物体
  dragControls = new DragControls(objects, camera, renderer.domElement)

  // 添加事件监听，当拖拽开始和结束时禁用/启用轨道控制器
  dragControls.addEventListener('dragstart', function (event) {
    controls.enabled = false
  })
  dragControls.addEventListener('dragend', function (event) {
    controls.enabled = true
  })
  //添加模型
  // if (model) {
  //   scene.add(model)
  // }
  animate()
}
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
function addEdges(geometry, type) {
  const edges = new THREE.EdgesGeometry(geometry)
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }))
  line.userData.type = type // 正确设置 userData.type
  scene.add(line)
  updateDraggableObjects()
  return line
}
function addCone() {
  const oldCone = scene.children.find((obj) => obj.userData.type === 'cone')
  if (oldCone) {
    scene.remove(oldCone)
  }
  const geometry = new THREE.ConeGeometry(
      settings.cone.radius,
      settings.cone.height,
      settings.cone.segments
  )
  const line = addEdges(geometry, 'cone')
  line.position.set(
      settings.cone.positionX,
      settings.cone.positionY,
      settings.cone.positionZ
  )
  if (gui && !guiPanels.cone) {
    gui.show()
    addConeGUI()
  }
}
function addCylinder() {
  const oldCylinder = scene.children.find((obj) => obj.userData.type === 'cylinder')
  if (oldCylinder) {
    scene.remove(oldCylinder)
  }
  const geometry = new THREE.CylinderGeometry(
      settings.cylinder.radius,
      settings.cylinder.radius,
      settings.cylinder.height,
      settings.cylinder.segments
  )
  const line = addEdges(geometry, 'cylinder')
  line.position.set(
      settings.cylinder.positionX,
      settings.cylinder.positionY,
      settings.cylinder.positionZ
  )
  if (gui && !guiPanels.cylinder) {
    gui.show()
    addCylinderGUI()
  }
}
function addSphere() {
  const oldSphere = scene.children.find((obj) => obj.userData.type === 'Sphere')
  if (oldSphere) {
    scene.remove(oldSphere)
  }
  const geometry = new THREE.SphereGeometry(
      settings.Sphere.radius,
      settings.Sphere.widthSegments ,
      settings.Sphere.heightSegments
  )
  const line = addEdges(geometry, 'Sphere')
  line.position.set(
      settings.Sphere.positionX,
      settings.Sphere.positionY,
      settings.Sphere.positionZ
  )
  if (gui && !guiPanels.Sphere) {
    gui.show()
    addSphereGUI()
  }
}
function addBox() {
  const oldBox = scene.children.find((obj) => obj.userData.type === 'Box')
  if (oldBox) {
    scene.remove(oldBox)
  }
  const geometry = new THREE.BoxGeometry(
      settings.Box.width,
      settings.Box.height,
      settings.Box.depth,
  )
  const line = addEdges(geometry, 'Box')
  line.position.set(
      settings.Box.positionX,
      settings.Box.positionY,
      settings.Box.positionZ
  )
  if (gui && !guiPanels.Box) {
    gui.show()
    addBoxGUI()
  }
}
//创建辅助线
function startAddingLine() {
  addingLine = true
  container.value.style.cursor = 'crosshair'
}
function handleMouseDown(event) {
  if (!addingLine) return
  const mouse = getMousePosition(event)
  const point = getPointOnPlane(mouse)
  if (!lineStart) {
    lineStart = point
    tempLine = createTempLine(lineStart, lineStart)// Start and end at the same point initially
    tempLines.push(tempLine)
    scene.add(tempLine)
  } else {
    finalizeLine(point)
    addingLine = false // Disable line adding mode
    container.value.style.cursor = 'default' // Reset cursor
  }
}
function handleMouseMove(event) {
  if (!addingLine || !lineStart) return
  const mouse = getMousePosition(event)
  const point = getPointOnPlane(mouse)
  updateTempLine(point)
}
function getMousePosition(event) {
  const rect = container.value.getBoundingClientRect()
  return new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
  )
}
function getPointOnPlane(mouse) {
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, camera)
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  const target = new THREE.Vector3()
  raycaster.ray.intersectPlane(plane, target)
  return target
}
function createTempLine(start, end) {
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end])
  return new THREE.Line(geometry, material)
}
function updateTempLine(end) {
  tempLine.geometry.setFromPoints([lineStart, end])
  tempLine.geometry.verticesNeedUpdate = true
}
function finalizeLine(end) {
  updateTempLine(end) // Ensure the line is updated to the final point before finalizing
  lineStart = null // Reset the start point for future operations
}
//更新拖拽控制
function updateDraggableObjects() {
  const draggableObjects = scene.children.filter(
      (obj) => obj.userData.type === 'cone' || obj.userData.type === 'cylinder'
  )
  dragControls.transformGroup = true // 如果你想要整个组一起拖拽
  dragControls.objects = draggableObjects
}
//gui
const guiPanels = {
  cone: false,
  cylinder: false,
  Box: false,
  Sphere: false
}
function addConeGUI() {
  if (!gui) return
  const coneFolder = gui.addFolder('椎体设置')
  coneFolder.add(settings.cone, 'height', 1, 5).name('高').onChange(addCone)
  coneFolder.add(settings.cone, 'radius', 0.5, 2).name('半径').onChange(addCone)
  coneFolder.add(settings.cone, 'segments', 3, 32, 1).name('棱数').onChange(addCone)
  coneFolder.add(settings.cone, 'positionX', -5, 5, 0.1).name('x坐标').onChange(addCone)
  coneFolder.add(settings.cone, 'positionY', -5, 5, 0.1).name('y坐标').onChange(addCone)
  coneFolder.add(settings.cone, 'positionZ', -5, 5, 0.1).name('z坐标').onChange(addCone)
  guiPanels.cone = coneFolder
  coneFolder.open()
}
function addCylinderGUI() {
  if (!gui) return
  const cylinderFolder = gui.addFolder('柱体设置')
  cylinderFolder.add(settings.cylinder, 'height', 1, 5).name('高').onChange(addCylinder)
  cylinderFolder.add(settings.cylinder, 'radius', 0.5, 2).name('半径').onChange(addCylinder)
  cylinderFolder.add(settings.cylinder, 'segments', 8, 32, 1).name('棱数').onChange(addCylinder)
  cylinderFolder.add(settings.cylinder, 'positionX', -5, 5, 0.1).name('x坐标').onChange(addCylinder)
  cylinderFolder.add(settings.cylinder, 'positionY', -5, 5, 0.1).name('y坐标').onChange(addCylinder)
  cylinderFolder.add(settings.cylinder, 'positionZ', -5, 5, 0.1).name('z坐标').onChange(addCylinder)
  guiPanels.cylinder = cylinderFolder;

  cylinderFolder.open()
}
function addSphereGUI() {
  if (!gui) return
  const SphereFolder = gui.addFolder('球体设置')
  SphereFolder.add(settings.Sphere, 'radius', 0.5, 2).name('半径').onChange(addSphere)
  SphereFolder.add(settings.Sphere, 'widthSegments',8, 64, 2).name('水平分段数').onChange(addSphere)
  SphereFolder.add(settings.Sphere, 'heightSegments', 12, 32, 1).name('垂直分段数').onChange(addSphere)
  SphereFolder.add(settings.Sphere, 'positionX', -5, 5, 0.1).name('x坐标').onChange(addSphere)
  SphereFolder.add(settings.Sphere, 'positionY', -5, 5, 0.1).name('y坐标').onChange(addSphere)
  SphereFolder.add(settings.Sphere, 'positionZ', -5, 5, 0.1).name('z坐标').onChange(addSphere)
  guiPanels.Sphere = SphereFolder;
  SphereFolder.open()
}
function addBoxGUI() {
  if (!gui) return
  const BoxFolder = gui.addFolder('立方体体设置')
  BoxFolder.add(settings.Box, 'width',1, 10, 0.1).name('宽度').onChange(addBox)
  BoxFolder.add(settings.Box, 'height',2, 4, 0.1).name('高度').onChange(addBox)
  BoxFolder.add(settings.Box, 'depth',1, 10, 0.1).name('深度').onChange(addBox)
  BoxFolder.add(settings.Box, 'positionX', -5, 5, 0.1).name('x坐标').onChange(addBox)
  BoxFolder.add(settings.Box, 'positionY', -5, 5, 0.1).name('y坐标').onChange(addBox)
  BoxFolder.add(settings.Box, 'positionZ', -5, 5, 0.1).name('z坐标').onChange(addBox)
  guiPanels.Box = BoxFolder;
  BoxFolder.open()
}
function destroy(){
  if(gui){
    Object.keys(guiPanels).forEach(key => {
      if (gui && guiPanels[key]) {
        gui.removeFolder(guiPanels[key]);
        guiPanels[key] = false; // 重置标记
      }
    });
    gui.hide()
  }
  const typesToRemove = ['cone', 'cylinder', 'Sphere','Box'];
  typesToRemove.forEach(type => {
    const objectToRemove = scene.children.find(obj => obj.userData.type === type);
    if (objectToRemove) {
      scene.remove(objectToRemove);
    }
  });
  tempLines.forEach(line => {
    scene.remove(line)
  })
  tempLines = []
}
</script>
<style lang="scss" scoped>
@import url('../styles/components/createLine.scss');
</style>
